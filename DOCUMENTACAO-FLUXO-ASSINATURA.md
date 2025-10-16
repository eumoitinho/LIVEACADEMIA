# Documentação Técnica - Fluxo de Assinatura de Planos

## Índice

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura e Componentes](#arquitetura-e-componentes)
3. [Fluxo Detalhado Passo a Passo](#fluxo-detalhado-passo-a-passo)
4. [Estrutura do Modal de Checkout](#estrutura-do-modal-de-checkout)
5. [APIs e Integrações](#apis-e-integrações)
6. [Validações e Segurança](#validações-e-segurança)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Estados e Transições](#estados-e-transições)
9. [Monitoramento e Logs](#monitoramento-e-logs)
10. [Exemplos de Código](#exemplos-de-código)

---

## Visão Geral do Sistema

O sistema de assinatura da Live Academia é um fluxo completo que integra seleção de unidades, planos e processamento de pagamentos através da API Pacto Soluções. O sistema suporta três métodos de pagamento: cartão de crédito, PIX e boleto bancário.

### Tecnologias Utilizadas

- **Frontend**: Next.js 15 com React, TypeScript, Tailwind CSS
- **Backend**: API Routes do Next.js
- **Pagamentos**: Pacto Soluções API
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estado**: React Context API
- **Validação**: Formatação customizada e validações de negócio

### Fluxo de Dados Principal

```
Usuário → Seleção de Unidade → Carregamento de Planos → Modal de Checkout → Processamento → Confirmação
```

---

## Arquitetura e Componentes

### Estrutura de Arquivos

```
src/
├── components/
│   ├── checkout/
│   │   ├── checkout-modal.tsx          # Modal principal de checkout
│   │   └── animated-payment-card.tsx   # Preview do cartão
│   └── sections/
│       └── planos-section.tsx          # Seção de planos na homepage
├── features/
│   ├── units/
│   │   └── unit-planos.tsx            # Componente de planos por unidade
│   └── plans/
│       └── planos-cards.tsx           # Cards de planos
├── lib/
│   └── api/
│       └── pacto-api.ts               # Integração com Pacto API
└── contexts/
    └── unit-context.tsx               # Contexto da unidade atual

app/
├── api/
│   ├── pacto/
│   │   ├── venda/route.ts             # Processamento de vendas
│   │   ├── planos/[slug]/route.ts     # Busca planos por unidade
│   │   └── simular/route.ts           # Simulação de valores
│   └── checkout/
│       └── pagamento/route.ts         # Rota alternativa de pagamento
└── unidades/
    └── [slug]/
        ├── page.tsx                   # Página da unidade
        └── components/
            └── unidade-content.tsx    # Conteúdo da página da unidade
```

### Componentes Principais

#### CheckoutModal
- **Arquivo**: `src/components/checkout/checkout-modal.tsx`
- **Propósito**: Modal responsável por todo o fluxo de checkout
- **Props**:
  - `isOpen: boolean` - Estado de abertura do modal
  - `onClose: () => void` - Função para fechar o modal
  - `plano: { name: string, price: string, codigo?: string }` - Dados do plano selecionado
  - `unidadeName: string` - Nome da unidade
  - `unidadeId: string` - ID/slug da unidade

#### UnitPlanos
- **Arquivo**: `src/features/units/unit-planos.tsx`
- **Propósito**: Carrega e exibe planos disponíveis para uma unidade
- **Props**:
  - `slug: string` - Slug da unidade
  - `unidadeName: string` - Nome da unidade
  - `onMatricular: (plano) => void` - Callback para iniciar matrícula
  - `fallbackPlanos?: Array` - Planos de fallback em caso de erro

#### UnidadeContent
- **Arquivo**: `app/unidades/[slug]/components/unidade-content.tsx`
- **Propósito**: Página principal da unidade com informações e planos
- **Funcionalidades**:
  - Exibe dados da unidade
  - Carrega planos via UnitPlanos
  - Gerencia estado do modal de checkout

---

## Fluxo Detalhado Passo a Passo

### 1. Acesso à Unidade

**Localização**: `app/unidades/[slug]/page.tsx`

```typescript
export default async function UnidadePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Busca dados da unidade no Supabase
  const unidade = await getUnitBySlug(slug)
  
  if (!unidade) {
    notFound()
  }
  
  return (
    <UnidadeContent 
      unidade={unidade} 
      data={unidade} 
    />
  )
}
```

**Processo**:
1. Usuário navega para `/unidades/centro` (exemplo)
2. Next.js executa `getUnitBySlug('centro')` no servidor
3. Sistema busca dados da unidade no Supabase
4. Se unidade não encontrada, retorna 404
5. Renderiza `UnidadeContent` com dados da unidade

### 2. Carregamento dos Planos

**Localização**: `src/features/units/unit-planos.tsx`

```typescript
export default function UnitPlanos({ slug, unidadeName, onMatricular, fallbackPlanos }) {
  const [planos, setPlanos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Chamada para API interna
      const res = await fetch(`/api/pacto/planos/${slug}`, { 
        cache: 'no-store' 
      })
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const json = await res.json()
      const fetched = json.planos || []
      
      // Mapeia dados da API para formato do componente
      const mapped = fetched.map(p => ({
        name: p.nome,
        price: typeof p.valor === 'number' ? p.valor.toFixed(2) : p.valor,
        codigo: p.codigo,
      }))
      
      setPlanos(mapped)
    } catch (e) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      setError('Não foi possível carregar planos agora.')
      
      // Fallback para dados estáticos
      if (fallbackPlanos && fallbackPlanos.length) {
        setPlanos(fallbackPlanos)
      }
    } finally {
      setLoading(false)
    }
  }, [slug, fallbackPlanos])

  useEffect(() => { load() }, [load])
}
```

**API Route**: `app/api/pacto/planos/[slug]/route.ts`

```typescript
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    // 1. Busca unidade no Supabase
    const unit = await getUnitBySlug(slug)

    if (!unit) {
      // Fallback para dados estáticos se unidade não encontrada
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = loc.planos.map(p => ({ 
          codigo: undefined, 
          nome: p.name, 
          valor: p.price 
        }))
        return NextResponse.json({ 
          planos: staticPlanos, 
          fallback: true, 
          source: 'static' 
        })
      }
      return NextResponse.json({ error: 'Unidade não encontrada' }, { status: 404 })
    }

    // 2. Extrai chaves da unidade
    const redeKey = unit.apiKeyPlain        // Chave API descriptografada
    const publicKey = unit.chave_publica    // Chave pública

    if (!redeKey || !publicKey) {
      // Fallback para dados estáticos se chaves ausentes
      const loc = locations.find(l => l.id === slug)
      if (loc?.planos?.length) {
        const staticPlanos = loc.planos.map(p => ({ 
          codigo: undefined, 
          nome: p.name, 
          valor: p.price 
        }))
        return NextResponse.json({ 
          planos: staticPlanos, 
          fallback: true, 
          source: 'static' 
        })
      }
      return NextResponse.json({ error: 'Chaves da unidade ausentes' }, { status: 503 })
    }

    // 3. Busca planos via Pacto API
    const codigo = unit.codigo_unidade || slug.toUpperCase()
    const planos = await pactoAPI.getPlanosUnidade(redeKey, publicKey, codigo)

    return NextResponse.json({ planos, fallback: false })
  } catch (error) {
    console.error('[GET /api/pacto/planos]', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
```

### 3. Iniciação do Checkout

**Localização**: `app/unidades/[slug]/components/unidade-content.tsx`

```typescript
export default function UnidadeContent({ unidade, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState(null)
  const { setCurrentUnit } = useUnit()

  // Configura contexto da unidade
  useEffect(() => {
    if (unidade.logo) {
      setCurrentUnit({
        name: unidade.name,
        logo: unidade.logo
      })
    }
    return () => setCurrentUnit(null)
  }, [unidade, setCurrentUnit])

  const handleMatricular = (plano) => {
    setSelectedPlano(plano)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlano(null)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Conteúdo da unidade */}
      
      {/* Seção de planos */}
      <UnitPlanos 
        slug={unidade.slug}
        unidadeName={unidade.name}
        onMatricular={handleMatricular}
        fallbackPlanos={data.planos}
      />

      {/* Modal de checkout */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plano={selectedPlano}
        unidadeName={unidade.name}
        unidadeId={unidade.slug}
      />
    </main>
  )
}
```

---

## Estrutura do Modal de Checkout

### Estados do Modal

```typescript
const [step, setStep] = useState(1)                    // Etapa atual (1-4)
const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'boleto'>('cartao')
const [loading, setLoading] = useState(false)          // Estado de loading
const [paymentResult, setPaymentResult] = useState(null) // Resultado do pagamento
const [simulation, setSimulation] = useState(null)     // Dados da simulação
const [simulationLoading, setSimulationLoading] = useState(false)
const [simulationError, setSimulationError] = useState(null)
const [simulationFallback, setSimulationFallback] = useState(false)
```

### Dados do Formulário

```typescript
const [formData, setFormData] = useState({
  // Dados pessoais
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  endereco: '',
  
  // Dados do cartão (apenas para cartão)
  numeroCartao: '',
  nomeCartao: '',
  validadeCartao: '',
  cvvCartao: ''
})
```

### Etapa 1: Dados Pessoais

**Campos Obrigatórios**:
- Nome Completo
- E-mail
- Telefone
- CPF

**Campos Opcionais**:
- Endereço

**Validações**:

```typescript
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')                    // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2')       // 123.456789
    .replace(/(\d{3})(\d)/, '$1.$2')       // 123.456.789
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')  // 123.456.789-01
    .replace(/(-\d{2})\d+?$/, '$1')        // Limita a 11 dígitos
}

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')                    // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, '($1) $2')     // (11) 99999
    .replace(/(\d{5})(\d)/, '$1-$2')       // (11) 99999-9999
    .replace(/(-\d{4})\d+?$/, '$1')        // Limita a 11 dígitos
}

const handleNextStep = () => {
  if (step === 1) {
    // Validação dos campos obrigatórios
    if (formData.nome && formData.email && formData.telefone && formData.cpf) {
      setStep(2)
    } else {
      alert('Por favor, preencha todos os campos obrigatórios')
    }
  } else if (step === 2) {
    processPayment()
  }
}
```

**Interface do Formulário**:

```typescript
{step === 1 && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-live-textPrimary mb-4">
      Dados Pessoais
    </h3>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          Nome Completo *
        </label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => handleInputChange('nome', e.target.value)}
          className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-live-textPrimary"
          placeholder="Digite seu nome completo"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          E-mail *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-live-textPrimary"
          placeholder="seu@email.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          Telefone *
        </label>
        <input
          type="text"
          value={formData.telefone}
          onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
          className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-live-textPrimary"
          placeholder="(11) 99999-9999"
          maxLength={15}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          CPF *
        </label>
        <input
          type="text"
          value={formData.cpf}
          onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
          className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-live-textPrimary"
          placeholder="000.000.000-00"
          maxLength={14}
        />
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-live-textPrimary mb-1">
        Endereço
      </label>
      <input
        type="text"
        value={formData.endereco}
        onChange={(e) => handleInputChange('endereco', e.target.value)}
        className="w-full px-4 py-3 bg-live-border/10 border border-live-border/30 rounded-lg focus:border-live-accent focus:outline-none text-live-textPrimary"
        placeholder="Rua, número, bairro, cidade"
      />
    </div>
  </div>
)}
```

### Etapa 2: Forma de Pagamento

**Opções Disponíveis**:
- Cartão de Crédito
- PIX
- Boleto Bancário

**Simulação de Valores**:

```typescript
const runSimulation = useCallback(async () => {
  if (!plano || !isMountedRef.current) return

  setSimulationLoading(true)
  setSimulationError(null)
  setSimulationFallback(false)
  setSimulation(null)

  try {
    const valorNumber = normalizeToNumber(plano.price)
    const payload = {
      slug: unidadeId,
      planoId: plano.codigo || `PLANO_${unidadeId}`,
      paymentMethod,
    }
    
    if (!Number.isNaN(valorNumber)) {
      payload.valor = Number(valorNumber.toFixed(2))
    }

    const response = await fetch('/api/pacto/simular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.error || 'Falha na simulação do plano')
    }

    if (!data?.simulacao) {
      setSimulationError('Nenhum resultado de simulação recebido.')
      return
    }

    setSimulation(data.simulacao)
    setSimulationFallback(Boolean(data.fallback))
  } catch (error) {
    console.error('Erro na simulação:', error)
    setSimulationError(error instanceof Error ? error.message : 'Falha na simulação')
  } finally {
    setSimulationLoading(false)
  }
}, [paymentMethod, plano, unidadeId])

useEffect(() => {
  if (step === 2 && plano) {
    runSimulation()
  }
}, [step, plano, runSimulation])
```

**Interface de Seleção de Pagamento**:

```typescript
{step === 2 && (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-live-textPrimary mb-4">
      Forma de Pagamento
    </h3>
    
    {/* Resumo do Plano */}
    <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-live-textPrimary">{plano.name}</h4>
          <p className="text-live-textSecondary">{unidadeName}</p>
        </div>
        <div className="text-2xl font-bold text-live-accent">
          R$ {plano.price}/mês
        </div>
      </div>
    </div>
    
    {/* Métodos de Pagamento */}
    <div className="space-y-3">
      <div 
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
          paymentMethod === 'cartao' 
            ? 'border-live-accent bg-live-accent/5' 
            : 'border-live-border/30 hover:border-live-accent/50'
        }`}
        onClick={() => setPaymentMethod('cartao')}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-live-accent" />
          <span className="font-medium text-live-textPrimary">Cartão de Crédito</span>
        </div>
      </div>
      
      <div 
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
          paymentMethod === 'pix' 
            ? 'border-live-accent bg-live-accent/5' 
            : 'border-live-border/30 hover:border-live-accent/50'
        }`}
        onClick={() => setPaymentMethod('pix')}
      >
        <div className="flex items-center gap-3">
          <QrCode className="h-5 w-5 text-live-accent" />
          <span className="font-medium text-live-textPrimary">PIX</span>
        </div>
      </div>
      
      <div 
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
          paymentMethod === 'boleto' 
            ? 'border-live-accent bg-live-accent/5' 
            : 'border-live-border/30 hover:border-live-accent/50'
        }`}
        onClick={() => setPaymentMethod('boleto')}
      >
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-live-accent" />
          <span className="font-medium text-live-textPrimary">Boleto Bancário</span>
        </div>
      </div>
    </div>
  </div>
)}
```

**Formulário do Cartão** (apenas para cartão):

```typescript
{paymentMethod === 'cartao' && (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Preview do Cartão */}
    <div className="flex items-center justify-center">
      <AnimatedPaymentCard
        cardNumber={formData.numeroCartao || '•••• •••• •••• ••••'}
        cardName={formData.nomeCartao || 'SEU NOME'}
        cardExpiry={formData.validadeCartao || 'MM/AA'}
      />
    </div>

    {/* Formulário do Cartão */}
    <div className="space-y-4">
      <h4 className="font-semibold text-live-textPrimary">Dados do Cartão</h4>
      
      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          Número do Cartão
        </label>
        <input
          type="text"
          value={formData.numeroCartao}
          onChange={(e) => handleInputChange('numeroCartao', formatCardNumber(e.target.value))}
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-live-textPrimary mb-1">
          Nome no Cartão
        </label>
        <input
          type="text"
          value={formData.nomeCartao}
          onChange={(e) => handleInputChange('nomeCartao', e.target.value.toUpperCase())}
          className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
          placeholder="NOME COMO NO CARTÃO"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-live-textPrimary mb-1">
            Validade
          </label>
          <input
            type="text"
            value={formData.validadeCartao}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '')
              if (value.length >= 2) {
                value = value.replace(/(\d{2})(\d)/, '$1/$2')
              }
              handleInputChange('validadeCartao', value)
            }}
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
            placeholder="MM/AA"
            maxLength={5}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-live-textPrimary mb-1">
            CVV
          </label>
          <input
            type="text"
            value={formData.cvvCartao}
            onChange={(e) => handleInputChange('cvvCartao', e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-live-yellow/50 focus:outline-none text-white transition-all"
            placeholder="123"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  </div>
)}
```

### Etapa 3: Processamento

```typescript
{step === 3 && (
  <div className="text-center py-12">
    <Loader2 className="h-12 w-12 animate-spin text-live-accent mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-live-textPrimary mb-2">
      Processando Pagamento
    </h3>
    <p className="text-live-textSecondary">
      Aguarde enquanto processamos sua matrícula...
    </p>
  </div>
)}
```

### Etapa 4: Confirmação

**Para Cartão de Crédito**:
```typescript
{paymentMethod === 'cartao' && (
  <div>
    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
      <Check className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-2xl font-semibold text-live-textPrimary mb-2">
      Matrícula Realizada!
    </h3>
    <p className="text-live-textSecondary mb-6">
      Parabéns! Sua matrícula na {unidadeName} foi realizada com sucesso.
    </p>
  </div>
)}
```

**Para PIX**:
```typescript
{paymentMethod === 'pix' && paymentResult?.pixCode && (
  <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30 mb-6">
    <h4 className="font-semibold text-live-textPrimary mb-3">Código PIX</h4>
    <div className="bg-white p-4 rounded-lg mb-4">
      {/* QR Code seria renderizado aqui */}
      <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
        <QrCode className="h-12 w-12 text-gray-400" />
      </div>
    </div>
    <div className="flex items-center gap-2 bg-live-bg p-3 rounded-lg">
      <code className="flex-1 text-sm text-live-textPrimary break-all">
        {paymentResult.pixCode}
      </code>
      <button 
        onClick={() => navigator.clipboard.writeText(paymentResult.pixCode!)}
        className="p-2 hover:bg-live-border/20 rounded transition-colors"
      >
        <Copy className="h-4 w-4 text-live-accent" />
      </button>
    </div>
    <p className="text-sm text-live-textSecondary mt-2">
      Após o pagamento, sua matrícula será ativada automaticamente.
    </p>
  </div>
)}
```

**Para Boleto**:
```typescript
{paymentMethod === 'boleto' && paymentResult?.boletoUrl && (
  <div className="bg-live-border/5 p-4 rounded-lg border border-live-border/30 mb-6">
    <h4 className="font-semibold text-live-textPrimary mb-3">Boleto Bancário</h4>
    <a
      href={paymentResult.boletoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-live-accent text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
    >
      <FileText className="h-5 w-5" />
      Abrir Boleto
      <ExternalLink className="h-4 w-4" />
    </a>
    <p className="text-sm text-live-textSecondary mt-3">
      Após o pagamento, sua matrícula será ativada em até 2 dias úteis.
    </p>
  </div>
)}
```

---

## APIs e Integrações

### API de Vendas

**Endpoint**: `POST /api/pacto/venda`

**Request Body**:
```typescript
{
  slug: string,                    // Slug da unidade
  planoId: string,                 // ID do plano
  planoNome: string,               // Nome do plano
  valor: number,                   // Valor do plano
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  customer: {
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    endereco?: string
  },
  cardData?: {                     // Apenas para cartão
    numeroCartao: string,
    nomeCartao: string,
    validadeCartao: string,
    cvvCartao: string
  },
  cupom?: string                   // Opcional
}
```

**Response**:
```typescript
{
  success: boolean,
  error?: string,
  transactionId?: string,          // Para cartão
  pixCode?: string,                // Para PIX
  boletoUrl?: string,              // Para boleto
  data?: any
}
```

**Implementação**:

```typescript
export async function POST(req: NextRequest) {
  let body: any
  try { 
    body = await req.json() 
  } catch { 
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) 
  }

  const { slug, planoId, planoNome, valor, paymentMethod, customer, cardData, cupom } = body || {}

  // Validação de campos obrigatórios
  if (!slug || !planoId || !planoNome || (valor === undefined || valor === null) || !paymentMethod || !customer) {
    return NextResponse.json({ 
      error: 'Campos obrigatórios: slug, planoId, planoNome, valor, paymentMethod, customer' 
    }, { status: 400 })
  }

  // Validação de método de pagamento
  if (!['cartao','pix','boleto'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'paymentMethod inválido' }, { status: 400 })
  }

  try {
    // 1. Buscar unidade no Supabase
    const unit = await getUnitBySlug(slug)

    if (!unit) {
      console.error(`[Venda ${slug}] Unidade não encontrada no banco`)
      return NextResponse.json({ 
        success: false, 
        error: 'Unidade não encontrada' 
      }, { status: 404 })
    }

    // 2. Extrair chaves da unidade
    const redeKey = unit.apiKeyPlain
    const publicKey = unit.chave_publica

    if (!redeKey || !publicKey) {
      console.error(`[Venda ${slug}] Chaves ausentes - redeKey: ${!!redeKey}, publicKey: ${!!publicKey}`)
      return NextResponse.json({ 
        success: false, 
        error: 'Chaves da unidade ausentes' 
      }, { status: 503 })
    }

    // 3. Processar checkout via Pacto API
    const codigo = getCodigoUnidade(slug)
    const response = await processCheckout(redeKey, publicKey, paymentMethod, {
      unidadeId: codigo,
      planoId,
      planoNome,
      valor,
      paymentMethod,
      customer,
      cardData,
      cupom,
    })

    if (!response.success) {
      return NextResponse.json({ ...response, fallback: false }, { status: 400 })
    }
    
    return NextResponse.json({ ...response, fallback: false })
  } catch (error) {
    console.error('[POST /api/pacto/venda]', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Falha ao processar venda' 
    }, { status: 500 })
  }
}
```

### API de Simulação

**Endpoint**: `POST /api/pacto/simular`

**Request Body**:
```typescript
{
  slug: string,
  planoId: string,
  paymentMethod: 'cartao' | 'pix' | 'boleto',
  valor?: number,
  cupom?: string
}
```

**Response**:
```typescript
{
  simulacao: {
    valorTotal?: number | string,
    parcelas?: Array<{
      numero: number,
      valor: number,
      vencimento?: string
    }>
  },
  fallback: boolean
}
```

### Integração com Pacto API

**Arquivo**: `src/lib/api/pacto-api.ts`

```typescript
class PactoAPI {
  private baseURL = 'https://apigw.pactosolucoes.com.br'

