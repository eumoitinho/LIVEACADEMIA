# Live Academia - Website

## 📋 Descrição

Website moderno e responsivo para a Live Academia, a maior rede de academias de Manaus. O projeto foi desenvolvido com Next.js 15, TypeScript, Tailwind CSS e Framer Motion para criar uma experiência de usuário excepcional.
> - Plano de Tagueamento / Analytics: `docs/analytics-tracking-plan.md`
> - Deployment & Infra: `docs/deployment.md`
> - Contribuição / Git Workflow: `docs/contributing.md`

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
- Botão de matrícula destacado

### Hero Section (`components/hero-section.tsx`)
### About Section (`components/about-section.tsx`)
- Informações sobre a academia
### Planos Section (`components/planos-section.tsx`)
- Dois planos principais: Tradicional e Diamante
- Cards interativos com hover effects
- Lista de benefícios detalhada
- Preços e call-to-action

### Modalidades Section (`components/modalidades-section.tsx`)
- Grid de modalidades/aulas coletivas
### Footer (`components/footer.tsx`)
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
- **Unidades** - Localização das academias com filtros e carrossel
- **Aulas Coletivas** - Modalidades disponíveis
- **Day Use** - Serviço de uso diário
- **Trabalhe Conosco** - Formulário de candidatura

### Página de Unidades
- **Filtros** - Por tipo (Tradicional, Premium, Diamante, Em Inauguração)
- **Filtros** - Por serviço (Climatização, Espaço Relax, Yoga, etc.)
- **Filtros** - Por região (Adrianópolis, Centro, Cidade Nova, etc.)
- **Carrossel** - Navegação infinita com botões e indicadores
- **Cards** - Informações completas de cada unidade
- **Tour Virtual** - Links para tours 360° das unidades

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

# Copie variáveis de ambiente
cp .env.example .env.local

# Edite `.env.local` com suas chaves (Pacto, GA4, GTM etc.)

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
- Configuração estrita (em evolução — flags de ignore serão removidas gradualmente)
- Tipos para todos os componentes
- Validação de props via Zod nos fluxos críticos

### Tracking / Analytics
Implementação baseada em `dataLayer` unificado (GTM) e eventos padronizados.
Principais eventos: `plan_select`, `checkout_start`, `payment_attempt`, `payment_result`, `purchase`.
Detalhes completos em `docs/analytics-tracking-plan.md`.

### Boas Práticas de Contribuição
- Conventional Commits
- Branches de feature curtas
- PR com checklist (ver `docs/contributing.md`)
- Atualizar documentação ao alterar arquitetura ou eventos

### Qualidade e Segurança (Resumo)
- Nunca logar dados de cartão
- Sanitização de CPF/telefone antes de envio
- Planejado: Sentry, Web Vitals reporting, testes de checkout

### Roadmap Técnico (Resumo)
1. Implementar utilitário de analytics tipado (`lib/analytics.ts`)
2. Refatorar estado do checkout (maquina de estados)
3. Remover `ignoreBuildErrors` e `ignoreDuringBuilds`
4. Adicionar Sentry e métricas Web Vitals
5. Testes de integração (checkout, planos, unidades)

## 📄 Licença

Este projeto é privado e pertence à Live Academia.

## 👥 Equipe

Desenvolvido para a Live Academia - A maior rede de academias de Manaus.

---

**Live Academia** - Transforme seu corpo e sua vida! 💪 

---
_Manter este README alinhado com os documentos em `docs/`._

## 🗄 Persistência / Supabase (Schema Atual Refatorado)

Este projeto utiliza Supabase (Postgres + Auth opcional) através do SDK `@supabase/supabase-js` diretamente (sem Prisma). Após refatoração estrutural eliminamos a camada de `rede` e passamos a ter uma única tabela principal `units` (análogo à antiga `unidade`) que já concentra os atributos necessários + a chave de API criptografada.

### Resumo do Schema Atual (`supabase/schema.sql`)

Tabelas ativas:
1. `units`
2. `api_log`
3. Enum `api_direction` (`OUTBOUND`, `INBOUND`)

