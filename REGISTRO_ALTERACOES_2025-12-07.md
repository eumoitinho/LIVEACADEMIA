# REGISTRO DE ALTERACOES DE CODIGO-FONTE

## PROJETO: LIVE ACADEMIA - SISTEMA WEB

---

### INFORMACOES GERAIS

| Campo | Valor |
|-------|-------|
| Data | 07 de dezembro de 2025 |
| Fuso Horario | America/Sao_Paulo (UTC-3) |
| Repositorio | https://github.com/eumoitinho/LIVEACADEMIA |
| Branch | main |
| Autor dos Commits | eumoitinho |
| Email do Autor | joao.silva489@academico.ufgd.edu.br |

---

## SUMARIO EXECUTIVO

No dia 07 de dezembro de 2025, foram realizadas 5 (cinco) alteracoes no codigo-fonte do sistema Live Academia, conforme detalhado abaixo. As modificacoes abrangeram correcoes de interface, ajustes de seguranca, otimizacao de APIs e atualizacao de dependencias.

---

## REGISTRO DETALHADO DE COMMITS

### COMMIT 1 DE 5

| Campo | Valor |
|-------|-------|
| Hash do Commit | 46d89943323cff018c0a588b5205a2d380651cc0 |
| Data e Hora | 07/12/2025 18:09:21 (UTC-3) |
| Mensagem | feat: update color variables in globals.css and enhance unit filtering logic in Unidades component |
| Link | https://github.com/eumoitinho/LIVEACADEMIA/commit/46d89943323cff018c0a588b5205a2d380651cc0 |

**Arquivos Modificados (10 arquivos, +297 linhas, -159 linhas):**

1. `app/api/cep/consultar/route.ts` - Otimizacao da API de consulta de CEP com requisicoes paralelas e timeout de 3 segundos
2. `app/globals.css` - Correcao de variaveis CSS de cores (conversao de RGB para HSL) e adicao de estilos para tema claro
3. `app/unidades/[slug]/components/unidade-content.tsx` - Alteracao do mapa para buscar por endereco ao inves de coordenadas fixas
4. `app/unidades/page.tsx` - Adicao de filtro "Tradicional" e exclusao de unidades em inauguracao da listagem
5. `src/components/checkout/checkout-modal-v2.tsx` - Correcao de estilos de input para tema claro
6. `src/features/units/unit-planos.tsx` - Prevencao de chamadas duplicadas a API de planos
7. `src/lib/config/locations.ts` - Alteracao do status da unidade Morada do Sol Diamante para inauguracao

**Descricao Tecnica:**
- Implementacao de busca paralela em duas APIs de CEP (ViaCEP e BrasilAPI) com fallback automatico
- Correcao de incompatibilidade de variaveis CSS com o framework Tailwind/shadcn-ui
- Melhoria na exibicao de mapas utilizando busca por endereco
- Implementacao de controle de re-renderizacao com useRef para evitar multiplas chamadas de API

---

### COMMIT 2 DE 5

| Campo | Valor |
|-------|-------|
| Hash do Commit | 6bb89d8d3da154b47f1090047241986f6f02d5d7 |
| Data e Hora | 07/12/2025 18:12:47 (UTC-3) |
| Mensagem | feat: simplify payment method options by removing PIX and Boleto options from CheckoutModalV2 |
| Link | https://github.com/eumoitinho/LIVEACADEMIA/commit/6bb89d8d3da154b47f1090047241986f6f02d5d7 |

**Arquivos Modificados (1 arquivo, +5 linhas, -82 linhas):**

1. `src/components/checkout/checkout-modal-v2.tsx` - Remocao das opcoes de pagamento PIX e Boleto

**Descricao Tecnica:**
- Remocao do botao de selecao de PIX do modal de checkout
- Remocao do botao de selecao de Boleto do modal de checkout
- Remocao das secoes de instrucoes de PIX e Boleto
- Remocao da exibicao de codigo PIX na tela de sucesso
- Limpeza de imports nao utilizados (QrCode, FileText, Copy, ExternalLink)

---

### COMMIT 3 DE 5

