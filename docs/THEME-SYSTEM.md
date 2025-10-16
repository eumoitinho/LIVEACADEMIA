# Sistema de Temas - Live Academia

## 🎨 Visão Geral

O sistema de temas da Live Academia implementa um design **duotone** com amarelo como cor principal, oferecendo dois modos: **Dark** e **Light**. O sistema é totalmente responsivo e mantém a identidade visual da marca em ambos os temas.

## 🌟 Características

### Duotone Design
- **Cor Principal**: Amarelo (#ffcb00) - cor de destaque em ambos os temas
- **Tema Dark**: Preto + Amarelo
- **Tema Light**: Branco + Amarelo
- **Transições**: Suaves entre temas com animações CSS

### Funcionalidades
- ✅ **Toggle automático** no header (desktop e mobile)
- ✅ **Persistência** no localStorage
- ✅ **Detecção automática** da preferência do sistema
- ✅ **Transições suaves** entre temas
- ✅ **Acessibilidade** completa com ARIA labels

## 🎯 Estrutura de Cores

### Tema Dark (Padrão)
```css
--background: #0a0a0a      /* Fundo principal */
--foreground: #fefefe      /* Texto principal */
--card: #161616           /* Cards e containers */
--primary: #ffcb00        /* Amarelo principal */
--accent: #ffd740         /* Amarelo accent */
--border: #374151         /* Bordas */
```

### Tema Light
```css
--background: #ffffff      /* Fundo principal */
--foreground: #1a1a1a      /* Texto principal */
--card: #fafafa           /* Cards e containers */
--primary: #ffcb00        /* Amarelo principal */
--accent: #ffd740         /* Amarelo accent */
--border: #e5e7eb         /* Bordas */
```

## 🛠️ Implementação Técnica

### Arquivos Principais

1. **`src/hooks/use-theme.tsx`** - Hook personalizado para gerenciar tema
2. **`src/components/shared/theme-toggle.tsx`** - Componente de toggle
3. **`src/components/layout/theme-provider.tsx`** - Provider do tema
4. **`tailwind.config.ts`** - Configuração das cores
5. **`app/globals.css`** - Variáveis CSS dos temas

### Hook useTheme

```typescript
const { theme, setTheme, toggleTheme } = useTheme()

// theme: 'light' | 'dark'
// setTheme: (theme: 'light' | 'dark') => void
// toggleTheme: () => void
```

### Componente ThemeToggle

```tsx
import { ThemeToggle } from '@/src/components/shared/theme-toggle'

// Toggle simples (apenas ícone)
<ThemeToggle />

// Toggle com label
<ThemeToggleWithLabel />
```

## 🎨 Uso das Cores

### Classes Tailwind Personalizadas

```css
/* Cores do tema Live */
bg-live-light-bg          /* Fundo light */
bg-live-dark-bg           /* Fundo dark */
text-live-textPrimary     /* Texto principal */
text-live-yellow          /* Amarelo principal */
border-live-border        /* Borda padrão */
```

### Variáveis CSS

```css
/* Usar variáveis CSS para máxima compatibilidade */
background: hsl(var(--background))
color: hsl(var(--foreground))
border-color: hsl(var(--border))
```

## 🔧 Configuração

### 1. Adicionar ao Layout

```tsx
import { ThemeProvider } from '@/src/components/layout/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Usar o Toggle

```tsx
import { ThemeToggle } from '@/src/components/shared/theme-toggle'

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

### 3. Usar o Hook

```tsx
import { useTheme } from '@/src/hooks/use-theme'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}
```

## 🎯 Boas Práticas

### 1. Sempre Use Variáveis CSS
```css
/* ✅ Correto */
background: hsl(var(--background))
color: hsl(var(--foreground))

/* ❌ Evitar cores hardcoded */
background: #0a0a0a
color: #fefefe
```

### 2. Use Classes Tailwind Semânticas
```css
/* ✅ Correto */
bg-background text-foreground border-border

/* ❌ Evitar cores específicas */
bg-black text-white border-gray-800
```

### 3. Teste em Ambos os Temas
- Sempre verifique como os componentes ficam em light e dark
- Use o toggle para testar transições
- Verifique contraste e legibilidade

## 🚀 Funcionalidades Avançadas

### Detecção Automática
O sistema detecta automaticamente a preferência do usuário:
```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
```

### Persistência
O tema escolhido é salvo no localStorage:
```typescript
localStorage.setItem('live-academia-theme', theme)
```

### Transições Suaves
```css
transition-all duration-300
```

## 🎨 Personalização

### Adicionar Novas Cores

1. **Atualizar `tailwind.config.ts`**:
```typescript
live: {
  yellow: "#ffcb00",
  yellowLight: "#ffd740",
  yellowDark: "#e6b700",
  // Adicionar novas cores aqui
}
```

2. **Atualizar `app/globals.css`**:
```css
:root {
  --nova-cor: 255 203 0; /* #ffcb00 */
}

.light {
  --nova-cor: 255 203 0; /* #ffcb00 */
}
```

### Criar Novos Temas

Para adicionar um terceiro tema (ex: "auto"):

1. Atualizar o tipo no hook:
```typescript
type Theme = 'light' | 'dark' | 'auto'
```

2. Adicionar lógica de detecção automática
3. Atualizar o componente toggle

## 📱 Responsividade

O toggle do tema funciona perfeitamente em:
- ✅ **Desktop** - Header principal
- ✅ **Mobile** - Menu hambúrguer
- ✅ **Tablet** - Adaptação automática

## 🔍 Debugging

### Verificar Tema Atual
```javascript
// No console do navegador
document.documentElement.classList.contains('light') // true/false
localStorage.getItem('live-academia-theme') // 'light' ou 'dark'
```

### Forçar Tema
```javascript
// Forçar tema light
localStorage.setItem('live-academia-theme', 'light')
location.reload()

// Forçar tema dark
localStorage.setItem('live-academia-theme', 'dark')
location.reload()
```

## 🎯 Próximos Passos

### Melhorias Futuras
1. **Tema automático** baseado no horário
2. **Mais opções de cores** para personalização
3. **Animações mais elaboradas** para transições
4. **Modo alto contraste** para acessibilidade
5. **Sincronização** entre dispositivos

---

**Implementado em:** Janeiro 2025  
**Versão:** 1.0.0  
**Status:** ✅ Produção Ready  
**Compatibilidade:** Todos os navegadores modernos