  async processCheckout(redeKey: string, publicKey: string, paymentMethod: string, data: any) {
    const endpoint = paymentMethod === 'cartao' ? '/venda/cartao' :
                     paymentMethod === 'pix' ? '/venda/pix' : '/venda/boleto'
    
    const response = await this.makeRequest(redeKey, publicKey, endpoint, {
      method: 'POST',
      body: data
    })
    
    return {
      success: response.success,
      transactionId: response.transactionId,
      pixCode: response.pixCode,      // Para PIX
      boletoUrl: response.boletoUrl   // Para boleto
    }
  }

  async getPlanosUnidade(redeKey: string, publicKey: string, codigoUnidade: string): Promise<Plano[]> {
    try {
      const response = await this.makeRequest(redeKey, publicKey, `/planos/${codigoUnidade}`, {
        method: 'GET'
      })
      
      return response.planos || []
    } catch (error) {
      console.error('[PactoAPI] Erro ao buscar planos:', error)
      throw error
    }
  }

  async simularVenda(redeKey: string, publicKey: string, planoId: string, payload: any): Promise<any> {
    try {
      const response = await this.makeRequest(redeKey, publicKey, '/simular', {
        method: 'POST',
        body: payload
      })
      
      return response.simulacao || null
    } catch (error) {
      console.error('[PactoAPI] Erro na simulação:', error)
      throw error
    }
  }

