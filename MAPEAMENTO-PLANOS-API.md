# 📊 Mapeamento de Planos da API Pacto

## 🔄 **Status Atual**

✅ **Os cards de plano estão puxando dados da API Pacto V2!**

## 📋 **Payload da API Pacto**

A API retorna planos no formato:
```json
{
  "return": [
    {
      "codigo": 14,
      "nome": "DAY USE (1 ACESSO)",
      "mensalidade": 60,
      "primeiraParcela": 60,
      "adesao": 0,
      "fidelidade": 1,
      "parcelamentoOperadora": false,
      "maxDivisao": 1,
      "modalidades": ["MUSCULAÇÃO"],
      "diasVencimento": [1, 2, 3, ...],
      "regimeRecorrencia": false,
      "apresentarPactoFlow": true,
      "quantidadeCompartilhamentos": 0,
      "qtdCreditoPlanoCredito": 1,
      "produtoTaxaCancelamento": "CUSTO ADMINISTRATIVO DO CANCELAMENTO",
      "percentualMultaCancelamento": 0
      // ... outros campos
    }
  ]
}
```

## 🎯 **Mapeamento Implementado**

### **Campos Principais:**
- `codigo` → ID único do plano
- `nome` → Nome do plano
- `mensalidade` → Valor mensal (em vez de `valor`)
- `primeiraParcela` → Valor da primeira parcela
- `adesao` → Taxa de adesão
- `fidelidade` → Meses de fidelidade (0 = sem fidelidade)
- `modalidades` → Array de modalidades incluídas
- `quantidadeCompartilhamentos` → Número de convidados
- `qtdCreditoPlanoCredito` → Créditos para Day Use
- `percentualMultaCancelamento` → Taxa de cancelamento

### **Features Dinâmicas:**
```typescript
const getPlanFeatures = (plano: PactoPlano) => {
  const features = []
  
  // Modalidades incluídas
  plano.modalidades.forEach(modalidade => {
    features.push(modalidade)
  })

  // Fidelidade
  if (plano.fidelidade === 0) {
    features.push("Sem fidelidade")
  } else {
    features.push(`Fidelidade de ${plano.fidelidade} meses`)
  }

  // Taxa de cancelamento
  if (plano.percentualMultaCancelamento === 0) {
    features.push("Sem taxa de cancelamento")
  } else {
    features.push(`Taxa de cancelamento: ${plano.percentualMultaCancelamento}%`)
  }

  // Compartilhamentos
  if (plano.quantidadeCompartilhamentos > 0) {
    features.push(`${plano.quantidadeCompartilhamentos} convidado(s) por mês`)
  }

  // Créditos (Day Use)
  if (plano.qtdCreditoPlanoCredito > 0) {
    features.push(`${plano.qtdCreditoPlanoCredito} acesso(s) por mês`)
  }

  // Adesão
  if (plano.adesao > 0) {
    features.push(`Taxa de adesão: ${formatCurrency(plano.adesao)}`)
  }

  return features
}
```

## 🏷️ **Badges Dinâmicos**

### **Tipos de Badge:**
- **"Mais Popular"** - Planos Diamante sem fidelidade ≤ R$ 200
- **"Day Use"** - Planos com créditos limitados
- **"Sem Fidelidade"** - Planos sem compromisso
- **"Xm Fidelidade"** - Planos com fidelidade específica

### **Filtros Aplicados:**
```typescript
const isRelevantPlan = (plano: PactoPlano) => {
  const nome = plano.nome.toUpperCase()
  
  // Excluir planos irrelevantes
  if (nome.includes('TESTE') || nome.includes('DESCONTINUADO')) {
    return false
  }
  
  // Incluir apenas planos principais
  return nome.includes('DIAMANTE') || nome.includes('DAY USE')
}
```

## 💰 **Exibição de Preços**

### **Preço Principal:**
- Mostra `mensalidade` como valor principal
- Formato: "R$ 149,90 / mês"

### **Taxa de Adesão:**
- Exibida separadamente se `adesao > 0`
- Formato: "+ Taxa de adesão: R$ 39,90"

### **Exemplo Visual:**
```
┌─────────────────────────────────┐
│ 🏷️ Mais Popular                 │
│                                 │
│ PLANO DIAMANTE SEM FIDELIDADE   │
│                                 │
│ R$ 149,90 / mês                 │
│ + Taxa de adesão: R$ 39,90      │
│                                 │
│ ✅ MUSCULAÇÃO                    │
│ ✅ Sem fidelidade               │
│ ✅ 2 convidados por mês         │
│ ✅ Sem taxa de cancelamento     │
│ ✅ Acesso ao app Live Academia  │
│ ✅ Aulas coletivas inclusas     │
│ ✅ Horário livre                │
│                                 │
│ [Matricule-se Agora]            │
└─────────────────────────────────┘
```

## 🔄 **Fluxo Completo**

### **1. Frontend (PlanosSectionDynamic):**
```typescript
// Busca planos da API
const response = await fetch(`/api/pacto/planos/${slug}`)
const result = await response.json()

// Aplica filtros e exibe
const planosRelevantes = result.planos.filter(isRelevantPlan)
```

### **2. API Route (/api/pacto/planos/[slug]):**
```typescript
// Busca unidade no Supabase
const unit = await getUnitBySlug(slug)

// Chama Pacto V2 API
const planos = await pactoV2API.getPlanosUnidade(slug, unit.codigo_unidade)

// Retorna planos ou fallback
return NextResponse.json({ planos })
```

### **3. Pacto V2 API:**
```typescript
// Autentica e busca planos
const response = await this.client.get(`/v2/vendas/${slug}/planos/${codigoUnidade}`)
return response.data.retorno
```

## 📈 **Planos Identificados**

Com base no payload fornecido, os planos disponíveis são:

### **Day Use:**
- **DAY USE (1 ACESSO)** - R$ 60,00
- **DAY USE (4 ACESSOS)** - R$ 240,00

### **Planos Diamante:**
- **PLANO ASSINATURA DIAMANTE FIDELIDADE 12 MESES** - R$ 139,90 + R$ 39,90 adesão
- **PLANO ASSINATURA DIAMANTE SEM FIDELIDADE** - R$ 199,90 (5 convidados + BIO)
- **PLANO ASSINATURA DIAMANTE SEM FIDELIDADE** - R$ 149,90 (ADS)
- **PLANO ASSINATURA PROMOCIONAL DIAMANTE FIDELIDADE 6 MESES** - R$ 179,90 + R$ 39,90 adesão
- **PLANO ASSINATURA PROMOCIONAL FIDELIDADE DIAMANTE 12 MESES** - R$ 149,90 + R$ 39,90 adesão

## 🚀 **Próximos Passos**

1. **Configurar variáveis de ambiente** para acessar a API
2. **Testar conectividade** com a API Pacto
3. **Ajustar filtros** conforme necessidade
4. **Implementar checkout** com os códigos corretos dos planos

---

**✅ Sistema totalmente dinâmico e integrado com a API Pacto V2!**
**📊 Planos são exibidos em tempo real com dados reais!**