#### Tabela: `units`
Campos (ordem lógica):
- `id` (uuid PK)
- `slug` (text, UNIQUE) – identificador público
- `nome` (text) – nome exibido
- `codigo_unidade` (text) – código interno (antes: `unit_code` / `unidade.codigo_externo`/`unidade_chave` acumulados)
- `cidade`, `estado`, `cep`, `endereco`, `complemento` – dados de localização
- `latitude`, `longitude` – coordenadas em texto (pode evoluir para `numeric`)
- `telefone`, `email`, `locale` – comunicação / regionalização
- `logo` – URL de logomarca
- `imagens` (text[]) – galeria de URLs
- `moeda` (text[]) – suporte multi-moeda futura (ex: `{"R$"}`)
- `usarSistemaInternacional` (boolean) – flag de formatação/unidades (peso/medidas)
- `chave_publica` (text) – valor NÃO criptografado (se houver caso de exposição limitada)
- `chave_api` (text) – valor criptografado (AES-256-GCM) da key sensível (substitui `rede.encrypted_api_key` + `unidade.encrypted_unit_key`)
- `created_at`, `updated_at` – auditoria (gatilhos de atualização ainda não implementados; atualização manual necessária em writes)

Observação: os valores `chave_api` seguem formato JSON versionado descrito na subseção de Criptografia abaixo.

#### Tabela: `api_log`
Campos:
- `id` (uuid PK)
- `unidade_id` (uuid FK -> `units.id` ON DELETE SET NULL)
- `direction` (api_direction)
- `method` (text)
- `endpoint` (text)
- `status_code` (int)
- `latency_ms` (int)
- `error` (text) – mensagem resumida
- `request_hash` (text) – hash SHA-256 do corpo (se presente) para correlação sem armazenar payload claro
- `created_at` (timestamptz)

Índices relevantes já presentes: `idx_units_slug`, `idx_units_id` (podemos adicionar índice composto em (`cidade`,`estado`) ou GIN para busca textual posteriormente se necessário).

### Mapeamento de Refatoração (Antigo -> Novo)
- Tabela `rede` -> REMOVIDA
- Tabela `unidade` -> incorporada em `units`
- `rede.encrypted_api_key` + `unidade.encrypted_unit_key` -> `units.chave_api`
- `unidade.codigo_externo` / `unidade.unidade_chave` -> consolidado em `units.codigo_unidade`
- `unidade.name` -> `units.nome`
- `api_log.rede_id` -> REMOVIDO (agora apenas `unidade_id`)
- Campos adicionais de endereço que antes poderiam estar num JSON externo foram normalizados direto na tabela (endereços curtos). Caso o modelo cresça, considerar tabela dedicada `unit_endereco` para histórico/versionamento.

### Estado do Código vs Schema
IMPORTANTE: os arquivos `lib/repository.ts` e `scripts/seed-supabase.ts` ainda refletem o modelo antigo (`rede` + `unidade`). Antes de qualquer evolução em produção eles precisam ser alinhados ao novo schema:
1. Remover funções `createRede` / `upsertUnidade` e substituí-las por `upsertUnit` única.
2. Ajustar `logApi()` removendo qualquer resolução de `redeSlug`.
3. Migrar seed para escrever diretamente em `units` (campos: slug, nome, chave_api (criptografada), codigo_unidade, etc.).
4. Adaptar leitura (`getUnidadeBySlug`) para buscar em `units` e decriptar somente `chave_api`.
5. Conferir se colunas populadas (ex: `cidade`, `estado`, `cep`) virão da fonte de seed (JSON ou ENV). Caso não haja origem, inicializar como null.

Enquanto isso, o schema atual em `supabase/schema.sql` já não possui `rede` ou `unidade` antigas, logo execução de scripts legados resultará em erro. Planeje refactor imediato ou reintroduza temporariamente views compatíveis (ex: criar VIEW `unidade` selecionando de `units`) se precisar de fase de transição.

### Variáveis de Ambiente Mínimas
```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ENCRYPTION_SECRET=uma_chave_forte_de_32+caracteres
PACTO_API_URL=https://apigw.pactosolucoes.com.br # (opcional, default já cobre)
```

#### Autenticação Pacto (Modelo Atual Per-Unidade)
Não existe mais uma chave global (`PACTO_REDE_KEY`). Cada unidade possui a sua própria `chave_api` armazenada em `units.chave_api` (criptografada). O fluxo é:

1. Route handler resolve a unidade via `getUnitBySlug(slug)`.
2. Decripta a `chave_api` (retornada como `apiKeyPlain`).
3. Chama métodos do wrapper `pacto-api.ts` passando `redeKey` (essa `apiKeyPlain`).
4. O wrapper mantém cache de tokens por chave (Map in-memory em runtime Node) e renova conforme expiração.

Se a unidade não existir ou não possuir chave, as rotas:
- `/api/pacto/planos/:slug` tentam fallback estático (planos de `lib/locations.ts`) quando disponível.
- `/api/pacto/simular` e `/api/pacto/venda` retornam `404` (unidade ausente) ou `503` (chave ausente) conforme o caso, sem usar chave global.

Para adicionar/atualizar chaves de unidades utilize função `upsertUnit()` ou um script dedicado de seed que leia um JSON com `{ slug, nome, apiKeyPlain, codigo_unidade }`.

