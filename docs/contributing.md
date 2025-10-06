# Contribuindo - Live Academia

## Fluxo de Trabalho (Git Workflow)
Adotamos um fluxo baseado em **trunk main** com branches curtas e releases versionadas.

### Branches
| Tipo | Padrão | Uso |
|------|--------|-----|
| Feature | `feat/nome-curto-contexto` | Nova funcionalidade |
| Fix | `fix/descricao-breve` | Correção de bug |
| Chore | `chore/tarefa-infra` | Manutenção (config, deps) |
| Refactor | `refactor/escopo` | Refatorações sem mudar comportamento |
| Docs | `docs/escopo` | Somente documentação |
| Hotfix | `hotfix/urgente` | Correção crítica em produção |

Exemplos:
- `feat/checkout-pix`  
- `fix/unidade-carousel-loop`  
- `refactor/checkout-state-machine`

### Commits (Conventional Commits)
Formato: `<type>(escopo opcional): descrição curta`

Tipos principais:
- `feat:` nova funcionalidade
- `fix:` correção
- `docs:` documentação
- `style:` formatação (semântica não alterada)
- `refactor:` refatoração sem funcionalidade nova ou bugfix
- `perf:` melhoria de performance
- `test:` adicionando ou ajustando testes
- `chore:` build, deps, scripts

Exemplos:
```
feat(checkout): adiciona evento payment_attempt
fix(planos): corrige valor exibido com vírgula
refactor(pacto-api): extrai função de autenticação
```

### Pull Requests
Checklist antes de abrir PR:
- [ ] Nome da branch segue padrão
- [ ] Descrição inclui contexto + "Por quê" + "Como"
- [ ] Referencia issue (se houver) `Closes #ID`
- [ ] Sem `console.log` desnecessário
- [ ] Sem dados sensíveis
- [ ] Build local ok (`pnpm build`)
- [ ] Lint ok (`pnpm lint`)
- [ ] Screenshots ou GIF (UI) se visual
- [ ] Atualizou docs se afetou arquitetura / tracking / envs

Template sugerido:
```
## Contexto
Breve explicação do problema/melhoria.

## Mudanças
- Lista objetiva do que foi feito

## Como testar
1. Passo
2. Passo

## Riscos / Observações
Algo a monitorar.

Closes #123
```

### Processo de Merge
1. Revisão obrigatória (>=1 aprovado) — configurar no GitHub
2. Sem commits de merge; preferir squash & merge (histórico limpo)
3. Mensagem final do squash segue Conventional Commit abrangente

### Releases / Versionamento
Usar **SemVer**: `MAJOR.MINOR.PATCH`
- `MAJOR`: mudanças incompatíveis / quebra contrato
- `MINOR`: novas funcionalidades retrocompatíveis
- `PATCH`: correções e pequenas melhorias

Automação futura: gerar CHANGELOG via ferramenta (ex: `changesets` ou `semantic-release`).

### Qualidade de Código
- Evitar funções > 60 linhas
- Componentes React: extrair subcomponentes quando UI complexa
- Tipar retornos explícitos em funções exportadas
- Nenhum `any` sem justificativa (comentário `// TODO: refine type` permitido temporariamente)

### Padrões de Arquivo
- Hooks: `useX.ts(x)`
- Componentes: `NomeComPascalCase.tsx`
- Schemas Zod: `nome.schema.ts`
- Serviços externos: `nome-service.ts` ou `api-nome.ts`

### Feature Flags (Futuro)
Adicionar utilitário em `lib/flags.ts` para toggles leves.

### Ambiente / Variáveis
Quaisquer novas variáveis de ambiente: atualizar `.env.example` + doc correspondente.

### Segurança
- Não subir chaves reais
- Sanitizar inputs (CPF, telefone) antes de requisições
- Nunca logar dados de cartão

### Analytics
- Adicionar evento novo: atualizar `docs/analytics-tracking-plan.md`
- Não inventar nomes fora da convenção

### Testes (Backlog)
Fases futuras:
1. Smoke tests de páginas principais
2. Testes de fluxo checkout (happy path)
3. Testes de validação de formulários

### LGPD / Privacidade (Futuro)
- Consent banner antes de cookies não essenciais
- Anonimizar IP (GA4 config)

---
Dúvidas: registrar em issue ou comentar em PR.
