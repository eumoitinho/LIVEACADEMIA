# 🎯 Como Criar Homepage Editável no Sanity Studio (Manual)

## ⚠️ Problema
O documento homepage não está editável no Sanity Studio ou foi deletado.

## ✅ Solução Manual (Garantida)

### Passo 1: Acessar o Sanity Studio

1. **Local**: Acesse `http://localhost:3000/studio`
2. **Cloud**: Acesse seu Studio na cloud (ex: `https://seu-projeto.sanity.studio`)

### Passo 2: Limpar Documentos Antigos (Opcional)

1. No Studio, vá para a lista de documentos
2. Procure por documentos do tipo **"Homepage"**
3. Se houver múltiplos ou documentos deletados:
   - Selecione os documentos antigos
   - Clique em **"Delete"** para removê-los permanentemente
   - Ou clique em **"Restore"** se quiser restaurar um deletado

### Passo 3: Criar Novo Documento Homepage

1. No Studio, clique em **"Create"** ou **"Criar"**
2. Selecione **"Homepage"** na lista de tipos
3. Preencha os campos com os valores abaixo:

#### SEO
```
Título da Página: Live Academia | Rede de Academias em Manaus
Descrição: Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.
Palavras-chave: academia, manaus, fitness, musculação, aulas coletivas
```

#### Seção Hero
```
Título (Linha 1): Transforme.
Subtítulo (Linha 2): Evolua.
Terceiro Título (Linha 3): Viva.
Descrição: Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.

Avaliação:
  - Valor: 4.9
  - Label: Elite rating
  - Número de Alunos: 15k+ atletas

CTA Principal:
  - Texto: Comece Agora
  - Link: /planos

CTA Secundário:
  - Texto: Ver as aulas
  - Link: /aulas-coletivas

Texto do Rodapé: Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.
```

#### Seção Sobre
```
Badge: Sobre a Live Academia
Título: Seu treino, suas regras
Descrição: A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.

Estatísticas:
  - Valor: 10+, Label: Anos de Experiência
  - Valor: 15k+, Label: Alunos Ativos

Destaques:
  - Equipamentos de última geração
  - Profissionais qualificados
  - Aulas coletivas inclusas
  - Sem fidelidade
  - Horário flexível
  - Ambiente climatizado
```

#### Seção Benefícios
```
Badge: Benefícios
Título: Por que escolher a Live Academia?
Descrição: Descubra todos os benefícios que fazem da Live Academia a melhor escolha para sua jornada fitness.
Lista de Benefícios: (pode ficar vazio inicialmente)
```

#### Seção Planos
```
Badge: Planos
Título: Escolha o plano ideal para você
Descrição: Planos flexíveis sem fidelidade. Cancele quando quiser, sem multas ou taxas.
Planos Disponíveis: (pode ficar vazio inicialmente)
```

#### Seção Depoimentos
```
Badge: Depoimentos
Título: O que nossos alunos dizem
Descrição: Conheça histórias reais de transformação de nossos alunos.
Lista de Depoimentos: (pode ficar vazio inicialmente)
```

### Passo 4: Publicar o Documento

1. Após preencher os campos, clique em **"Publish"** ou **"Publicar"**
2. O documento será salvo e ficará **EDITÁVEL** no Studio
3. Você poderá editar a qualquer momento

### Passo 5: Adicionar Imagens (Opcional)

1. Na seção **Hero**, adicione uma imagem de fundo:
   - Clique em **"Imagem de Fundo"**
   - Faça upload de uma imagem (recomendado: 1920x1080px)
   - Adicione um texto alternativo para acessibilidade

2. Na seção **About**, você pode adicionar uma imagem também

## ✅ Verificação

Após criar o documento:

1. ✅ O documento deve aparecer na lista de documentos do tipo "Homepage"
2. ✅ O documento deve estar **editável** (não aparecer como deletado)
3. ✅ Você deve conseguir clicar nele e editá-lo
4. ✅ O site deve carregar os dados corretamente

## 🆘 Problemas Comuns

### Documento não aparece como editável

**Solução**:
- Verifique se o documento foi **publicado** (não apenas salvo como rascunho)
- Verifique se você está no **dataset correto** (production)
- Recarregue a página do Studio

### Documento aparece como deletado

**Solução**:
- Clique no documento
- Procure por um botão **"Restore"** ou **"Restaurar"**
- Ou delete o documento e crie um novo

### Múltiplos documentos homepage

**Solução**:
- Delete os documentos antigos/duplicados
- Mantenha apenas o mais recente ou o que você quiser usar
- A aplicação usará o documento mais recente por padrão

### Campos não aparecem

**Solução**:
- Verifique se o schema `homepage.ts` está correto
- Verifique se o Studio está atualizado (faça deploy se necessário)
- Recarregue a página do Studio

## 📝 Valores Padrão Completos

Se precisar dos valores padrão completos, consulte o arquivo:
- `scripts/restore-homepage-sanity.js` (objeto `homepageData`)

## 🎉 Pronto!

Após seguir estes passos, você terá um documento homepage **editável** no Sanity Studio que poderá ser modificado a qualquer momento.

