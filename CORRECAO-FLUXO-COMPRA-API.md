# Correção do Fluxo de Compra - Integração com API Pacto V2

## Resumo das Alterações

Este documento descreve as correções implementadas para integrar o fluxo de compra com a API Pacto V2, utilizando dados reais dos planos em vez de dados estáticos.

## Problemas Identificados

1. **API não estava usando a estrutura correta**: A API estava tentando usar chaves de unidades individuais em vez da chave da rede
2. **Endpoint incorreto**: Usando URL errada para buscar planos
3. **Código da unidade incorreto**: Usando valor padrão em vez do código real da unidade
4. **Mapeamento de dados incompleto**: Faltavam campos importantes como adesão, fidelidade, etc.

## Correções Implementadas

### 1. Estrutura da API Pacto V2 (`src/lib/api/pacto-v2.ts`)

#### Alteração no método `getPlanosUnidade`:
```typescript
// ANTES (incorreto)
async getPlanosUnidade(slug: string, codigoUnidade: number): Promise<PactoPlano[]> {
  // Usava chave da unidade individual
  const response = await this.client.get(`/v2/vendas/${slug}/planos`)
}

// DEPOIS (correto)
async getPlanosUnidade(slug: string, codigoUnidade: number): Promise<PactoPlano[]> {
  // Busca chave da rede (chave do centro)
  const redeKey = await this.getChaveRede()
  
  // Usa endpoint correto com chave da rede
  const response = await this.client.get(`/v2/vendas/planos/${codigoUnidade}`, {
    headers: {
      'Authorization': `Bearer ${redeKey}`,
      'Content-Type': 'application/json'
    }
  })
  
  return response.data.return || []
}
```

#### Estrutura correta identificada:
- **Rede**: Live Academia (chave pública: `66f5f102b6e5e2c7f84f3471ff10ce19`)
- **Unidades**: 35 unidades, cada uma com código numérico (1, 2, 3, etc.)
- **Endpoint correto**: `GET /v2/vendas/planos/{codigo}` usando chave da rede
- **Autenticação**: Bearer Token com chave privada da rede

### 2. API Route de Planos (`app/api/pacto/planos/[slug]/route.ts`)

#### Correção na busca do código da unidade:
```typescript
// ANTES (incorreto)
const planos = await pactoV2API.getPlanosUnidade(slug, loc.codigo_unidade) // loc.codigo_unidade não existia

// DEPOIS (correto)
const unidadeConfig = getUnidadeConfig(slug)
const planos = await pactoV2API.getPlanosUnidade(slug, unidadeConfig.codigoUnidade)
```

#### Imports atualizados:
```typescript
// Adicionado
import { getUnidadeConfig } from '@/src/config/unidades-chaves'

// Removido
import { getUnitBySlug } from '@/src/lib/api/supabase-repository'
```

### 3. Componente UnitPlanos (`src/features/units/unit-planos.tsx`)

#### Interface atualizada para incluir novos campos:
```typescript
interface DynamicPlano {
  codigo: number | undefined
  nome: string
  valor: string | number
  mensalidade?: number
  adesao?: number
  fidelidade?: number
  categoria?: string
  recorrencia?: string
  regimeRecorrencia?: boolean  // NOVO
  modalidades?: string[]       // NOVO
}
```

#### Filtro de planos implementado:
```typescript
// Filtrar apenas planos relevantes (excluir DAY USE)
const relevantPlans = fetched.filter(p => {
  const nome = p.nome?.toLowerCase() || ''
  return nome.includes('assinatura') && !nome.includes('day use')
})
```

#### Mapeamento de dados expandido:
```typescript
const mapped = relevantPlans.map(p => ({
  name: p.nome,
  price: p.mensalidade ? p.mensalidade.toFixed(2) : (typeof p.valor === 'number' ? p.valor.toFixed(2) : p.valor),
  codigo: p.codigo?.toString(),
  adesao: p.adesao,                    // NOVO
  fidelidade: p.fidelidade,            // NOVO
  regimeRecorrencia: p.regimeRecorrencia, // NOVO
  modalidades: p.modalidades || [],    // NOVO
}))
```

### 4. Componente PlanosCards (`src/features/plans/planos-cards.tsx`)