| Campo | Valor |
|-------|-------|
| Hash do Commit | 74f849ae4b4d65eee620762b9019b05d6c6b84ed |
| Data e Hora | 07/12/2025 18:13:09 (UTC-3) |
| Mensagem | feat: update payment method selection to only display credit card option in CheckoutModalV2 |
| Link | https://github.com/eumoitinho/LIVEACADEMIA/commit/74f849ae4b4d65eee620762b9019b05d6c6b84ed |

**Arquivos Modificados (1 arquivo, +5 linhas, -17 linhas):**

1. `src/components/checkout/checkout-modal-v2.tsx` - Simplificacao da interface de selecao de pagamento

**Descricao Tecnica:**
- Substituicao do seletor de metodo de pagamento por indicador fixo de cartao de credito
- Atualizacao do tipo da variavel paymentMethod para aceitar apenas 'cartao'

---

### COMMIT 4 DE 5

| Campo | Valor |
|-------|-------|
| Hash do Commit | 4d50f28a4bb3a1df5e2644e2e2a3e9772f4776dd |
| Data e Hora | 07/12/2025 18:16:26 (UTC-3) |
| Mensagem | feat: streamline card payment form by consolidating input fields and improving layout |
| Link | https://github.com/eumoitinho/LIVEACADEMIA/commit/4d50f28a4bb3a1df5e2644e2e2a3e9772f4776dd |

**Arquivos Modificados (1 arquivo, +40 linhas, -42 linhas):**

1. `src/components/checkout/checkout-modal-v2.tsx` - Reorganizacao do formulario de cartao de credito

**Descricao Tecnica:**
- Remocao de condicional desnecessaria para exibicao do formulario de cartao
- Simplificacao da validacao do formulario para considerar apenas campos de cartao
- Melhoria na estrutura do codigo do formulario de pagamento

---

### COMMIT 5 DE 5

| Campo | Valor |
|-------|-------|
| Hash do Commit | d2e282cf5bf73e5be65c965a3fc32fbc5dfd23b6 |
| Data e Hora | 07/12/2025 18:23:28 (UTC-3) |
| Mensagem | Refactor code structure for improved readability and maintainability |
| Link | https://github.com/eumoitinho/LIVEACADEMIA/commit/d2e282cf5bf73e5be65c965a3fc32fbc5dfd23b6 |

**Arquivos Modificados (3 arquivos, +262 linhas, -271 linhas):**

1. `.claude/settings.local.json` - Configuracoes locais de desenvolvimento
2. `package.json` - Atualizacao da versao do Next.js de 15.2.4 para 15.5.7
3. `pnpm-lock.yaml` - Atualizacao do arquivo de lock de dependencias

**Descricao Tecnica:**
- Atualizacao do framework Next.js para correcao da vulnerabilidade de seguranca CVE-2025-66478
- A versao anterior (15.2.4) continha uma vulnerabilidade critica identificada pela Vercel
- A nova versao (15.5.7) contem o patch de seguranca necessario

---

## RESUMO DAS ALTERACOES POR CATEGORIA

### Seguranca
- Atualizacao do Next.js de 15.2.4 para 15.5.7 para correcao de CVE-2025-66478

### Interface do Usuario
- Correcao de variaveis CSS para compatibilidade com tema claro e escuro
- Correcao de texto transparente em campos de input do modal de checkout
- Simplificacao do modal de pagamento para aceitar apenas cartao de credito

### Funcionalidades
- Remocao das opcoes de pagamento PIX e Boleto
- Adicao do filtro "Tradicional" na pagina de unidades
- Exclusao automatica de unidades em inauguracao da listagem publica
- Alteracao do mapa para buscar por endereco (melhoria na precisao da localizacao)

### Performance
- Otimizacao da API de CEP com requisicoes paralelas e timeout de 3 segundos
- Prevencao de chamadas duplicadas a API de planos

### Dados
- Alteracao do status da unidade "Morada do Sol Diamante" para inauguracao

---

## DECLARACAO

Este documento foi gerado automaticamente a partir do historico de commits do repositorio Git do projeto Live Academia. As informacoes aqui contidas sao fidedignas ao registro de versao do codigo-fonte na data especificada.

---

**Documento gerado em:** 07 de dezembro de 2025
**Ferramenta utilizada:** Git version control system
**Formato de hash:** SHA-1 (40 caracteres hexadecimais)
