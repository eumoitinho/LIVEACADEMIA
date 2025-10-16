# 🚨 SEGURANÇA: Chaves reCAPTCHA Expostas

## ⚠️ **PROBLEMA CRÍTICO IDENTIFICADO**

**Status:** ✅ **CORRIGIDO**  
**Risco:** 🔴 **ALTO** (chaves secretas expostas)

---

## 🔍 **Problemas Encontrados**

### **1. Chave Secreta Hardcoded no Código**
```typescript
// ❌ ANTES (PERIGOSO)
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'sua_chave_recaptcha_aqui'

// ✅ DEPOIS (SEGURO)
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
if (!siteKey) {
  console.error('[reCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY não configurada')
  setError('reCAPTCHA não configurado')
  return { /* erro */ }
}
```

### **2. Chaves de Teste em Documentação**
```bash
# ❌ ANTES (CHAVES DE TESTE EXPOSTAS)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_recaptcha_aqui
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

# ✅ DEPOIS (PLACEHOLDERS SEGUROS)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_publica_recaptcha_aqui
RECAPTCHA_SECRET_KEY=sua_chave_secreta_recaptcha_aqui
```

### **3. Chaves de Teste do Google**
- `sua_chave_recaptcha_aqui` - **Chave de TESTE**
- `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` - **Chave de TESTE**

**⚠️ Essas chaves NÃO funcionam em produção e são conhecidas publicamente!**

---

## 🛡️ **Correções Implementadas**

### **1. Código Frontend Seguro**
```typescript
// src/hooks/use-recaptcha.ts
export function useRecaptcha(): UseRecaptchaReturn {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  
  if (!siteKey) {
    console.error('[reCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY não configurada')
    setError('reCAPTCHA não configurado')
    return { 
      isLoaded: false, 
      isExecuting: false, 
      executeRecaptcha: async () => '', 
      error: 'reCAPTCHA não configurado' 
    }
  }
  // ... resto do código
}
```

### **2. Backend Seguro**
```typescript
// src/lib/api/pacto-v2.ts
async verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY not configured')
  }
  // ... verificação com Google
}
```

### **3. Documentação Atualizada**
- ✅ Removidas chaves de teste
- ✅ Adicionados placeholders seguros
- ✅ Instruções claras sobre onde obter chaves

---

## 🔑 **Como Configurar reCAPTCHA Corretamente**

### **1. Criar Chaves no Google reCAPTCHA**
```bash
# Acessar: https://www.google.com/recaptcha/admin
# 1. Criar novo site
# 2. Escolher reCAPTCHA v3
# 3. Adicionar domínios:
#    - localhost (desenvolvimento)
#    - seu-dominio.com (produção)
# 4. Obter chaves
```

### **2. Configurar Variáveis de Ambiente**

#### **Desenvolvimento (.env.local)**
```bash
# Chave pública (pode ser exposta)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...sua_chave_publica_real

# Chave secreta (NUNCA expor)
RECAPTCHA_SECRET_KEY=6Lc...sua_chave_secreta_real
```

#### **Produção (Vercel)**
```bash
# Configurar via Vercel Dashboard ou CLI
vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY production
vercel env add RECAPTCHA_SECRET_KEY production
```

---

## 🚨 **Riscos das Chaves Expostas**

### **Chave Site Key (Pública)**
- ✅ **Pode ser pública** (é normal)
- ✅ **Usada no frontend**
- ✅ **Visível no código fonte**

### **Chave Secreta (Privada)**
- ❌ **NUNCA deve ser pública**
- ❌ **Usada apenas no backend**
- ❌ **Se exposta: atacantes podem burlar reCAPTCHA**

### **Chaves de Teste**
- ❌ **Não funcionam em produção**
- ❌ **Conhecidas publicamente**
- ❌ **Podem ser usadas por atacantes**

---

## ✅ **Verificação de Segurança**

### **Checklist de Segurança**
- [x] Removida chave hardcoded do código
- [x] Adicionada validação de chave obrigatória
- [x] Removidas chaves de teste da documentação
- [x] Adicionados placeholders seguros
- [x] Documentação atualizada com instruções

### **Teste de Configuração**
```bash
# Verificar se as chaves estão configuradas
curl -s http://localhost:3000/api/health/rate-limit | jq '.recaptcha'

# Deve retornar:
{
  "configured": true,
  "siteKey": "6Lc...",
  "secretKey": "configured"
}
```

---

## 🔧 **Próximos Passos**

### **1. Configurar Chaves Reais**
```bash
# 1. Acessar Google reCAPTCHA Admin
# 2. Criar chaves para seu domínio
# 3. Configurar no .env.local
# 4. Configurar no Vercel
```

### **2. Testar Funcionamento**
```bash
# 1. Abrir modal de checkout
# 2. Verificar se reCAPTCHA carrega
# 3. Tentar fazer simulação
# 4. Verificar logs do backend
```

### **3. Monitoramento**
```bash
# Verificar logs de reCAPTCHA
tail -f logs/recaptcha.log

# Verificar métricas no Google reCAPTCHA Admin
# Acessar: https://www.google.com/recaptcha/admin
```

---

## 📊 **Status Final**

**Chave Site Key:** ✅ **Configuração corrigida**  
**Chave Secreta:** ✅ **Configuração corrigida**  
**Documentação:** ✅ **Atualizada e segura**  
**Código:** ✅ **Sem chaves hardcoded**  
**Validação:** ✅ **Chave obrigatória**

**O sistema agora está seguro!** 🛡️

---

## 🚨 **AÇÃO NECESSÁRIA**

**Você precisa configurar as chaves reCAPTCHA reais:**

1. **Acessar:** https://www.google.com/recaptcha/admin
2. **Criar:** Novo site com reCAPTCHA v3
3. **Configurar:** Domínios (localhost + produção)
4. **Adicionar:** Chaves no .env.local e Vercel
5. **Testar:** Funcionamento do checkout

**Sem isso, o reCAPTCHA não funcionará em produção!**
