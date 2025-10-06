# Deployment & Infra - Live Academia

## Visão Geral
Infraestrutura simplificada usando **Vercel** para hospedagem do frontend (Next.js). Serviços externos plugados via variáveis de ambiente e tag managers. Evoluções futuras incluem monitoramento de erros (Sentry) e logs centralizados.

## Ambiente Atual
| Ambiente | Branch Origem | URL | Observações |
|----------|---------------|-----|-------------|
| Produção | `main` | (definir) | Deploy automático após merge |
| Staging (opcional) | `staging` | (definir) | Testes de integração e QA |
| Pré-visualização | PRs | Vercel Preview | Links automáticos para revisão |

## Serviços Necessários
| Serviço | Uso | Status |
|---------|-----|-------|
| Vercel | Hosting + Edge | Ativar Analytics opcional |
| API Pacto | Checkout | Configurar chaves seguras |
| Google Tag Manager | Orquestração tracking | ID GTM em env |
| GA4 | Métricas marketing | Via GTM | 
| Meta Pixel | Performance Ads | Via GTM |
| Sentry (futuro) | Erros e performance | Backlog |
| Hotjar / Clarity (futuro) | UX behavior | Requer consentimento |

## Variáveis de Ambiente
Manter `.env.local` para dev e configurar no painel Vercel (Production & Preview). Ver arquivo `.env.example` (a criar).

| Nome | Escopo | Descrição |
|------|--------|-----------|
| `NEXT_PUBLIC_PACTO_API_URL` | Público | Base URL Pacto (apenas se necessário expor) |
| `NEXT_PUBLIC_PACTO_SECRET_KEY` | Público (avaliar) | Chave atual usada para token (ideal mover para backend) |
| `NEXT_PUBLIC_SITE_URL` | Público | URL base (canonical links) |
| `NEXT_PUBLIC_GA4_ID` | Público | ID GA4 (ex: G-XXXX) |
| `NEXT_PUBLIC_GTM_ID` | Público | ID GTM (ex: GTM-XXXX) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Público | Pixel (ex: 1234567890) |
| `NEXT_PUBLIC_ENV` | Público | dev | staging | prod |

### Observação de Segurança
A "SECRET_KEY" não deveria estar pública. Ideal: criar micro backend (Serverless Function) para mediar autenticação caso a API Pacto permita.

## Pipeline de Deploy (Proposto)
1. Commit na branch feature -> PR aberto -> preview Vercel
2. Revisão + aprovação -> squash merge em `main`
3. Deploy automático produção
4. Tag de release criada (`vX.Y.Z`)
5. (Futuro) Workflow GitHub Action gera CHANGELOG + notifica canal interno

## Checklist Pré-Deploy
- [ ] Build local passou (`pnpm build`)
- [ ] Variáveis de ambiente presentes em Vercel
- [ ] Sem `console.log` residual
- [ ] Versão docs atualizada se arquitetura / tracking mudou
- [ ] Teste manual fluxo checkout (cartão / pix / boleto) ok
- [ ] Lighthouse rápido (>=85 perf, >=90 a11y)

## Observabilidade (Futuro)
| Área | Ferramenta | Ação |
|------|------------|------|
| Erros JS | Sentry | Capturar exceptions + sourcemaps |
| Performance Web Vitals | Vercel / web-vitals | Relatar a cada carregamento |
| Tracking Funil | GA4 Explorações | Comparar método pagamento |

## Logs Importantes (Cliente)
Adicionar wrapper de log (futuro) para:
- Erros em chamada API Pacto
- Timeout / retry
- Eventos críticos de pagamento

## Backups
Como site estático + dependência API externa, não há estado persistente local. Backups principais:
- Código (GitHub)
- Configuração GTM (exportar container periodicamente)

## Roadmap Infra
| Prioridade | Item | Descrição |
|------------|------|-----------|
| Alta | Remover segredo público | Backend proxy para token Pacto |
| Média | Sentry | Monitorar exceções checkout |
| Média | Harden Headers | CSP, X-Frame-Options, etc. |
| Baixa | CDN Imagens | Otimizar caching imagens unidades |

## Middleware / Headers (Planejado)
Adicionar `middleware.ts` para:
- Normalizar trailing slashes
- Adicionar headers de segurança (CSP parcial, Referrer-Policy, Permissions-Policy)

## Escalabilidade
- Páginas de unidades devem migrar para geração estática incremental (ISR) caso volume cresça
- Carregar dados de planos via RSC fetch (server) reduzindo JS no cliente

---
_Manter este documento atualizado a cada modificação de fluxo de deploy ou inclusão de novo serviço._
