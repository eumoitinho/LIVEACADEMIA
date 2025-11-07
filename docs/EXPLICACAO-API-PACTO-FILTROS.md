# 🔍 Explicação: Sistema de API por Filtro da Pacto - Planos

## 📋 Visão Geral

Este documento explica como funciona o sistema de filtragem de planos da API da Pacto no site Live Academia. O sistema permite que cada unidade exiba apenas os planos desejados, com personalização completa de como eles aparecem no site.

---

## 🏗️ Arquitetura do Sistema

### Fluxo de Dados

```
API Pacto V3 → Endpoint Next.js → Sanity CMS (Configuração) → Frontend (Exibição)
```

1. **API Pacto V3** fornece todos os planos disponíveis
2. **Endpoint Next.js** (`/api/pacto-v3/planos/[slug]`) busca e processa os planos
3. **Sanity CMS** armazena configuração de quais planos exibir por unidade
4. **Frontend** exibe apenas os planos configurados, seguindo as personalizações

---

## 🔄 Como Funciona o Sistema de Filtros

### 1. Busca de Planos da API

#### Endpoint
```
GET /api/pacto-v3/planos/:slug
```

#### Processo
1. O sistema busca a chave secreta da unidade nas variáveis de ambiente
2. Faz requisição à API da Pacto usando a chave de autenticação
3. A API retorna todos os planos disponíveis para a empresa
4. Os planos são mapeados para um formato padronizado
5. Resultado é armazenado em cache por 30 minutos

#### Exemplo de Requisição
```typescript
const response = await axios.get('https://apigw.pactosolucoes.com.br/planos', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${chaveSecret}`,
    'empresaId': '1'
  },
  params: {
    filters: {
      "site": true,
      "size": 100,
      "sort": "codigo,asc"
    }
  }
})
```

#### Filtros da API
- **`site: true`**: Retorna apenas planos marcados para exibição no site
- **`size: 100`**: Limita a 100 planos por requisição
- **`sort: "codigo,asc"`**: Ordena por código em ordem crescente

#### Formato de Resposta
```json
{
  "planos": [
    {
      "codigo": 86,
      "nome": "ASSINATURA DIAMANTE 12 MESES DE FIDELIDADE",
      "mensalidade": 159.90,
      "adesao": 0,
      "fidelidade": 12,
      "regimeRecorrencia": true,
      "modalidades": ["MUSCULAÇÃO"]
    }
  ],
  "fallback": false,
  "source": "api",
  "unidade": "torres",
  "total": 1
}
```

---

### 2. Configuração no Sanity CMS

#### Localização
Cada unidade no Sanity possui um campo especial: **`planosAPIConfig`**

#### Componente Customizado
O campo usa um componente React customizado (`PlanosConfigInput`) que:
1. Busca automaticamente os planos da API da Pacto
2. Exibe lista de todos os planos disponíveis
3. Permite selecionar quais planos exibir
4. Permite configurar personalizações para cada plano

#### Estrutura de Configuração
```json
[
  {
    "codigo": 86,
    "nome": "ASSINATURA DIAMANTE 12 MESES",
    "exibir": true,
    "destaque": false,
    "ordem": 1,
    "badge": "MAIS VENDIDO",
    "tituloCustomizado": "Plano Diamante",
    "descricaoCustomizada": "O melhor plano para você",
    "textoMatricular": "Assinar Agora",
    "beneficiosCustomizados": [
      "Sem taxa de matrícula",
      "Acesso completo",
      "App incluso"
    ]
  }
]
```

#### Campos de Configuração

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `codigo` | number | Código do plano na API (obrigatório) |
| `nome` | string | Nome original do plano |
| `exibir` | boolean | Se o plano deve ser exibido (padrão: true) |
| `destaque` | boolean | Se o plano está em destaque |
| `ordem` | number | Ordem de exibição (menor = primeiro) |
| `badge` | string | Badge do plano ("MAIS VENDIDO", "RECOMENDADO", "NOVIDADE", "OFERTA") |
| `tituloCustomizado` | string | Título personalizado (opcional) |
| `descricaoCustomizada` | string | Descrição personalizada (opcional) |
| `textoMatricular` | string | Texto do botão (padrão: "Matricular") |
| `beneficiosCustomizados` | string[] | Lista de benefícios personalizados |

---

### 3. Processamento no Frontend

#### Componente: `UnitPlanos`

O componente `UnitPlanos` (`src/features/units/unit-planos.tsx`) é responsável por:
1. Buscar planos da API
2. Buscar configuração do Sanity
3. Aplicar filtros baseados na configuração
4. Ordenar planos conforme a ordem definida
5. Aplicar personalizações (títulos, badges, etc.)
6. Renderizar os cards de planos

#### Fluxo de Processamento

```typescript
// 1. Buscar planos da API
const res = await fetch(`/api/pacto-v3/planos/${slug}`)
const { planos } = await res.json()

