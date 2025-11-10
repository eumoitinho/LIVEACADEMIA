# 🔄 Restaurar Homepage no Sanity

## Problema

O documento da homepage foi deletado no Sanity Studio, causando erro "This document has been deleted".

## Solução: Restaurar o Documento

### Opção 1: Via Sanity CLI (Recomendado)

1. **Certifique-se de ter o Sanity CLI instalado:**
```bash
npm install -g @sanity/cli
```

2. **Autentique-se no Sanity:**
```bash
sanity login
```

3. **Execute o script de restauração:**
```bash
sanity exec sanity/data/restore-homepage.js --with-user-token
```

### Opção 2: Via Sanity Studio (Manual)

1. **Acesse o Sanity Studio:**
   - Local: `http://localhost:3000/studio`
   - Cloud: `https://seu-projeto.sanity.studio`

2. **Crie um novo documento:**
   - Clique em "Create" ou "Criar"
   - Selecione "Homepage"

3. **Preencha os campos com os valores padrão:**

#### SEO
- **Título da Página**: `Live Academia | Rede de Academias em Manaus`
- **Descrição**: `Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.`
- **Palavras-chave**: `academia`, `manaus`, `fitness`, `musculação`, `aulas coletivas`

#### Seção Hero
- **Título (Linha 1)**: `Transforme.`
- **Subtítulo (Linha 2)**: `Evolua.`
- **Terceiro Título (Linha 3)**: `Viva.`
- **Descrição**: `Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.`
- **Avaliação**:
  - Valor: `4.9`
  - Label: `Elite rating`
  - Número de Alunos: `15k+ atletas`
- **CTA Principal**:
  - Texto: `Comece Agora`
  - Link: `/planos`
- **CTA Secundário**:
  - Texto: `Ver as aulas`
  - Link: `/aulas-coletivas`
- **Texto do Rodapé**: `Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.`

#### Seção Sobre
- **Badge**: `Sobre a Live Academia`
- **Título**: `Seu treino, suas regras`
- **Descrição**: `A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.`
- **Estatísticas**:
  - `10+` - `Anos de Experiência`
  - `15k+` - `Alunos Ativos`
- **Destaques**:
  - Equipamentos de última geração
  - Profissionais qualificados
  - Aulas coletivas inclusas
  - Sem fidelidade
  - Horário flexível
  - Ambiente climatizado

#### Seção Benefícios
- **Badge**: `Benefícios`
- **Título**: `Por que escolher a Live Academia?`
- **Descrição**: `Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.`
- **Lista de Benefícios**: (Pode ficar vazio inicialmente)

#### Seção Planos
- **Badge**: `Planos`
- **Título**: `Escolha o plano ideal para você`
- **Descrição**: `Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.`
- **Planos Disponíveis**: (Pode ficar vazio inicialmente)

#### Seção Depoimentos
- **Badge**: `Depoimentos`
- **Título**: `O que nossos alunos dizem`
- **Descrição**: `Conheça histórias reais de transformação de nossos alunos.`
- **Lista de Depoimentos**: (Pode ficar vazio inicialmente)

4. **Publique o documento:**
   - Clique em "Publish" ou "Publicar"

### Opção 3: Via API do Sanity (Programático)

Se você tem acesso ao token da API do Sanity, pode executar o script diretamente:

```javascript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'seu-project-id',
  dataset: 'production',
  token: 'seu-token',
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Importar e executar a função
import restoreHomepage from './sanity/data/restore-homepage.js'
await restoreHomepage(client)
```

## Verificação

Após restaurar o documento:

1. **Verifique no Sanity Studio:**
   - O documento "Homepage" deve aparecer na lista
   - Todos os campos devem estar preenchidos

2. **Verifique no site:**
   - Acesse a homepage: `https://seu-dominio.com`
   - A página deve carregar sem erros
   - Os conteúdos devem aparecer corretamente

3. **Verifique os logs:**
   - Se ainda houver erro, verifique os logs do console
   - Verifique se a query está retornando dados: `*[_type == "homepage"][0]`

## Troubleshooting

### Erro: "Document not found"

**Causa**: O documento ainda não foi criado ou não está publicado.

**Solução**: 
- Certifique-se de que o documento foi criado e publicado no Sanity Studio
- Verifique se está usando o dataset correto (production vs development)

### Erro: "Missing required fields"

**Causa**: Alguns campos obrigatórios não foram preenchidos.

**Solução**: 
- Verifique o schema da homepage em `sanity/schemas/homepage.ts`
- Preencha todos os campos marcados como obrigatórios

### Erro: "Query returned null"

**Causa**: A query não está encontrando o documento.

**Solução**:
- Verifique se o documento existe: `*[_type == "homepage"]`
- Verifique se o documento está publicado
- Verifique se está usando o dataset correto

## Prevenção Futura

Para evitar que isso aconteça novamente:

1. **Backup regular**: Faça backup do conteúdo do Sanity regularmente
2. **Permissões**: Limite quem pode deletar documentos importantes
3. **Versionamento**: Use o histórico de versões do Sanity para restaurar documentos deletados
4. **Documentação**: Mantenha documentação sobre como restaurar documentos importantes

## Recursos Adicionais

- [Sanity CLI Documentation](https://www.sanity.io/docs/cli)
- [Sanity Client Documentation](https://www.sanity.io/docs/js-client)
- [Sanity Document History](https://www.sanity.io/docs/document-history)

