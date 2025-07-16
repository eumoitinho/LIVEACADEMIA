# Live Academia - Website

## 📋 Descrição

Website moderno e responsivo para a Live Academia, a maior rede de academias de Manaus. O projeto foi desenvolvido com Next.js 15, TypeScript, Tailwind CSS e Framer Motion para criar uma experiência de usuário excepcional.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

## 📁 Estrutura do Projeto

```
LIVEACADEMIA/
├── app/                    # Páginas da aplicação (App Router)
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout principal
│   ├── globals.css        # Estilos globais
│   ├── planos/            # Página de planos
│   ├── unidades/          # Página de unidades
│   ├── aulas-coletivas/   # Página de aulas coletivas
│   ├── day-use/           # Página Day Use
│   └── trabalhe-conosco/  # Página trabalhe conosco
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── header.tsx        # Header da aplicação
│   ├── footer.tsx        # Footer da aplicação
│   ├── hero-section.tsx  # Seção hero da página inicial
│   ├── about-section.tsx # Seção sobre nós
│   ├── planos-section.tsx # Seção de planos
│   ├── modalidades-section.tsx # Seção de modalidades
│   ├── floating-button.tsx # Botão flutuante de contato
│   └── ...               # Outros componentes
├── public/               # Arquivos estáticos
│   └── images/           # Imagens da aplicação
├── lib/                  # Utilitários e configurações
├── hooks/                # Custom hooks
└── styles/               # Estilos adicionais
```

## 🎨 Componentes Principais

### Header (`components/header.tsx`)
- Navegação responsiva com menu mobile
- Efeitos de scroll com backdrop blur
- Links para todas as seções principais
- Botão de matrícula destacado

### Hero Section (`components/hero-section.tsx`)
- Seção principal com call-to-action
- Animações com Framer Motion
- Gradientes e efeitos visuais
- Logo animado da Live Academia

### About Section (`components/about-section.tsx`)
- Informações sobre a academia
- Estatísticas com ícones
- Layout responsivo com grid
- Animações de entrada

### Planos Section (`components/planos-section.tsx`)
- Dois planos principais: Tradicional e Diamante
- Cards interativos com hover effects
- Lista de benefícios detalhada
- Preços e call-to-action

### Modalidades Section (`components/modalidades-section.tsx`)
- Grid de modalidades/aulas coletivas
- Imagens com overlay gradiente
- Descrições das atividades
- Link para página completa

### Footer (`components/footer.tsx`)
- Informações de contato
- Links rápidos para navegação
- Redes sociais
- Horários de funcionamento

### Floating Button (`components/floating-button.tsx`)
- Botão flutuante para contato rápido
- Links para WhatsApp, telefone e Instagram
- Animações suaves
- Aparece após scroll

## 🎯 Funcionalidades

### Páginas Principais
- **Home** - Página inicial com todas as seções
- **Planos** - Detalhamento completo dos planos
- **Unidades** - Localização das academias
- **Aulas Coletivas** - Modalidades disponíveis
- **Day Use** - Serviço de uso diário
- **Trabalhe Conosco** - Formulário de candidatura

### Seções da Home
1. **Hero** - Apresentação principal
2. **Sobre Nós** - História e estatísticas
3. **Unidades** - Carrossel de localizações
4. **Benefícios** - Vantagens da academia
5. **Estrutura** - Instalações e equipamentos
6. **Modalidades** - Aulas coletivas
7. **Planos** - Opções de matrícula
8. **App** - Aplicativo mobile
9. **Wellhub** - Parceria com Wellhub
10. **Bioimpedância** - Serviço de avaliação
11. **Contato** - Informações de contato
12. **Depoimentos** - Avaliações de clientes

## 🎨 Design System

### Cores Principais
- **Preto** - Fundo principal
- **Amarelo/Âmbar** - Cor de destaque (gradiente)
- **Cinza** - Textos secundários
- **Branco** - Textos principais

### Tipografia
- **Fontes** - Sistema padrão do Next.js
- **Tamanhos** - Escala responsiva
- **Pesos** - Regular, Medium, Semibold, Bold, Black

### Animações
- **Framer Motion** - Transições suaves
- **Hover Effects** - Interações visuais
- **Scroll Animations** - Animações baseadas em scroll
- **Loading States** - Estados de carregamento

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd LIVEACADEMIA

# Instale as dependências
pnpm install

# Execute em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Execute em produção
pnpm start
```

## 📦 Scripts Disponíveis

- `pnpm dev` - Executa em modo desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm start` - Executa build de produção
- `pnpm lint` - Executa linter

## 🔧 Configurações

### Tailwind CSS
- Configurado com tema customizado
- Cores da Live Academia definidas
- Animações personalizadas

### Next.js
- App Router habilitado
- Otimizações de imagem
- Configurações de performance

### TypeScript
- Configuração estrita
- Tipos para todos os componentes
- Validação de props

## 📄 Licença

Este projeto é privado e pertence à Live Academia.

## 👥 Equipe

Desenvolvido para a Live Academia - A maior rede de academias de Manaus.

---

**Live Academia** - Transforme seu corpo e sua vida! 💪 