// 2. Buscar configuração do Sanity
const configSanity = await getUnitPlanosConfig(slug)

// 3. Filtrar planos permitidos
if (configSanity.length > 0) {
  const codigosPermitidos = configSanity
    .filter(f => f.exibir !== false)
    .map(f => f.codigo)
  
  planosParaExibir = planos.filter(p =>
    codigosPermitidos.includes(p.codigo)
  )
  
  // 4. Ordenar por ordem definida
  planosParaExibir.sort((a, b) => {
    const ordemA = configSanity.find(f => f.codigo === a.codigo)?.ordem || 999
    const ordemB = configSanity.find(f => f.codigo === b.codigo)?.ordem || 999
    return ordemA - ordemB
  })
}

// 5. Aplicar personalizações
planosParaExibir = planosParaExibir.map(plano => {
  const config = configSanity.find(c => c.codigo === plano.codigo)
  return {
    ...plano,
    nome: config?.tituloCustomizado || plano.nome,
    descricao: config?.descricaoCustomizada || plano.descricao,
    badge: config?.badge,
    destaque: config?.destaque,
    textoMatricular: config?.textoMatricular || 'Matricular',
    beneficios: config?.beneficiosCustomizados || plano.beneficios
  }
})
```

---

## 🎯 Casos de Uso

### Caso 1: Exibir Apenas Planos Específicos

**Situação:** Unidade quer exibir apenas 3 planos de 10 disponíveis.

**Solução:**
1. Acessar unidade no Sanity
2. Abrir campo "Configuração de Planos da API"
3. Selecionar apenas os 3 planos desejados
4. Salvar configuração

**Resultado:** Apenas os 3 planos selecionados serão exibidos no site.

---

### Caso 2: Personalizar Título e Descrição

**Situação:** O nome do plano na API é muito longo: "ASSINATURA DIAMANTE 12 MESES DE FIDELIDADE - 2025 (159,90) ADS"

**Solução:**
1. Na configuração do plano, preencher "Título Customizado": "Plano Diamante"
2. Preencher "Descrição Customizada": "Acesso completo à academia por 12 meses"
3. Salvar

**Resultado:** O card exibirá "Plano Diamante" como título, com a descrição personalizada.

---

### Caso 3: Definir Ordem de Exibição

**Situação:** Quer que o plano mais barato apareça primeiro, mesmo tendo código maior.

**Solução:**
1. Na configuração, definir "Ordem" para cada plano
2. Plano mais barato: ordem = 1
3. Plano intermediário: ordem = 2
4. Plano mais caro: ordem = 3
5. Salvar

**Resultado:** Planos serão exibidos na ordem definida, independente do código.

---

### Caso 4: Adicionar Badge e Destaque

**Situação:** Quer destacar o plano mais popular com badge "MAIS VENDIDO".

**Solução:**
1. Na configuração do plano, marcar "Destaque"
2. Selecionar "Badge": "MAIS VENDIDO"
3. Salvar

**Resultado:** O plano aparecerá com badge "MAIS VENDIDO" e estilo de destaque.

---

### Caso 5: Personalizar Benefícios

**Situação:** A API não retorna benefícios, mas quer exibir lista customizada.

**Solução:**
1. Na configuração do plano, preencher "Benefícios Personalizados"
2. Adicionar um benefício por linha:
   ```
   Sem taxa de matrícula
   Sem fidelidade
   Acesso completo ao app
   ```
3. Salvar

**Resultado:** O card exibirá a lista de benefícios personalizada.

---

## 🔧 Funcionalidades Técnicas

### Cache
- **Duração:** 30 minutos
- **Chave:** `planos:${slug}`
- **Objetivo:** Reduzir chamadas à API e melhorar performance

### Rate Limiting
- **Limite:** 50 requisições por 15 minutos por IP
- **Objetivo:** Proteger a API de abuso
- **Resposta em caso de limite:** Status 429 com informações de rate limit

### Fallback
Se a API falhar:
1. Sistema tenta usar dados do cache
2. Se não houver cache, usa planos estáticos definidos no Sanity
3. Se não houver planos estáticos, exibe mensagem de erro

### Validação
- Verifica se unidade existe
- Verifica se chave secreta está configurada
- Valida formato dos dados da API
- Trata erros graciosamente

---

## 📊 Estrutura de Dados

### Plano da API (Formato Original)
```typescript
interface PactoPlano {
  codigo: number
  nome: string
  mensalidade: number
  adesao: number
  fidelidade: number
  regimeRecorrencia: boolean
  modalidades: string[]
}
```

### Configuração no Sanity
```typescript
interface PlanoConfig {
  codigo: number
  nome: string
  exibir: boolean
  destaque: boolean
  ordem: number
  badge?: string
  tituloCustomizado?: string
  descricaoCustomizada?: string
  textoMatricular?: string
  beneficiosCustomizados?: string[]
}
```

### Plano Final (Para Exibição)
```typescript
interface PlanoExibicao {
  codigo: number
  nome: string  // Título customizado ou original
  mensalidade: number
  adesao: number
  fidelidade: number
  descricao?: string  // Descrição customizada
  badge?: string
  destaque: boolean
  textoMatricular: string
  beneficios: string[]
  modalidades: string[]
}
```

---

## 🚀 Como Configurar uma Unidade

### Passo a Passo

1. **Acessar Sanity Studio**
   - URL: `http://localhost:3000/studio`
   - Fazer login

