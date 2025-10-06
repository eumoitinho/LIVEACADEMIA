# Checklist de Qualidade & Segurança - Live Academia

## 1. Código
- [ ] Sem `console.log` desnecessário
- [ ] Sem `any` não justificado
- [ ] Funções exportadas com tipo de retorno explícito
- [ ] Componentes desacoplados e reutilizáveis
- [ ] Nomes de arquivos consistentes

## 2. Tipagem / Build
- [ ] `pnpm build` sem erros críticos
- [ ] Nenhum supress `@ts-ignore` sem comentário explicativo
- [ ] Flags `ignoreBuildErrors` / `ignoreDuringBuilds` pendentes de remoção (roadmap)

## 3. Performance (Core Web Vitals)
- [ ] LCP < 2.5s (Home e Unidades)
- [ ] CLS < 0.1
- [ ] TTFB aceitável (< 600ms em produção)
- [ ] Imagens otimizadas / formatos adequados
- [ ] Evitar hydration extra desnecessária

## 4. Acessibilidade (a11y)
- [ ] Sem headings pulados (ex: h1 -> h3)
- [ ] `alt` em todas imagens relevantes
- [ ] Labels em inputs de formulário
- [ ] Foco visível em elementos interativos
- [ ] Contraste mínimo atendido (WCAG AA)

## 5. SEO Básico
- [ ] Meta title / description por página chave
- [ ] Open Graph tags (futuro)
- [ ] Uso correto de `next/link`
- [ ] Sitemap (futuro)

## 6. Segurança
- [ ] Nenhum dado de cartão armazenado/localStorage
- [ ] Sanitização de CPF/telefone antes de envio
- [ ] Variáveis sensíveis não expostas indevidamente
- [ ] Avaliar mover `NEXT_PUBLIC_PACTO_SECRET_KEY` para backend
- [ ] Planejamento para CSP / Security Headers

## 7. Checkout
- [ ] Eventos analytics emitidos (`checkout_start`, `payment_attempt`, `payment_result`)
- [ ] Validações de formulário (CPF, e-mail, telefone)
- [ ] Erros da API tratados com mensagem amigável
- [ ] Loading states claros por etapa
- [ ] Abandono registra `checkout_abandon`

## 8. Analytics
- [ ] dataLayer inicializado antes de eventos
- [ ] Conformidade com `docs/analytics-tracking-plan.md`
- [ ] GA4 `purchase` somente após sucesso real
- [ ] Meta Pixel dispara `InitiateCheckout` e `Purchase`

## 9. Infra / Deploy
- [ ] `.env.example` atualizado
- [ ] Variáveis configuradas em Vercel
- [ ] Preview testado antes de merge
- [ ] README atualizado com mudanças importantes

## 10. Observabilidade (Roadmap)
- [ ] Sentry instalado (futuro)
- [ ] Web Vitals custom reporter (futuro)
- [ ] Logs de erro de API estruturados

## 11. Testes (Backlog)
- [ ] Teste manual fluxo completo cartão
- [ ] Teste manual fluxo PIX
- [ ] Teste manual fluxo boleto
- [ ] Teste simulação erro API
- [ ] Teste abandono checkout

## 12. Manutenibilidade
- [ ] Código duplicado minimizado
- [ ] Próximo refactor mapeado em `architecture.md`
- [ ] Componentes complexos com comentários sucintos

## 13. LGPD / Privacidade (Planejado)
- [ ] Banner de consentimento para tracking não essencial
- [ ] IP anonimizados (GA4 setting)
- [ ] Política de privacidade linkada

## 14. Pós-Deploy (Checklist Rápido)
- [ ] Acesso às páginas principais OK
- [ ] Funil de checkout funcionando por método
- [ ] Eventos aparecem em DebugView (GA4)
- [ ] Sem erros JS no console
- [ ] Layout consistente em mobile

---
_Atualizar este checklist conforme maturidade cresce. Utilizar em cada PR que altera fluxo crítico._
