# Live Academia Logo Discovery Guide

## ✅ Concluído

Criei um sistema completo para descobrir e gerenciar as logos das unidades do Live Academia através da API do Pacto Soluções.

### Scripts Criados:

1. **`manual-key-tester.js`** - Testa chaves API individuais
2. **`fetch-all-logos.js`** - Busca logos de todas as unidades  
3. **`smart-key-discovery.js`** - Descoberta inteligente de chaves
4. **`update-logos.js`** - Atualiza locations.ts com novas logos

### Dados Organizados:

- **`api-keys-and-logos.json`** - Mapeamento completo de unidades e chaves
- **`unidades_live.json`** - Dados existentes das unidades
- **`responses.json`** - Exemplos da API

## 🔑 Chaves API Conhecidas

| Unidade | Chave API | Status |
|---------|-----------|---------|
| **Margarita Diamante** | `fcceacc50b1db2fc4e8872b06099c142` | ✅ Funcionando |
| **Vieiralves Diamante** | `7724bf6109e5370177c8129aa431b922` | ✅ Funcionando |

## 📍 API Base URL
```
https://app.pactosolucoes.com.br/api/prest/v2/vendas/{chave}/unidade/1
```

## 🎯 Como Descobrir Mais Chaves

### 1. Browser DevTools (Recomendado)
```bash
# 1. Acesse um hotsite (ex: https://pedroteixeira.hotsite.in)
# 2. Abra DevTools (F12)
# 3. Vá na aba Network
# 4. Recarregue a página
# 5. Procure por chamadas para app.pactosolucoes.com.br
# 6. Extraia a chave de 32 caracteres da URL
```

### 2. Teste Chave Descoberta
```bash
node scripts/manual-key-tester.js <chave-descoberta>
```

### 3. Procurar no Código-Fonte
- Acesse o hotsite
- Ver código-fonte (Ctrl+U)  
- Procurar por strings de 32 caracteres hexadecimais
- Procurar por "pactosolucoes" ou "app.pacto"

## 📋 Hotsites Para Investigar

### Prioritários (hotsites *.hotsite.in):
- https://pedroteixeira.hotsite.in
- https://bomprato.hotsite.in
- https://liveacademiacidadenova.hotsite.in/home
- https://cachoeirinha.hotsite.in
- https://livemcamapua.hotsite.in
- https://centro.hotsite.in
- https://livechapeugoiano.hotsite.in
- https://livecidadededeus.hotsite.in
- https://compensa.hotsite.in/home
- https://livedompedro.hotsite.in/
- https://liveacademiaflores.hotsite.in
- https://livejapiim.hotsite.in/home
- https://liverodrigues.hotsite.in
- https://silves.hotsite.in
- https://livesumauma.hotsite.in
- https://livetiradentes.hotsite.in
- https://allegro.hotsite.in
- https://livetorquato1.hotsite.in/home
- https://liveacademiastorres.hotsite.in/home
- https://liveplanalto.hotsite.in
- https://vitoriacoroado.hotsite.in

## 🚀 Como Usar os Scripts

### Testar Chave Individual
```bash
node scripts/manual-key-tester.js fcceacc50b1db2fc4e8872b06099c142
```

### Descoberta Automática (Experimental)
```bash
node scripts/smart-key-discovery.js
```

### Atualizar locations.ts com Nova Chave
1. Adicione a nova chave em `scripts/update-logos.js` 
2. Execute: `node scripts/update-logos.js`

## 📊 Status Atual

- ✅ **2 unidades** com logos da API funcionando
- 🔍 **20+ unidades** aguardando descoberta da chave
- 🛠️ Scripts completos para automação

## 🎯 Próximos Passos

1. **Manualmente**, use DevTools para descobrir 2-3 chaves
2. Teste as chaves com o script de teste
3. Adicione as chaves funcionais ao código
4. Repita o processo para mais unidades

## 💡 Dicas

- Chaves são strings de 32 caracteres hexadecimais (0-9, a-f)
- Sempre testar chaves antes de adicionar ao código
- Algumas unidades podem usar APIs diferentes
- Documentar todas as chaves descobertas

---

**Resultado:** Sistema completo criado. Agora é só descobrir as chaves restantes usando as ferramentas fornecidas!