### Seed (Novo Fluxo Proposto)
Refatore o script `scripts/seed-supabase.ts` para:
1. Ler lista de slugs/nomes de um JSON simples ou das variáveis de ambiente.
2. Para cada unidade gerar slug (`slugify` já existente é reutilizável).
3. Resolver a chave crua (ex: valor da variável `TORRES`) e cifrar antes de inserir em `chave_api`.
4. Popular demais campos disponíveis (ex: `nome` = label formatada, `codigo_unidade` = mesma string ou um código externo).
5. Evitar recriptografar se o plaintext não mudou (comparar decrypt atual com novo valor proposto).

Pseudo-exemplo de payload de insert:
```ts
{
  slug: 'torres',
  nome: 'LIVE - TORRES',
  codigo_unidade: 'TORRES',
  chave_api: encrypt(process.env.TORRES!),
  chave_publica: null,
  cidade: 'MANAUS',
  estado: 'AMAZONAS'
}
```

### Logs de API
Continua idêntico em conceito: registrar consumo externo sem armazenar corpo em claro. Ajustes:
- Remover qualquer referência a `rede_id`.
- Garantir que `request_hash` use `safeHash()` (SHA-256 estável).

### 🔐 Criptografia de Chaves (AES-256-GCM)

Implementação em `lib/crypto.ts` (inalterada na refatoração, apenas o campo de destino mudou: agora `units.chave_api`):

- Algoritmo: AES-256-GCM (autenticado) com IV aleatório de 12 bytes.
- Derivação da chave: `SHA-256(ENCRYPTION_SECRET)` garantindo 32 bytes mesmo que a secret seja base64/hex curta.
- Formato armazenado (string JSON):
	```json
	{"v":1,"iv":"...base64...","tag":"...base64...","data":"...base64..."}
	```
	onde:
	- `iv`: vetor de inicialização
	- `tag`: auth tag GCM
	- `data`: ciphertext
	- `v`: versão (para evolução futura do formato)

#### Decriptação
`decrypt()` valida a versão, reconstrói cipher, seta `authTag` e retorna o texto original. Qualquer falha => erro genérico para evitar vazamento de detalhes.

#### Rotação de Chave (planejada)
Trocar `ENCRYPTION_SECRET` diretamente invalida decriptação dos dados já salvos. Para rotacionar com segurança:
1. Exportar (descriptografar) todos os registros atuais usando a secret antiga.
2. Definir nova `ENCRYPTION_SECRET`.
3. Recriptografar e atualizar as colunas `encrypted_api_key` / `encrypted_unit_key`.
4. Remover a secret antiga do ambiente.

Pode-se implementar um script de migração que leia/decripte cada registro e regrave com a nova secret; hoje não incluso para manter simples.

#### Fallback Hardcoded (Dev ONLY)
Há um fallback hardcoded local no código caso `ENCRYPTION_SECRET` não esteja definida. Nunca deixar esse fallback em produção. Para endurecer:
1. Defina `ENCRYPTION_SECRET` no ambiente.
2. Remova o fallback de `lib/crypto.ts` (ou altere para lançar erro se ausente).

#### Boas Práticas
- Não versionar `.env.local` com chaves reais.
- Usar secrets separados entre dev / staging / prod.
- Revisar permissões do painel Supabase (evitar exposição do service role key no client).

### ✅ Checklist Rápido de Persistência Segura (Atual)

- [x] Chave de unidade (agora única) cifrada em repouso (`units.chave_api`)
- [x] Log de chamadas com hash do corpo (sem payload sensível em claro)
- [ ] Seed refatorado direto para `units` (PENDENTE: ajustar script)
- [ ] Atualização inteligente só recriptografa se plaintext mudou (implementar no novo repositório)
- [ ] Script de rotação automática (futuro)

### Próximos Passos Recomendados
1. Refatorar `lib/repository.ts` para novo contrato (`getUnitBySlug`, `upsertUnit`, `logApi`).
2. Atualizar `scripts/seed-supabase.ts` removendo dependências de `rede`/`unidade`.
3. Adicionar trigger ou atualização manual de `updated_at` em updates (`ALTER TABLE ...` + trigger plpgsql ou usar RLS futura).
4. (Opcional) Extrair endereço para tabela separada se precisarmos de histórico ou múltiplos endereços.
5. (Opcional) Implementar script de rotação de `ENCRYPTION_SECRET`.

### Legado / Histórico
O conteúdo abaixo (modelo `rede` + `unidade`) era o desenho anterior e permanece apenas para referência histórica no controle de versão. Recomenda-se não utilizá-lo em novos desenvolvimentos.
