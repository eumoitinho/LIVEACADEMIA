# Arquitetura - Live Academia

## Visão Geral
Aplicação web em **Next.js 15 (App Router)** com **TypeScript**, **TailwindCSS**, componentes acessíveis via **Radix UI / shadcn/ui**, animações com **Framer Motion** e integração de checkout transparente com a **API Pacto Soluções**. O objetivo é servir páginas institucionais, listagem de unidades, planos e realizar matrícula/pagamento direto sem redirecionamento.

## Objetivos Arquiteturais
- Performance inicial rápida (renderização server-side + streaming quando necessário)
- Escalabilidade para dezenas de unidades sem duplicação manual de código
- Padronização de componentes e estilos (Design System incremental)
- Observabilidade (logs estruturados + eventos analytics)
- Segurança de dados sensíveis (sem dados de cartão persistidos no frontend)

## Principais Módulos
| Domínio | Descrição | Local Atual | Observações |
|---------|-----------|-------------|-------------|
| Páginas institucionais | Home, Planos, Aulas, Day Use, Trabalhe Conosco, Sobre Nós | `app/*` | Recomendar separar features futuramente |
| Unidades | Lista, filtros, carrosséis e detalhe | `app/unidades/*` + `components/unidades-*` | Dados de unidades vêm de JSON por enquanto |
| Checkout | Modal multi-etapas + integração Pacto | `components/checkout-modal.tsx` + `lib/pacto-api.ts` | Falta isolar lógica de estado |
| Planos | Cards e benefícios | `components/planos-*` | Poderia virar `features/planos/` |
| UI Base | Botões, inputs, dialog, etc. | `components/ui/*` | Derivado de shadcn/ui |
| Contexto Unidade | Contexto para unidade ativa | `contexts/unit-context.tsx` | Avaliar se SSR pode fornecer dados ao invés de contexto global |

## Fluxo de Checkout (Resumo)
1. Usuário escolhe plano (card)
2. Abre modal (`checkout-modal`)
3. Fluxo em 4 etapas: dados pessoais → pagamento → processamento → sucesso
4. Chamada à API Pacto (`lib/pacto-api.ts`) dependendo do método: cartão / pix / boleto
5. Retorno tratado e exibido (QR Code, boleto ou confirmação)

Ver detalhes em `docs/fluxo-pagamento.md`.

## Integração com API Pacto
- Classe `PactoAPI` (V3) mantém token em memória com expiração
- Todos os endpoints migrados para `/psec` (v2 removido do código)
- Respostas validadas via Zod (`lib/pacto-schemas.ts`)
- Timeout + retry básico implementados em camada de request
- Próximas melhorias: logging estruturado de requisições (correlation id), circuit breaker simples

## Estado e Dados
| Tipo | Origem | Estratégia Atual | Melhorias Propostas |
|------|--------|------------------|---------------------|
| Unidades | JSON local / API futura | Carregado no cliente | Cache estático + ISR / Edge + fallback |
| Planos | API Pacto (por unidade) | On-demand via modal | Prefetch ao abrir página de unidade |
| Checkout state | Estado interno modal | useState monolítico | Criar store isolada (ex: Zustand) |
| Eventos analytics | Não estruturado ainda | N/A | Wrapper tipado + camada GTM |

## Padrões Recomendados
- Domain-first: migrar para `src/` com subpastas: `features/checkout`, `features/unidades`, `core/ui`, `core/lib`, `core/config`
- Colocar utilidades puras em `core/utils`
- Uma função de inicialização de ambiente: valida variáveis obrigatórias
- Adotar ESLint + TypeScript sem `ignoreBuildErrors` (remover flags do `next.config.mjs` em fase posterior)

## Gestão de Qualidade
| Área | Prática | Ferramenta |
|------|---------|------------|
| Código | Padronização commits | Conventional Commits |
| Revisão | PR checklist | `docs/contributing.md` |
| Tipagem | Strict mode | Ajustar `tsconfig.json` |
| Performance | Core Web Vitals monitorados | Vercel Analytics / Web Vitals lib |
| Observabilidade | Erros frontend | Sentry (futuro) |
| Analytics | Funil completo checkout | GA4 + Meta Pixel + GTM |

## Variáveis de Ambiente (Atual)
Arquivo `.env.example`:
```
# Backend / API Pacto (server-only)
PACTO_API_URL=https://apigw.pactosolucoes.com.br
// Chaves Pacto agora são armazenadas por unidade (units.chave_api)

# Tracking / Marketing (expostos)
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ENV=development
```
Validação em runtime: `lib/env.ts` (Zod) interrompe boot se faltar variável crítica.

## Segurança
- Nunca logar dados de cartão
- Sanitizar CPF/telefone antes de enviar
- Remover `ignoreDuringBuilds` e `ignoreBuildErrors` quando tipagem estabilizar
- Validar origem de requisições (CSP e headers — adicionar em `next.config.mjs` / middleware futura)

## Riscos Atuais
| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Observabilidade ainda parcial | Dificuldade em diagnósticos | Adicionar Sentry + logs estruturados |
| Checkout monolítico | Dificuldade manutenção | Refatorar em máquina de estados |
| Falta de testes checkout | Possíveis regressões | Implementar e2e (cartão/pix/boleto) |
| Estrutura de features não aplicada | Crescimento desorganizado | Migrar para domain-first incremental |
| Timeout fixo sem circuit breaker | Latência acumulada | Introduzir contadores de falha + backoff |

## Roadmap Técnico (Atualizado Pós Migração V3)
1. Refatorar checkout (estado → store + máquina)
2. Monitoramento (Sentry + Web Vitals reporter)
3. Hardening config (remover ignores, ESLint custom rules)
4. Testes de integração checkout (Playwright)
5. Estrutura domain-first (`features/*`, `core/*`)
6. Circuit breaker simples para API Pacto

## Próximos Passos Detalhados
| Sprint | Item | Critérios de Aceite |
|--------|------|---------------------|
| 1 | Implementar validação de envs | Erro em console build se faltar variável crítica |
| 1 | Adicionar page_view automático | `trackPageView` em layout root / listener router |
| 2 | Refatorar checkout em steps desacoplados | Cada step componente isolado + máquina simples |
| 2 | Logging estruturado requisições Pacto | request_id + timing + status armazenados |
| 3 | Introduzir Sentry (frontend) | Captura de erros + release tag |
| 3 | Web Vitals reporter | Envio console + dataLayer opcional |
| 4 | Testes e2e fluxo checkout | Sucesso cartão / pix / boleto + erro simulado |
| 4 | Headers segurança básicos | CSP mínima + Referrer-Policy |

## Backlog / Ideias Futuras
- Dark mode persistido
- Migração para `src/` + aliases tsconfig
- Suporte multi-idioma (i18n routing)
- Feature flags (progressive rollout de novo checkout)
- Geração estática incremental para unidades específicas

## Riscos Reavaliados
| Risco | Probabilidade | Impacto | Mitigação Proposta |
|-------|---------------|---------|--------------------|
| Dependência de segredo público Pacto | Alta | Médio | Backend proxy | 
| Falta de testes checkout | Média | Alto | Implementar e2e prioritized |
| Crescimento desorganizado de components | Média | Médio | Aplicar estrutura features proposta |
| Falta de observabilidade | Média | Alto | Sentry + logs estruturados |
| Performance imagens | Baixa | Médio | CDN / next/image otimizado |

---
_Manter este documento atualizado a cada refatoração estrutural._
