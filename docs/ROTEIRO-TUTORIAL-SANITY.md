# 🎬 Roteiro: Tutorial de Atualização de Conteúdo via Sanity CMS

## 📋 Informações Gerais do Tutorial

**Duração estimada:** 15-20 minutos  
**Público-alvo:** Editores de conteúdo, gestores de marketing, administradores  
**Nível:** Iniciante a intermediário  
**Objetivo:** Ensinar como atualizar conteúdo do site Live Academia usando o Sanity CMS

---

## 🎯 Estrutura do Roteiro

### 1. INTRODUÇÃO (2-3 minutos)

#### O que você vai aprender
- O que é o Sanity CMS
- Por que usar o Sanity para gerenciar conteúdo
- O que pode ser editado no site
- Benefícios da ferramenta

#### O que falar
> "Olá! Bem-vindo ao tutorial de como atualizar conteúdo do site Live Academia usando o Sanity CMS. Neste tutorial, você vai aprender a editar textos, imagens, planos, unidades e muito mais, sem precisar mexer em código. Vamos começar!"

---

### 2. ACESSANDO O SANITY STUDIO (1-2 minutos)

#### Passos a demonstrar
1. **Acessar o Sanity Studio**
   - URL: `http://localhost:3000/studio` (desenvolvimento)
   - URL de produção: [URL será fornecida após deploy]
   - Fazer login com conta Sanity

2. **Interface do Studio**
   - Mostrar menu lateral esquerdo
   - Explicar estrutura de documentos
   - Mostrar barra de busca

#### O que falar
> "Para começar, você precisa acessar o Sanity Studio. Em desenvolvimento, você acessa através de localhost:3000/studio. Faça login com sua conta Sanity e você verá o painel principal com todas as opções de edição."

---

### 3. EDITANDO A HOMEPAGE (3-4 minutos)

#### 3.1. Seção Hero (Principal)
**Localização:** `⚙️ Configurações Globais` → `🦸‍♂️ Seção Hero`

**O que pode ser editado:**
- Título principal
- Descrição
- Preço destacado (se houver)
- Botões de ação (CTAs)
- Imagem de fundo
- Configurações de overlay

**Demonstrar:**
- Editar título e descrição
- Alterar imagem de fundo
- Configurar botões (texto e URL)
- Salvar alterações
- Visualizar preview (se disponível)

#### 3.2. Seção Sobre
**Localização:** `🏠 Homepage`

**O que pode ser editado:**
- Badge
- Título
- Descrição
- Imagem
- Estatísticas/Destaques

**Demonstrar:**
- Editar textos
- Adicionar/alterar imagem
- Configurar lista de destaques

#### 3.3. Seção Benefícios
**Localização:** `🌟 Benefícios`

**O que pode ser editado:**
- Título da seção
- Lista de benefícios
  - Ícone (emoji)
  - Título
  - Descrição
  - Imagem
  - Cor

**Demonstrar:**
- Adicionar novo benefício
- Editar benefício existente
- Reordenar benefícios (campo "order")
- Ativar/desativar benefício

#### 3.4. Seção Planos
**Localização:** `💎 Planos`

**O que pode ser editado:**
- Título da seção
- Lista de planos
  - Nome
  - Descrição
  - Preço
  - Lista de benefícios
  - Badge (Mais vendido, Recomendado, etc.)
  - Texto do botão
  - Ordem de exibição
  - Status ativo/inativo

**Demonstrar:**
- Editar plano existente
- Adicionar novo plano
- Configurar destaque
- Definir badge
- Reordenar planos

#### 3.5. Seção Depoimentos
**Localização:** `💬 Depoimentos`

**O que pode ser editado:**
- Nome do cliente
- Cargo/Função
- Conteúdo do depoimento
- Foto do cliente
- Avaliação (estrelas)
- Ordem de exibição

**Demonstrar:**
- Adicionar novo depoimento
- Editar depoimento existente
- Upload de foto
- Configurar avaliação

#### O que falar
> "A homepage é o coração do site. Vamos ver como editar cada seção. Começando pela seção Hero, que é a primeira coisa que o visitante vê. Você pode editar o título, a descrição, a imagem de fundo e os botões de ação. Todas as alterações são salvas automaticamente ou você pode usar o botão 'Publish' para publicar."

---

### 4. GERENCIANDO UNIDADES (3-4 minutos)

#### Localização
**Menu:** `🏢 Unidades`

#### O que pode ser editado por unidade
- Nome da unidade
- Endereço completo
- Coordenadas (latitude/longitude)
- Tipo de unidade (normal, inauguração)
- Serviços disponíveis
- Horário de funcionamento
- Fotos e imagens
- Status ativo/inativo
- Destaque na homepage
- **Configuração de Planos da API** (seção especial)

#### 4.1. Edição Básica de Unidade
**Demonstrar:**
- Abrir unidade existente
- Editar nome e endereço
- Atualizar coordenadas
- Adicionar/remover fotos
- Configurar horário de funcionamento

