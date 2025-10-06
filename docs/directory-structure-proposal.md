# Proposta de Reorganização de Diretórios - Live Academia

## Objetivos
- Separar domínios/feature boundaries
- Reduzir acoplamento entre UI base e lógica de negócio
- Preparar para crescimento de features (app mobile gateway, relatórios etc.)

## Estrutura Atual (Simplificada)
```
app/
components/
  ui/
lib/
contexts/
hooks/
```

## Problemas Identificados
| Problema | Impacto |
|----------|---------|
| Componentes de domínio misturados com UI base | Dificulta manutenção e descoberta |
| Lógica checkout centralizada em componente modal | Cresce complexidade / difícil testar |
| `lib/` genérico | Mistura utilidades e integrações externas |
| Ausência de pasta `types` ou `schemas` | Tipos dispersos |
| Crescente acoplamento entre páginas e componentes diretos | Reuso baixo |

## Estrutura Proposta (Fase 1)
```
src/
  app/                       # (Mover app/ para src/app/ - Next suporta)
  core/
    config/                  # Env parsing, runtime config
    lib/                     # Utilidades puras (ex: cn, masks, formatters)
    analytics/               # track(), mapeamento eventos
    types/                   # Tipos globais base
    ui/                      # Componentes base (shadcn/ui adaptados)
  features/
    checkout/
      components/
      hooks/
      services/
      machine/               # Estado / xstate (futuro)
      schemas/               # Zod de validações
    unidades/
      components/
      services/
      adapters/
      schemas/
    planos/
      components/
      services/
    forms/                   # Trabalhe Conosco / Contato
  services/
    pacto/                   # Integração Pacto (api client + mappers)
  pages-enhancers/           # Higher order wrappers (se necessários)
  hooks/                     # Hooks cross-feature (avaliar se move para core)
  styles/
  public/ (mantém na raiz ou static/)
```

### Notas
- `core/analytics` substitui `lib/analytics.ts` (migrar depois)
- `services/pacto` isola autenticação, endpoints, normalização
- `features/checkout` recebe refatoração do modal atual (dividir steps)
- `features/unidades` recebe parsing + filtros + grid/carrossel

## Fase 2 (Escalonamento)
- Adicionar `observability/` (logger, sentry wrapper)
- Adicionar `i18n/` se multilíngue surgir
- Introduzir `tests/` raiz (unit + e2e)

## Migração Incremental
| Etapa | Ação | Risco |
|-------|------|-------|
| 1 | Criar `src/` e mover `app/` | Baixo |
| 2 | Criar `core/lib` e mover utilidades | Baixo |
| 3 | Mover `lib/pacto-api.ts` → `services/pacto/client.ts` | Médio (imports) |
| 4 | Criar `features/checkout` e dividir modal | Médio |
| 5 | Criar schemas Zod para responses Pacto | Médio |
| 6 | Implementar máquina de estados (xstate opcional) | Médio |

## Alias (tsconfig.json)
Adicionar:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/core/types/*"],
      "@ui/*": ["src/core/ui/*"]
    }
  }
}
```

## Padrões de Nome
| Item | Padrão | Exemplo |
|------|--------|---------|
| Componentes feature | PascalCase | `CheckoutStepper.tsx` |
| Hooks feature | `useX.ts` | `useCheckoutStep.ts` |
| Schemas | `nome.schema.ts` | `checkout.schema.ts` |
| Serviços externos | `client.ts` / `service.ts` | `pacto/client.ts` |
| Máquinas estado | `*.machine.ts` | `checkout.machine.ts` |

## Benefícios Esperados
- Claro boundary de domínio = menor acoplamento
- Facilita testes unitários e mocks
- Escalabilidade para novas integrações (ex: gateway recorrente)
- Organização que reflete arquitetura documentada

## Critérios de Pronto por Etapa
- Build sem erros após cada movimento
- Imports atualizados e sem caminhos relativos profundos (`../../../`)
- Documentação (`architecture.md`) revisada após etapa 3 e 4

---
_Após validação desta proposta, iniciar execução incremental conforme prioridades do roadmap._