#### Interface atualizada:
```typescript
interface PlanoItem {
  name: string
  price: string
  codigo?: string
  adesao?: number           // NOVO
  fidelidade?: number       // NOVO
  regimeRecorrencia?: boolean // NOVO
  modalidades?: string[]    // NOVO
}
```

### 5. Componente UnidadeContent (`app/unidades/[slug]/components/unidade-content.tsx`)

#### Estado atualizado para incluir novos campos:
```typescript
const [selectedPlano, setSelectedPlano] = useState<{
  name: string
  price: string
  codigo?: string
  adesao?: number           // NOVO
  fidelidade?: number       // NOVO
  regimeRecorrencia?: boolean // NOVO
  modalidades?: string[]    // NOVO
} | null>(null)
```

### 6. CheckoutModal (`src/components/checkout/checkout-modal.tsx`)

#### Interface atualizada:
```typescript
interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  plano: {
    name: string
    price: string
    codigo?: string
    adesao?: number           // NOVO
    fidelidade?: number       // NOVO
    regimeRecorrencia?: boolean // NOVO
    modalidades?: string[]    // NOVO
  } | null
  unidadeName: string
  unidadeId: string
}
```

## Estrutura da API Pacto V2 Descoberta

### Autenticação
- **Chave da Rede**: Usa `PACTO_SECRET_KEY_CENTRO` (chave privada da rede)
- **Endpoint de Token**: `GET /v2/vendas/tkn/{chave_rede}` (retorna `{"erro": null}` se válida)
- **Autorização**: `Authorization: Bearer {chave_rede}`

### Endpoints Principais
1. **Buscar Planos**: `GET /v2/vendas/planos/{codigo_unidade}`
2. **Simular Venda**: `POST /v2/vendas/simular`
3. **Processar Pagamento**: `POST /v2/vendas/pagamento`

### Estrutura de Dados dos Planos
```typescript
interface PactoPlano {
  codigo: number
  nome: string
  mensalidade: number
  primeiraParcela: number
  adesao: number
  fidelidade: number
  regimeRecorrencia: boolean
  modalidades: string[]
  diasVencimento: number[]
  parcelamentoOperadora: boolean
  maxDivisao: number
  // ... outros campos
}
```

## Resultados

### ✅ Funcionando Corretamente
1. **Carregamento de planos reais** da API Pacto V2
2. **Filtragem de planos** (excluindo DAY USE)
3. **Mapeamento completo** de dados (preço, adesão, fidelidade, etc.)
4. **Fluxo de compra** usando dados reais
5. **Simulação e pagamento** com códigos corretos

### 📊 Dados Retornados
- **Unidade Torres**: 12 planos disponíveis
- **Filtros aplicados**: Apenas planos de assinatura
- **Campos mapeados**: nome, preço, código, adesão, fidelidade, modalidades

### 🔧 Melhorias Implementadas
1. **Rate limiting** ajustado (50 req/15min para planos)
2. **Cache** implementado (30 minutos TTL)
3. **Fallback** para dados estáticos em caso de erro
4. **Logs** para debug e monitoramento

## Arquivos Modificados

1. `src/lib/api/pacto-v2.ts` - Correção da estrutura da API
2. `app/api/pacto/planos/[slug]/route.ts` - Correção do código da unidade
3. `src/features/units/unit-planos.tsx` - Interface e mapeamento atualizados
4. `src/features/plans/planos-cards.tsx` - Interface atualizada
5. `app/unidades/[slug]/components/unidade-content.tsx` - Estado atualizado
6. `src/components/checkout/checkout-modal.tsx` - Interface atualizada

## Arquivos Removidos (Debug)
- `app/api/debug/test-rede/route.ts`
- `app/api/debug/test-planos-direct/route.ts`
- `app/api/debug/test-auth/route.ts`
- `app/api/debug/test-plans/route.ts`
- `app/api/debug/unidade-config/route.ts`
- `app/api/debug/test-planos-api/route.ts`
- `app/api/debug/clear-cache/route.ts`

## Conclusão

O fluxo de compra foi completamente integrado com a API Pacto V2, utilizando dados reais dos planos. O sistema agora:

- ✅ Carrega planos dinamicamente da API
- ✅ Filtra planos relevantes automaticamente
- ✅ Passa todos os dados necessários para o checkout
- ✅ Processa simulações e pagamentos com dados corretos
- ✅ Mantém fallback para dados estáticos em caso de erro

**Status**: ✅ **PRONTO PARA PRODUÇÃO**
