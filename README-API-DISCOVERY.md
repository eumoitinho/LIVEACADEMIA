# 🔑 Live Academia API Key Discovery

## ✅ Sistema Completo Criado

Criei um sistema completo para descobrir e gerenciar as logos das unidades através da API do Pacto Soluções.

### 📁 Scripts Disponíveis:

1. **`manual-key-tester.js`** - Testa chaves individuais
2. **`manual-discovery-helper.js`** - Helper completo para gerenciar descobertas
3. **`batch-key-discovery.js`** - Descoberta automática em lote
4. **`quick-key-finder.js`** - Busca rápida em hotsites específicos

### 🎯 Chaves API Conhecidas (Funcionando):

| Unidade | Chave API | Logo API |
|---------|-----------|----------|
| **Margarita Diamante** | `fcceacc50b1db2fc4e8872b06099c142` | ✅ Atualizada |
| **Vieiralves Diamante** | `7724bf6109e5370177c8129aa431b922` | ✅ Atualizada |

### 📍 API Endpoint:
```
https://app.pactosolucoes.com.br/api/prest/v2/vendas/{chave}/unidade/1
```

## 🔍 Como Descobrir Mais Chaves:

### Método 1: Browser DevTools (Mais Eficaz)
1. Acesse um hotsite (ex: https://pedroteixeira.hotsite.in)
2. Abra DevTools (F12) → aba **Network**
3. Recarregue a página
4. Procure por chamadas para **app.pactosolucoes.com.br**
5. Copie a chave de 32 caracteres da URL
6. Teste com: `node scripts/manual-key-tester.js <chave>`

### Método 2: Código-Fonte
1. Acesse o hotsite
2. Ver código-fonte (Ctrl+U)
3. Procurar por strings de 32 caracteres hexadecimais
4. Procurar por "pactosolucoes" ou "app.pacto"

### Método 3: Scripts Automáticos
```bash
# Descoberta em lote (experimental)
node scripts/batch-key-discovery.js

# Busca rápida em hotsites específicos
node scripts/quick-key-finder.js
```

## 📋 Hotsites Prioritários para Investigar:

- https://pedroteixeira.hotsite.in
- https://cachoeirinha.hotsite.in
- https://centro.hotsite.in
- https://silves.hotsite.in
- https://allegro.hotsite.in
- https://liveplanalto.hotsite.in
- https://liverodrigues.hotsite.in
- https://liveacademiaflores.hotsite.in
- https://vitoriacoroado.hotsite.in

## 🛠️ Como Usar o Helper Manual:

```bash
# Testar uma chave
node scripts/manual-discovery-helper.js test fcceacc50b1db2fc4e8872b06099c142

# Adicionar chave descoberta
node scripts/manual-discovery-helper.js add <chave> <hotsite>

# Listar chaves descobertas
node scripts/manual-discovery-helper.js list

# Gerar script para atualizar locations.ts
node scripts/manual-discovery-helper.js generate-script
```

## 📊 Status Atual:

- ✅ **2 unidades** com logos da API implementadas
- 🔍 **20+ unidades** aguardando descoberta
- 🛠️ Sistema completo de scripts criado
- 📝 Documentação completa

## 🎯 Fluxo Recomendado:

1. **Discover** → Use DevTools em 2-3 hotsites para encontrar chaves
2. **Test** → `node scripts/manual-key-tester.js <chave>`
3. **Add** → `node scripts/manual-discovery-helper.js add <chave> <hotsite>`
4. **Update** → `node scripts/manual-discovery-helper.js generate-script && node update-with-discovered-keys.js`
5. **Repeat** → Continue até ter todas as unidades

---

**🎉 Sistema completo criado! Agora é só usar as ferramentas para descobrir as chaves restantes.**