2. **Abrir Unidade**
   - Menu: `🏢 Unidades`
   - Selecionar unidade desejada

3. **Configurar Planos**
   - Scroll até campo "🚀 Configuração de Planos da API"
   - Sistema busca automaticamente planos da API
   - Lista de planos disponíveis aparece

4. **Selecionar Planos**
   - Marcar checkboxes dos planos desejados
   - Planos selecionados aparecem na seção "Planos Configurados"

5. **Personalizar Cada Plano**
   - Para cada plano selecionado:
     - Definir ordem de exibição
     - Marcar "Destaque" se necessário
     - Selecionar badge
     - Personalizar título (opcional)
     - Personalizar descrição (opcional)
     - Personalizar texto do botão
     - Adicionar benefícios customizados

6. **Salvar e Publicar**
   - Clicar em "Publish" para publicar alterações
   - Alterações são aplicadas imediatamente no site

---

## 🐛 Troubleshooting

### Problema: Planos não aparecem no site

**Possíveis causas:**
1. Configuração não foi salva/publicada
2. Nenhum plano foi selecionado na configuração
3. Todos os planos estão com `exibir: false`
4. API está retornando erro
5. Cache desatualizado

**Soluções:**
1. Verificar se configuração foi publicada no Sanity
2. Verificar se há planos selecionados
3. Verificar campo `exibir` de cada plano
4. Verificar logs da API (`/api/pacto-v3/planos/[slug]`)
5. Limpar cache do navegador e aguardar 30 minutos

---

### Problema: Planos aparecem na ordem errada

**Possíveis causas:**
1. Campo "Ordem" não foi definido
2. Ordem está incorreta na configuração
3. Cache desatualizado

**Soluções:**
1. Verificar valores do campo "Ordem" no Sanity
2. Ajustar ordem (números menores aparecem primeiro)
3. Limpar cache e aguardar

---

### Problema: Título/descrição customizada não aparece

**Possíveis causas:**
1. Campos não foram preenchidos
2. Configuração não foi salva
3. Cache do frontend

**Soluções:**
1. Verificar se campos estão preenchidos no Sanity
2. Verificar se foi publicado
3. Limpar cache do navegador (Ctrl+Shift+R)

---

### Problema: Badge não aparece

**Possíveis causas:**
1. Badge não foi selecionado
2. Valor do badge não é reconhecido
3. Cache desatualizado

**Soluções:**
1. Verificar se badge foi selecionado no Sanity
2. Usar apenas valores válidos: "MAIS VENDIDO", "RECOMENDADO", "NOVIDADE", "OFERTA"
3. Limpar cache

---

## 📈 Melhores Práticas

### 1. Organização
- Use ordem incremental de 10 (1, 10, 20, 30) para facilitar inserção
- Mantenha nomes de planos consistentes
- Documente alterações importantes

### 2. Performance
- Limite número de planos exibidos (recomendado: máximo 5-6)
- Use cache adequadamente
- Evite alterações frequentes desnecessárias

### 3. UX
- Personalize títulos para serem claros e concisos
- Use badges estrategicamente (não em todos os planos)
- Mantenha descrições informativas mas curtas
- Use benefícios customizados para destacar diferenciais

### 4. Manutenção
- Revise configurações periodicamente
- Teste após alterações
- Mantenha backup da configuração (export JSON do Sanity)
- Documente decisões de negócio (por que certos planos são exibidos)

---

## 🔗 Referências

### Documentação Relacionada
- [API V3 Implementation](/docs/API-V3-IMPLEMENTATION.md)
- [Sanity CMS Implementation](/docs/SANITY-CMS-IMPLEMENTATION.md)
- [Sanity Setup Instructions](/docs/SANITY-SETUP-INSTRUCTIONS.md)

### Arquivos de Código
- Endpoint API: `app/api/pacto-v3/planos/[slug]/route.ts`
- Componente Frontend: `src/features/units/unit-planos.tsx`
- Configuração Sanity: `sanity/components/planos-config.tsx`
- Schema Unidade: `sanity/schemas/unit.ts`
- Helper Sanity: `lib/sanity.ts` (função `getUnitPlanosConfig`)

---

## 📝 Changelog

### v1.0.0 (Janeiro 2025)
- Implementação inicial do sistema de filtros
- Integração com API Pacto V3
- Componente customizado no Sanity
- Cache e rate limiting
- Documentação completa

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0  
**Autor:** Equipe de Desenvolvimento Live Academia

