# 🚀 Configuração Final: Chaves por Unidade na Vercel

## ✅ **Sistema Corrigido**

Agora o sistema está configurado corretamente para usar **Bearer Token** com autenticação por unidade:

### **Fluxo de Autenticação:**
1. **Chave Secreta** → Gera **Bearer Token**
2. **Bearer Token** → Usado em todas as requisições
3. **Token expira** → Renovado automaticamente

## 🔐 **Estrutura de Chaves**

### **Variáveis por Unidade (Vercel):**
```bash
# Torres
PACTO_SECRET_KEY_TORRES=sua_chave_torres

# Vieiralves  
PACTO_SECRET_KEY_VIEIRALVES=sua_chave_vieiralves

# Torquato Santos Dumont
PACTO_SECRET_KEY_TORQUATO_SANTOS_DUMONT=sua_chave_santos_dumont

# V8
PACTO_SECRET_KEY_V8=sua_chave_v8

# Franceses
PACTO_SECRET_KEY_FRANCESES=sua_chave_franceses

# Dom Pedro
PACTO_SECRET_KEY_DOM_PEDRO=sua_chave_dom_pedro

# Compensa
PACTO_SECRET_KEY_COMPENSA=sua_chave_compensa

# Tiradentes
PACTO_SECRET_KEY_TIRADENTES=sua_chave_tiradentes

# Japiim
PACTO_SECRET_KEY_JAPIIM=sua_chave_japiim

# CT Cidade Nova
PACTO_SECRET_KEY_CT_CIDADE_NOVA=sua_chave_cidade_nova

# Margarita Diamante
PACTO_SECRET_KEY_MARGARITA_DIAMANTE=sua_chave_margarita

# Torquato Bemol
PACTO_SECRET_KEY_TORQUATO_BEMOL=sua_chave_bemol

# Centro
PACTO_SECRET_KEY_CENTRO=sua_chave_centro

# Cachoeirinha
PACTO_SECRET_KEY_CACHOEIRINHA=sua_chave_cachoeirinha

# Sumaúma
PACTO_SECRET_KEY_SUMAUMA=sua_chave_sumauma

# Laranjeiras
PACTO_SECRET_KEY_LARANJEIRAS=sua_chave_laranjeiras

# Torquato Allegro
PACTO_SECRET_KEY_TORQUATO_ALLEGRO=sua_chave_allegro

# Chapéu Goiano
PACTO_SECRET_KEY_CHAPEU_GOIANO=sua_chave_chapeu_goiano

# Jacira
PACTO_SECRET_KEY_JACIRA=sua_chave_jacira

# Adrianópolis
PACTO_SECRET_KEY_ADRIANOPOLIS=sua_chave_adrianopolis

# Parque 10
PACTO_SECRET_KEY_PARQUE_10=sua_chave_parque_10

# Camapuã
PACTO_SECRET_KEY_CAMAPUA=sua_chave_camapua

# Belém
PACTO_SECRET_KEY_BELEM=sua_chave_belem

# Silves
PACTO_SECRET_KEY_SILVES=sua_chave_silves

# Morada
PACTO_SECRET_KEY_MORADA=sua_chave_morada

# Ponta Negra
PACTO_SECRET_KEY_PONTA_NEGRA=sua_chave_ponta_negra

# Alphaville
PACTO_SECRET_KEY_ALPHAVILLE=sua_chave_alphaville

# Cidade de Deus
PACTO_SECRET_KEY_CIDADE_DE_DEUS=sua_chave_cidade_de_deus

# Petrópolis
PACTO_SECRET_KEY_PETROPOLIS=sua_chave_petropolis

# Coroado
PACTO_SECRET_KEY_COROADO=sua_chave_coroado

# Planalto Diamante
PACTO_SECRET_KEY_PLANALTO_DIAMANTE=sua_chave_planalto

# Rodrigues Grande Circular
PACTO_SECRET_KEY_RODRIGUES_GRANDE_CIRCULAR=sua_chave_rodrigues

# Flores Diamante
PACTO_SECRET_KEY_FLORES_DIAMANTE=sua_chave_flores

# Bom Prato Diamante
PACTO_SECRET_KEY_BOM_PRATO_DIAMANTE=sua_chave_bom_prato

# Pedro Teixeira Diamante
PACTO_SECRET_KEY_PEDRO_TEXEIRA_DIAMANTE=sua_chave_pedro_teixeira
```

### **Variáveis Globais:**
```bash
# reCAPTCHA
RECAPTCHA_SECRET_KEY=sua_chave_recaptcha

# Criptografia
ENCRYPTION_KEY=chave_para_criptografia

# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

## 🛠️ **Como Configurar**

### **1. Script Automático (Recomendado):**
```bash
# Execute o script para configurar todas as unidades
./scripts/setup-all-units-keys.sh
```

### **2. Manual (Interface Web):**
1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione cada variável em **texto plano**

### **3. CLI Individual:**
```bash
# Exemplo para uma unidade
echo "sua_chave_aqui" | vercel env add PACTO_SECRET_KEY_TORRES production
```

## 🔄 **Fluxo de Autenticação**

```typescript
// 1. Buscar chave da unidade
const chave = await getChaveUnidade('torres')

// 2. Gerar token
POST /v2/vendas/tkn/{chave}
Response: { token: "bearer_token_aqui" }

