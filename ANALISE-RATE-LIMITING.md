# 📊 Análise de Rate Limiting e Requisições

## 🎯 **Resumo Executivo**

**Situação Atual:** ❌ **SEM RATE LIMITING IMPLEMENTADO**  
**Requisições por visita:** **2-4 requisições** para API Pacto por página  
**Risco:** Alto risco de atingir limites da API Pacto

---

## 📈 **Requisições por Página**

### **🏠 Homepage (/)**
```
1. GET /api/unidades
   └─ Busca unidades do Supabase (com fallback estático)
   └─ Timeout: 3 segundos
   └─ Cache: no-store
```

**Total Homepage:** **1 requisição** (apenas Supabase, não Pacto)

---

### **🏢 Página de Unidade (/unidades/[slug])**
```
1. GET /api/pacto/planos/[slug]
   └─ Busca planos da API Pacto V2
   └─ Fallback: dados estáticos locais
   └─ Cache: no-store
```

**Total Página Unidade:** **1 requisição** para API Pacto

---

### **🛒 Modal de Checkout (quando aberto)**
```
1. POST /api/pacto/simular
   └─ Simula venda na API Pacto
   └─ Registra acesso (anti-fraude)
   └─ Gera token de autenticação

2. POST /api/pacto/venda (se confirmar)
   └─ Processa pagamento na API Pacto
   └─ Verifica reCAPTCHA
   └─ Verifica blacklist IP
```

**Total Checkout:** **2 requisições** para API Pacto

---

### **🎫 Validação de Cupom (se usado)**
```
1. POST /api/pacto/cupom
   └─ Valida cupom na API Pacto
```

**Total Cupom:** **+1 requisição** adicional

---

## 🚨 **Problemas Identificados**

### **1. Sem Rate Limiting**
- ❌ **Nenhum controle** de requisições por IP
- ❌ **Sem throttling** entre requisições
- ❌ **Sem cache** de respostas da API Pacto
- ❌ **Sem debounce** em simulações

### **2. Requisições Desnecessárias**
- ❌ **Sem cache** nos planos (sempre busca da API)
- ❌ **Sem cache** nas simulações
- ❌ **Registra acesso** a cada simulação (anti-fraude excessivo)

### **3. Falta de Fallbacks Robustos**
- ⚠️ **Fallback de planos** funciona, mas não é otimizado
- ⚠️ **Timeout de 3s** pode ser muito para algumas situações

---

## 📊 **Cenários de Uso**

### **👤 Usuário Normal (1 visita)**
```
Homepage → Página Unidade → Abrir Modal → Simular → Confirmar
├─ 1 req Supabase (unidades)
├─ 1 req Pacto (planos)
├─ 1 req Pacto (simular)
└─ 1 req Pacto (venda)
Total: 4 requisições
```

### **🔄 Usuário Testando (5 simulações)**
```
├─ 1 req Supabase (unidades)
├─ 1 req Pacto (planos)
├─ 5 req Pacto (simular) ← PROBLEMA!
└─ 1 req Pacto (venda)
Total: 8 requisições
```

### **🚀 Tráfego Alto (100 usuários/dia)**
```
100 usuários × 4 requisições = 400 req/dia
100 usuários × 8 requisições = 800 req/dia (com testes)
```

---

## 🛡️ **Soluções Recomendadas**

### **1. Rate Limiting por IP**
```typescript
// Implementar rate limiting
const rateLimiter = new Map<string, { count: number, resetTime: number }>()

export async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now()
  const window = 15 * 60 * 1000 // 15 minutos
  const limit = 10 // 10 requisições por 15min
  
  const current = rateLimiter.get(ip) || { count: 0, resetTime: now + window }
  
  if (now > current.resetTime) {
    current.count = 0
    current.resetTime = now + window
  }
  
  if (current.count >= limit) {
    return false // Rate limit exceeded
  }
  
  current.count++
  rateLimiter.set(ip, current)
  return true
}
```

### **2. Cache de Planos**
```typescript
// Cache de planos por 30 minutos
const planosCache = new Map<string, { data: any, expiry: number }>()

export async function getCachedPlanos(slug: string) {
  const cached = planosCache.get(slug)
  if (cached && Date.now() < cached.expiry) {
    return cached.data // Retorna do cache
  }
  
  // Busca da API e armazena no cache
  const planos = await pactoV2API.getPlanosUnidade(slug, codigoUnidade)
  planosCache.set(slug, {
    data: planos,
    expiry: Date.now() + (30 * 60 * 1000) // 30 min
  })
  
  return planos
}
```

### **3. Debounce em Simulações**
```typescript
// Evitar múltiplas simulações em sequência
const simulationDebounce = new Map<string, NodeJS.Timeout>()

export function debounceSimulation(userId: string, callback: () => void) {
  const existing = simulationDebounce.get(userId)
  if (existing) {
    clearTimeout(existing)
  }
  
  const timeout = setTimeout(() => {
    callback()
    simulationDebounce.delete(userId)
  }, 2000) // 2 segundos de debounce
  
  simulationDebounce.set(userId, timeout)
}
```

### **4. Cache de Respostas HTTP**
```typescript
// Adicionar headers de cache
export async function GET(req: NextRequest) {
  const response = await fetch('/api/pacto/planos/centro')
  
  return new Response(response.body, {
    headers: {
      'Cache-Control': 'public, max-age=1800', // 30 minutos
      'CDN-Cache-Control': 'max-age=3600', // 1 hora no CDN
    }
  })
}
```

---

## 🎯 **Implementação Prioritária**

### **🔥 Crítico (Implementar AGORA)**
1. **Rate Limiting** - 10 req/15min por IP
2. **Cache de Planos** - 30 minutos
3. **Debounce Simulações** - 2 segundos

### **⚡ Importante (Próxima Sprint)**
1. **Cache HTTP** - Headers de cache
2. **Fallback Robusto** - Dados sempre disponíveis
3. **Monitoramento** - Logs de rate limiting

### **📊 Monitoramento (Contínuo)**
1. **Métricas de API** - Requisições/minuto
2. **Alertas** - Quando atingir 80% do limite
3. **Dashboard** - Status em tempo real

---

## 📈 **Estimativa de Redução**

### **Antes**
```
100 usuários/dia × 4 req = 400 req/dia
Com testes: 800 req/dia
```

### **Depois (com otimizações)**
```
100 usuários/dia × 1.5 req = 150 req/dia
Redução: 62.5% menos requisições
```

---

## 🚨 **Limites da API Pacto**

**⚠️ IMPORTANTE:** Verificar com a Pacto os limites reais:
- Requisições por minuto
- Requisições por dia
- Requisições por IP
- Política de rate limiting

**Recomendação:** Implementar rate limiting **ANTES** de ir para produção para evitar bloqueios da API Pacto.

---

## 🔧 **Próximos Passos**

1. **Implementar rate limiting básico** (1-2 horas)
2. **Adicionar cache de planos** (2-3 horas)  
3. **Configurar debounce** (1 hora)
4. **Testar com tráfego simulado** (1 hora)
5. **Monitorar métricas** (contínuo)

**Total estimado:** 5-7 horas de desenvolvimento