#### 4.2. Configuração de Planos da API (IMPORTANTE)
**Localização:** Campo `🚀 Configuração de Planos da API`

**O que fazer:**
1. O sistema busca automaticamente os planos disponíveis da API da Pacto
2. Lista todos os planos encontrados
3. Você pode:
   - Selecionar quais planos exibir
   - Definir ordem de exibição
   - Configurar badge (Mais vendido, Recomendado, etc.)
   - Personalizar título do plano
   - Personalizar descrição
   - Personalizar texto do botão
   - Adicionar benefícios customizados
   - Definir qual plano está em destaque

**Demonstrar:**
- Abrir campo de configuração de planos
- Mostrar lista de planos da API
- Selecionar planos para exibir
- Configurar ordem de exibição
- Personalizar título e descrição
- Adicionar badge
- Configurar destaque

#### O que falar
> "Cada unidade tem suas próprias informações e configurações. Uma funcionalidade muito importante é a Configuração de Planos da API. Este campo permite que você escolha quais planos da API da Pacto serão exibidos para aquela unidade específica, além de personalizar como eles aparecem no site. Você pode definir a ordem, adicionar badges, personalizar textos e muito mais."

---

### 5. GERENCIANDO PLANOS (2-3 minutos)

#### Localização
**Menu:** `💎 Planos`

#### O que pode ser editado
- Nome do plano
- Descrição
- Preço
- Label do preço (ex: "por mês")
- Lista de benefícios/recursos
- Texto do botão CTA
- URL do botão
- Badge
- Ordem de exibição
- Status ativo/inativo
- Destaque

#### Demonstrar
- Criar novo plano
- Editar plano existente
- Adicionar benefícios
- Configurar preço
- Definir badge e destaque

#### O que falar
> "Os planos podem ser gerenciados de duas formas: através da seção Planos do menu, para planos estáticos, ou através da configuração de planos da API nas unidades. Os planos estáticos são úteis como fallback ou para planos que não vêm da API."

---

### 6. OUTRAS SEÇÕES EDITÁVEIS (2-3 minutos)

#### 6.1. Modalidades
**Localização:** `🏃‍♀️ Modalidades`

**O que pode ser editado:**
- Nome da modalidade
- Descrição
- Imagem
- Duração
- Nível de dificuldade
- Instrutor
- Horários
- Ordem de exibição

#### 6.2. Recursos do App
**Localização:** `📱 Recursos do App`

**O que pode ser editado:**
- Título
- Descrição
- Ícone
- Ordem de exibição

#### 6.3. Recursos da Estrutura
**Localização:** `🏗️ Estrutura`

**O que pode ser editado:**
- Título
- Descrição
- Ícone
- Imagem
- Ordem de exibição

#### 6.4. Páginas Especiais
- **Day Use:** `🌅 Day Use`
- **Sobre Nós:** `📖 Sobre Nós`
- **Contato:** `📞 Contato`
- **Trabalhe Conosco:** `💼 Trabalhe Conosco`

**Demonstrar:**
- Editar conteúdo de uma página especial
- Mostrar campos disponíveis

#### O que falar
> "Além da homepage, você pode editar várias outras seções e páginas. Modalidades, recursos do app, estrutura física, e páginas especiais como Day Use, Sobre Nós, Contato e Trabalhe Conosco. Todas seguem o mesmo padrão de edição intuitiva."

---

### 7. CONFIGURAÇÕES GLOBAIS (1-2 minutos)

#### Localização
**Menu:** `⚙️ Configurações Globais`

#### O que pode ser editado
- Informações de contato (email, telefone, WhatsApp)
- Endereço da empresa
- Redes sociais
- Links dos apps (App Store, Google Play)
- Botões de ação globais
- Botões flutuantes

#### Demonstrar
- Editar informações de contato
- Adicionar links de redes sociais
- Configurar URLs dos apps

#### O que falar
> "As configurações globais afetam todo o site. Aqui você pode definir informações de contato, links de redes sociais, URLs dos apps e outros elementos que aparecem em múltiplas páginas."

---

### 8. NAVEGAÇÃO E MENU (1-2 minutos)

#### Localização
**Menu:** `🧭 Navegação`

#### O que pode ser editado
- Logo (mostrar nome da unidade)
- Itens do menu
- Botão de CTA no header
- Menu mobile
- Footer (seções, links, redes sociais)
- Copyright

#### Demonstrar
- Adicionar item ao menu
- Editar item existente
- Configurar CTA do header
- Editar footer

#### O que falar
> "A navegação controla o menu principal e o rodapé do site. Você pode adicionar novos itens ao menu, configurar o botão de ação no header e personalizar completamente o footer."

---

### 9. DICAS E BOAS PRÁTICAS (1-2 minutos)

#### O que mencionar
1. **Sempre salve antes de sair**
   - Use o botão "Publish" para publicar alterações
   - Alterações não publicadas ficam como rascunho

2. **Use o campo "Order" para ordenar**
   - Números menores aparecem primeiro
   - Use incrementos de 10 para facilitar reordenação