// 3. Usar token em requisições
GET /v2/vendas/torres/planos/1
Headers: { Authorization: "Bearer bearer_token_aqui" }
```

## 📊 **Mapeamento de Unidades**

| Slug | Nome | Chave Vercel |
|------|------|--------------|
| `torres` | Torres | `PACTO_SECRET_KEY_TORRES` |
| `vieiralves` | Vieiralves | `PACTO_SECRET_KEY_VIEIRALVES` |
| `torquato-santos-dumont` | Torquato Santos Dumont | `PACTO_SECRET_KEY_TORQUATO_SANTOS_DUMONT` |
| `v8` | V8 | `PACTO_SECRET_KEY_V8` |
| `franceses` | Franceses | `PACTO_SECRET_KEY_FRANCESES` |
| `dom-pedro` | Dom Pedro | `PACTO_SECRET_KEY_DOM_PEDRO` |
| `compensa` | Compensa | `PACTO_SECRET_KEY_COMPENSA` |
| `tiradentes` | Tiradentes | `PACTO_SECRET_KEY_TIRADENTES` |
| `japiim` | Japiim | `PACTO_SECRET_KEY_JAPIIM` |
| `ct-cidade-nova` | CT Cidade Nova | `PACTO_SECRET_KEY_CT_CIDADE_NOVA` |
| `margarita-diamante` | Margarita Diamante | `PACTO_SECRET_KEY_MARGARITA_DIAMANTE` |
| `torquato-bemol` | Torquato Bemol | `PACTO_SECRET_KEY_TORQUATO_BEMOL` |
| `centro` | Centro | `PACTO_SECRET_KEY_CENTRO` |
| `cachoeirinha` | Cachoeirinha | `PACTO_SECRET_KEY_CACHOEIRINHA` |
| `sumauma` | Sumaúma | `PACTO_SECRET_KEY_SUMAUMA` |
| `laranjeiras` | Laranjeiras | `PACTO_SECRET_KEY_LARANJEIRAS` |
| `torquato-allegro` | Torquato Allegro | `PACTO_SECRET_KEY_TORQUATO_ALLEGRO` |
| `chapeu-goiano` | Chapéu Goiano | `PACTO_SECRET_KEY_CHAPEU_GOIANO` |
| `jacira` | Jacira | `PACTO_SECRET_KEY_JACIRA` |
| `adrianopolis` | Adrianópolis | `PACTO_SECRET_KEY_ADRIANOPOLIS` |
| `parque-10` | Parque 10 | `PACTO_SECRET_KEY_PARQUE_10` |
| `camapua` | Camapuã | `PACTO_SECRET_KEY_CAMAPUA` |
| `belem` | Belém | `PACTO_SECRET_KEY_BELEM` |
| `silves` | Silves | `PACTO_SECRET_KEY_SILVES` |
| `morada` | Morada | `PACTO_SECRET_KEY_MORADA` |
| `ponta-negra` | Ponta Negra | `PACTO_SECRET_KEY_PONTA_NEGRA` |
| `alphaville` | Alphaville | `PACTO_SECRET_KEY_ALPHAVILLE` |
| `cidade-de-deus` | Cidade de Deus | `PACTO_SECRET_KEY_CIDADE_DE_DEUS` |
| `petropolis` | Petrópolis | `PACTO_SECRET_KEY_PETROPOLIS` |
| `coroado` | Coroado | `PACTO_SECRET_KEY_COROADO` |
| `planalto-diamante` | Planalto Diamante | `PACTO_SECRET_KEY_PLANALTO_DIAMANTE` |
| `rodrigues-grande-circular` | Rodrigues Grande Circular | `PACTO_SECRET_KEY_RODRIGUES_GRANDE_CIRCULAR` |
| `flores-diamante` | Flores Diamante | `PACTO_SECRET_KEY_FLORES_DIAMANTE` |
| `bom-prato-diamante` | Bom Prato Diamante | `PACTO_SECRET_KEY_BOM_PRATO_DIAMANTE` |
| `pedro-teixeira-diamante` | Pedro Teixeira Diamante | `PACTO_SECRET_KEY_PEDRO_TEXEIRA_DIAMANTE` |

## 🧪 **Testar Configuração**

### **1. Health Check:**
```bash
curl https://seu-dominio.vercel.app/api/health/pacto
```

### **2. Teste de Unidade:**
```bash
# Testar planos de uma unidade específica
curl https://seu-dominio.vercel.app/api/pacto/planos/torres
```

### **3. Logs da Vercel:**
```bash
# Verificar logs em tempo real
vercel logs --follow
```

## 📋 **Checklist de Deploy**

### **✅ Antes do Deploy:**
- [ ] Configurar todas as chaves na Vercel
- [ ] Testar em ambiente de preview
- [ ] Verificar se as chaves estão acessíveis
- [ ] Confirmar que não há erros nos logs

### **✅ Após o Deploy:**
- [ ] Executar health check
- [ ] Testar endpoints da API
- [ ] Verificar logs de produção
- [ ] Monitorar uso das chaves

## ⚠️ **Cuidados Importantes**

### **✅ Faça:**
- Use nomes descritivos mas seguros
- Monitore acessos via logs da Vercel
- Rotacione chaves periodicamente
- Teste em preview antes de produção

### **❌ Não Faça:**
- Nunca commite chaves no código
- Não use nomes óbvios que exponham estrutura
- Não compartilhe chaves via chat/email
- Não deixe chaves em arquivos públicos

## 🎯 **Resumo Final**

**Sistema corrigido para usar Bearer Token com chaves por unidade!**

- 🔒 **Seguro**: Bearer Token + Vercel protection
- ⚡ **Rápido**: Token cache + renovação automática
- 🛠️ **Simples**: Configuração direta por unidade
- 🔧 **Manutenível**: Fácil de gerenciar e debugar

**Pronto para produção!** 🚀