  private async makeRequest(redeKey: string, publicKey: string, endpoint: string, options: any) {
    const url = `${this.baseURL}${endpoint}`
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Rede-Key': redeKey,
      'X-Public-Key': publicKey,
      'X-API-Version': '2.0'
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  }
}

export const pactoAPI = new PactoAPI()
```

---

## Validações e Segurança

### Validação de Dados de Entrada

**Frontend**:
```typescript
// Validação de CPF
const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '')
  
  if (cleanCPF.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false
  
  return true
}

// Validação de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validação de telefone
const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')
  return cleanPhone.length >= 10 && cleanPhone.length <= 11
}
```

**Backend**:
```typescript
// Validação de campos obrigatórios
const validateRequiredFields = (data: any) => {
  const required = ['slug', 'planoId', 'planoNome', 'valor', 'paymentMethod', 'customer']
  const missing = required.filter(field => !data[field])
  
  if (missing.length > 0) {
    throw new Error(`Campos obrigatórios faltando: ${missing.join(', ')}`)
  }
}

// Validação de método de pagamento
const validatePaymentMethod = (method: string) => {
  const validMethods = ['cartao', 'pix', 'boleto']
  if (!validMethods.includes(method)) {
    throw new Error('Método de pagamento inválido')
  }
}

// Sanitização de dados
const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '')
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  return input
}
```

### Segurança das Chaves API

**Criptografia**:
```typescript
// lib/crypto.ts
import crypto from 'crypto'

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET

if (!ENCRYPTION_SECRET) {
  throw new Error('ENCRYPTION_SECRET não definida')
}

const KEY = crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest()

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher('aes-256-gcm', KEY)
  cipher.setAAD(Buffer.from('live-academia'))
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

export function decrypt(encryptedText: string): string {
  const parts = encryptedText.split(':')
  if (parts.length !== 3) {
    throw new Error('Formato de texto criptografado inválido')
  }
  
  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const decipher = crypto.createDecipher('aes-256-gcm', KEY)
  decipher.setAAD(Buffer.from('live-academia'))
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}
```

**Uso no Repository**:
```typescript
// lib/api/supabase-repository.ts
export async function getUnitBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from('units')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  // Descriptografa a chave API
  const apiKeyPlain = data.chave_api ? decrypt(data.chave_api) : null

  return {
    ...data,
    apiKeyPlain
  }
}
```

### Rate Limiting e Proteção

```typescript
// Middleware de rate limiting
const rateLimitMap = new Map()

export function rateLimit(identifier: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  const requests = rateLimitMap.get(identifier) || []
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    throw new Error('Rate limit exceeded')
  }
  
  validRequests.push(now)
  rateLimitMap.set(identifier, validRequests)
}

// Uso nas rotas
export async function POST(req: NextRequest) {
  const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
  
  try {
    rateLimit(clientIP, 5, 60000) // 5 requests por minuto
  } catch {
    return NextResponse.json({ error: 'Muitas tentativas' }, { status: 429 })
  }
  
  // ... resto da lógica
}
```

---

## Tratamento de Erros

### Estratégias de Fallback

**1. Fallback para Dados Estáticos**:
```typescript
// Se API falhar, usa dados estáticos
const loc = locations.find(l => l.id === slug)
if (loc?.planos?.length) {
  const staticPlanos = loc.planos.map(p => ({ 
    codigo: undefined, 
    nome: p.name, 
    valor: p.price 
  }))
  return NextResponse.json({ 
    planos: staticPlanos, 
    fallback: true, 
    source: 'static' 
  })
}
```

**2. Retry Automático**:
```typescript
async function retryRequest<T>(fn: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let lastError: Error
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000 // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError!
}
```

**3. Timeout de Requisições**:
```typescript
async function fetchWithTimeout(url: string, options: any, timeoutMs: number = 10000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
```

### Tratamento de Erros no Frontend

```typescript
// Componente com tratamento de erro
export default function UnitPlanos({ slug, unidadeName, onMatricular, fallbackPlanos }) {
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/pacto/planos/${slug}`, { 
        cache: 'no-store',
        signal: AbortSignal.timeout(5000) // 5s timeout
      })
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const json = await res.json()
      setPlanos(json.planos || [])
    } catch (e) {
      console.error('[UnitPlanos] Falha ao carregar planos', e)
      
      if (e.name === 'AbortError') {
        setError('Tempo limite excedido. Verifique sua conexão.')
      } else {
        setError('Não foi possível carregar planos agora.')
      }
      
      // Fallback para dados estáticos
      if (fallbackPlanos && fallbackPlanos.length) {
        setPlanos(fallbackPlanos)
        setError(null) // Remove erro se tem fallback
      }
    } finally {
      setLoading(false)
    }
  }, [slug, fallbackPlanos])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    load()
  }

  if (error && planos.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-live-textSecondary mb-4">{error}</p>
          <button
            onClick={handleRetry}
            disabled={retryCount >= 3}
            className="px-6 py-3 rounded-2xl bg-live-border/20 hover:bg-live-border/30 border border-live-border/30 hover:border-live-accent/50 text-live-textPrimary hover:text-live-accent transition-all duration-300 disabled:opacity-50"
          >
            {retryCount >= 3 ? 'Máximo de tentativas atingido' : 'Tentar novamente'}
          </button>
        </div>
      </section>
    )
  }
}
```

### Logging de Erros

```typescript
// Sistema de logging
export async function logError(error: Error, context: any) {
  try {
    await fetch('/api/logs/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name
        },
        context,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        url: typeof window !== 'undefined' ? window.location.href : 'server'
      })
    })
  } catch (logError) {
    console.error('Failed to log error:', logError)
  }
}

// Uso no catch
catch (error) {
  await logError(error, { 
    slug, 
    action: 'load_planos',
    retryCount 
  })
  setError('Erro interno. Tente novamente.')
}
```

---

## Estados e Transições

### Estados do Modal

```typescript
interface CheckoutState {
  step: 1 | 2 | 3 | 4
  paymentMethod: 'cartao' | 'pix' | 'boleto'
  loading: boolean
  paymentResult: PactoResponse | null
  simulation: SimulacaoResumo | null
  simulationLoading: boolean
  simulationError: string | null
  simulationFallback: boolean
}

const initialState: CheckoutState = {
  step: 1,
  paymentMethod: 'cartao',
  loading: false,
  paymentResult: null,
  simulation: null,
  simulationLoading: false,
  simulationError: null,
  simulationFallback: false
}
```

### Transições de Estado

```typescript
// Transição: Etapa 1 → Etapa 2
const handleNextStep = () => {
  if (step === 1) {
    // Validação dos dados pessoais
    const requiredFields = ['nome', 'email', 'telefone', 'cpf']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      setError(`Campos obrigatórios: ${missingFields.join(', ')}`)
      return
    }
    
    // Validações específicas
    if (!isValidEmail(formData.email)) {
      setError('E-mail inválido')
      return
    }
    
    if (!isValidCPF(formData.cpf)) {
      setError('CPF inválido')
      return
    }
    
    setStep(2)
    setError(null)
  } else if (step === 2) {
    processPayment()
  }
}

// Transição: Etapa 2 → Etapa 3
const processPayment = async () => {
  setLoading(true)
  setStep(3)
  
  try {
    const saleBody = {
      slug: unidadeId,
      planoId: plano?.codigo || `PLANO_${unidadeId}`,
      planoNome: plano!.name,
      valor: parseFloat(plano!.price.replace(',', '.')),
      paymentMethod,
      customer: {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: formData.endereco,
      },
    }
    
    if (paymentMethod === 'cartao') {
      // Validação dos dados do cartão
      if (!formData.numeroCartao || !formData.nomeCartao || !formData.validadeCartao || !formData.cvvCartao) {
        throw new Error('Dados do cartão incompletos')
      }
      
      saleBody.cardData = {
        numeroCartao: formData.numeroCartao,
        nomeCartao: formData.nomeCartao,
        validadeCartao: formData.validadeCartao,
        cvvCartao: formData.cvvCartao,
      }
    }

    const res = await fetch('/api/pacto/venda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleBody),
    })
    
    const result: PactoResponse = await res.json()
    setPaymentResult(result)
    
    if (result.success) {
      setStep(4) // Sucesso
    } else {
      throw new Error(result.error || 'Erro no pagamento')
    }
  } catch (error) {
    console.error('Erro no pagamento:', error)
    setError(error.message)
    setStep(2) // Volta para etapa de pagamento
  } finally {
    setLoading(false)
  }
}
```

### Estados de Loading

```typescript
// Estados de loading específicos
const [loadingStates, setLoadingStates] = useState({
  loadingPlanos: false,
  loadingSimulation: false,
  loadingPayment: false,
  loadingValidation: false
})

// Função para gerenciar estados de loading
const setLoadingState = (key: keyof typeof loadingStates, value: boolean) => {
  setLoadingStates(prev => ({ ...prev, [key]: value }))
}

// Uso nos componentes
const loadPlanos = async () => {
  setLoadingState('loadingPlanos', true)
  try {
    // ... carregar planos
  } finally {
    setLoadingState('loadingPlanos', false)
  }
}
```

---

## Monitoramento e Logs

### Sistema de Logging

```typescript
// lib/logger.ts
interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  message: string
  context?: any
  userId?: string
  sessionId?: string
}

export class Logger {
  private static instance: Logger
  private logs: LogEntry[] = []

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  info(message: string, context?: any) {
    this.log('info', message, context)
  }

  warn(message: string, context?: any) {
    this.log('warn', message, context)
  }

  error(message: string, context?: any) {
    this.log('error', message, context)
  }

  private log(level: LogEntry['level'], message: string, context?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.sanitizeContext(context)
    }

    this.logs.push(entry)
    
    // Enviar para serviço de logging em produção
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(entry)
    }
    
    // Console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console[level === 'error' ? 'error' : 'log'](`[${level.toUpperCase()}] ${message}`, context)
    }
  }

  private sanitizeContext(context: any): any {
    if (!context) return context
    
    // Remove dados sensíveis
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'cpf', 'cartao']
    const sanitized = { ...context }
    
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]'
      }
    }
    
    return sanitized
  }

  private async sendToLoggingService(entry: LogEntry) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      })
    } catch (error) {
      console.error('Failed to send log:', error)
    }
  }
}

export const logger = Logger.getInstance()
```

### Analytics de Conversão

```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  userId?: string
  sessionId: string
}

export class Analytics {
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.loadUserId()
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  private loadUserId(): void {
    // Carrega ID do usuário do localStorage ou cookie
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('analytics_user_id') || undefined
    }
  }

  track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        page: typeof window !== 'undefined' ? window.location.pathname : 'server',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
      },
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId
    }

    // Enviar para Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties)
    }

    // Enviar para Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, properties)
    }

    // Enviar para serviço interno
    this.sendToInternalService(analyticsEvent)
  }

  private async sendToInternalService(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }

  // Eventos específicos do checkout
  checkoutStarted(plano: string, unidade: string) {
    this.track('checkout_started', { plano, unidade })
  }

  checkoutStepCompleted(step: number, method?: string) {
    this.track('checkout_step_completed', { step, payment_method: method })
  }

  paymentCompleted(method: string, success: boolean, transactionId?: string) {
    this.track('payment_completed', { 
      payment_method: method, 
      success, 
      transaction_id: transactionId 
    })
  }

  paymentFailed(method: string, error: string) {
    this.track('payment_failed', { payment_method: method, error })
  }
}

export const analytics = new Analytics()
```

### Métricas de Performance

```typescript
// lib/performance.ts
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()

  startTiming(key: string): void {
    this.metrics.set(key, performance.now())
  }

  endTiming(key: string): number {
    const startTime = this.metrics.get(key)
    if (!startTime) {
      console.warn(`No start time found for ${key}`)
      return 0
    }

    const duration = performance.now() - startTime
    this.metrics.delete(key)
    
    // Log da métrica
    console.log(`[PERF] ${key}: ${duration.toFixed(2)}ms`)
    
    // Enviar para analytics se for uma métrica importante
    if (key.startsWith('checkout_') || key.startsWith('api_')) {
      analytics.track('performance_metric', {
        metric_name: key,
        duration_ms: Math.round(duration)
      })
    }
    
    return duration
  }

  measureAsync<T>(key: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(key)
    return fn().finally(() => {
      this.endTiming(key)
    })
  }
}

export const perfMonitor = new PerformanceMonitor()

// Uso
const planos = await perfMonitor.measureAsync('load_planos', async () => {
  const res = await fetch(`/api/pacto/planos/${slug}`)
  return res.json()
})
```

---

## Exemplos de Código

### Exemplo Completo de Uso do Modal

```typescript
// Página de exemplo usando o modal
'use client'

import { useState } from 'react'
import CheckoutModal from '@/components/checkout/checkout-modal'

export default function PlanosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState(null)

  const planos = [
    { name: 'Plano Tradicional', price: '119,90', codigo: 'TRAD001' },
    { name: 'Plano Diamante', price: '159,90', codigo: 'DIAM001' }
  ]

  const handleMatricular = (plano) => {
    setSelectedPlano(plano)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlano(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nossos Planos</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {planos.map((plano, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{plano.name}</h3>
            <p className="text-2xl font-bold text-green-600 mb-4">
              R$ {plano.price}/mês
            </p>
            <button
              onClick={() => handleMatricular(plano)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Matricular
            </button>
          </div>
        ))}
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plano={selectedPlano}
        unidadeName="Live Academia Centro"
        unidadeId="centro"
      />
    </div>
  )
}
```

### Exemplo de API Route Customizada

```typescript
// app/api/checkout/custom/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { processCheckout } from '@/lib/api/pacto-api'
import { getUnitBySlug } from '@/lib/api/supabase-repository'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    const { slug, planoId, customer, paymentMethod } = body

    // Log da requisição
    logger.info('Custom checkout started', { 
      slug, 
      planoId, 
      paymentMethod: paymentMethod,
      customerEmail: customer.email 
    })

    // Validações customizadas
    if (!slug || !planoId || !customer || !paymentMethod) {
      logger.warn('Missing required fields', { body })
      return NextResponse.json({ 
        error: 'Campos obrigatórios faltando' 
      }, { status: 400 })
    }

    // Buscar unidade
    const unit = await getUnitBySlug(slug)
    if (!unit) {
      logger.warn('Unit not found', { slug })
      return NextResponse.json({ 
        error: 'Unidade não encontrada' 
      }, { status: 404 })
    }

    // Processar pagamento
    const result = await processCheckout(
      unit.apiKeyPlain,
      unit.chave_publica,
      paymentMethod,
      {
        unidadeId: unit.codigo_unidade,
        planoId,
        customer,
        // ... outros dados
      }
    )

    // Log do resultado
    logger.info('Custom checkout completed', {
      success: result.success,
      transactionId: result.transactionId,
      duration: Date.now() - startTime
    })

    return NextResponse.json(result)
  } catch (error) {
    logger.error('Custom checkout failed', { 
      error: error.message,
      duration: Date.now() - startTime
    })
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}
```

### Exemplo de Teste do Modal

```typescript
// __tests__/checkout-modal.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CheckoutModal from '@/components/checkout/checkout-modal'

const mockPlano = {
  name: 'Plano Teste',
  price: '100,00',
  codigo: 'TEST001'
}

const mockProps = {
  isOpen: true,
  onClose: jest.fn(),
  plano: mockPlano,
  unidadeName: 'Unidade Teste',
  unidadeId: 'teste'
}

describe('CheckoutModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders modal when open', () => {
    render(<CheckoutModal {...mockProps} />)
    
    expect(screen.getByText('Matrícula')).toBeInTheDocument()
    expect(screen.getByText('Plano Teste - Unidade Teste')).toBeInTheDocument()
  })

  it('shows step 1 by default', () => {
    render(<CheckoutModal {...mockProps} />)
    
    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu nome completo')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<CheckoutModal {...mockProps} />)
    
    const continueButton = screen.getByText('Continuar')
    fireEvent.click(continueButton)
    
    // Deve mostrar erro ou alert
    await waitFor(() => {
      expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument()
    })
  })

  it('formats CPF input correctly', () => {
    render(<CheckoutModal {...mockProps} />)
    
    const cpfInput = screen.getByPlaceholderText('000.000.000-00')
    fireEvent.change(cpfInput, { target: { value: '12345678901' } })
    
    expect(cpfInput.value).toBe('123.456.789-01')
  })

  it('formats phone input correctly', () => {
    render(<CheckoutModal {...mockProps} />)
    
    const phoneInput = screen.getByPlaceholderText('(11) 99999-9999')
    fireEvent.change(phoneInput, { target: { value: '11999999999' } })
    
    expect(phoneInput.value).toBe('(11) 99999-9999')
  })
})
```

Este documento fornece uma visão completa e técnica do sistema de assinatura da Live Academia, incluindo todos os detalhes de implementação, validações, tratamento de erros e exemplos práticos de uso.