3. **Ative/desative em vez de deletar**
   - Use o campo "Active" para esconder conteúdo
   - Isso preserva o histórico

4. **Personalize imagens**
   - Use imagens otimizadas
   - Prefira formato WebP quando possível
   - Tamanho recomendado: máximo 2MB

5. **Teste antes de publicar**
   - Visualize as alterações no site
   - Verifique em diferentes dispositivos

6. **Use badges estrategicamente**
   - "Mais vendido" para planos populares
   - "Recomendado" para destacar opções
   - "Novidade" para lançamentos

#### O que falar
> "Aqui vão algumas dicas importantes: sempre salve e publique suas alterações, use o campo 'Order' para organizar itens, prefira desativar em vez de deletar para manter histórico, otimize suas imagens antes de fazer upload, e teste as alterações antes de publicar. Use badges estrategicamente para destacar planos importantes."

---

### 10. TROUBLESHOOTING (1-2 minutos)

#### Problemas comuns e soluções

1. **"Não consigo ver minhas alterações no site"**
   - Verifique se publicou as alterações
   - Limpe o cache do navegador
   - Aguarde alguns segundos (CDN pode demorar)

2. **"Planos da API não aparecem"**
   - Verifique se a unidade tem slug correto
   - Confirme que a API está funcionando
   - Verifique se selecionou planos na configuração

3. **"Imagem não carrega"**
   - Verifique o formato da imagem
   - Confirme o tamanho (máximo recomendado: 2MB)
   - Tente fazer upload novamente

4. **"Erro ao salvar"**
   - Verifique se todos os campos obrigatórios estão preenchidos
   - Confirme sua conexão com a internet
   - Tente novamente em alguns segundos

#### O que falar
> "Se você encontrar problemas, aqui estão algumas soluções: se as alterações não aparecem, verifique se publicou e limpe o cache; se os planos da API não aparecem, confirme a configuração da unidade; se imagens não carregam, verifique formato e tamanho; e se houver erro ao salvar, confirme que todos os campos obrigatórios estão preenchidos."

---

### 11. CONCLUSÃO (1 minuto)

#### Resumo do que foi aprendido
- Como acessar o Sanity Studio
- Como editar a homepage
- Como gerenciar unidades e planos
- Como configurar planos da API
- Como editar outras seções
- Dicas e boas práticas

#### Próximos passos
- Praticar editando conteúdo real
- Explorar outras funcionalidades
- Consultar documentação quando necessário

#### O que falar
> "Parabéns! Você aprendeu o básico de como atualizar conteúdo no site Live Academia usando o Sanity CMS. Agora você pode editar textos, imagens, planos, unidades e muito mais sem precisar mexer em código. Pratique com conteúdo real e explore as outras funcionalidades disponíveis. Se tiver dúvidas, consulte a documentação ou entre em contato com a equipe de desenvolvimento."

---

## 📝 Checklist de Gravação

### Antes de gravar
- [ ] Ter acesso ao Sanity Studio configurado
- [ ] Ter dados de exemplo para demonstrar
- [ ] Preparar imagens de exemplo
- [ ] Testar todos os fluxos antes de gravar
- [ ] Preparar roteiro impresso ou em segundo monitor

### Durante a gravação
- [ ] Falar claramente e em ritmo adequado
- [ ] Mostrar a tela em alta resolução
- [ ] Usar zoom quando necessário para campos pequenos
- [ ] Pausar entre seções para facilitar edição
- [ ] Demonstrar erros comuns e como resolver

### Após a gravação
- [ ] Adicionar legendas/closed captions
- [ ] Criar capítulos/timestamps no YouTube
- [ ] Adicionar links na descrição
- [ ] Criar versão resumida (5 minutos) se necessário
- [ ] Compartilhar com equipe para feedback

---

## 🎥 Dicas de Produção

### Equipamento recomendado
- **Microfone:** Headset ou microfone USB de boa qualidade
- **Gravação de tela:** OBS Studio, Camtasia ou Loom
- **Resolução:** Mínimo 1080p, preferencialmente 1440p ou 4K
- **Áudio:** Grave em ambiente silencioso

### Edição
- Adicione zoom em momentos importantes
- Use setas ou destaque para mostrar onde clicar
- Adicione transições suaves entre seções
- Inclua música de fundo leve (opcional)

### Distribuição
- YouTube (público ou não listado)
- Loom (para versão rápida)
- Google Drive (para versão privada)
- Documentação interna (link para vídeo)

---

## 📚 Recursos Adicionais

### Links úteis
- Documentação Sanity: https://www.sanity.io/docs
- Documentação do projeto: `/docs/SANITY-CMS-IMPLEMENTATION.md`
- Guia de setup: `/docs/SANITY-SETUP-INSTRUCTIONS.md`

### Contatos
- Suporte técnico: [email/telefone]
- Equipe de desenvolvimento: [email/telefone]

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0  
**Autor:** Equipe de Desenvolvimento Live Academia

