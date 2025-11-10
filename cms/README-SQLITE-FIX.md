# 🔧 Fix para better-sqlite3 no Strapi

## Problema
O `better-sqlite3` precisa ser compilado nativamente para funcionar, mas o pnpm está bloqueando os build scripts.

## Solução Implementada

### 1. Script de Pré-compilação
Criado `scripts/ensure-sqlite.js` que:
- Verifica se o `better_sqlite3.node` existe
- Compila automaticamente se não existir
- Executa antes de iniciar o Strapi

### 2. Scripts Atualizados
O `package.json` foi atualizado para:
```json
{
  "scripts": {
    "ensure-sqlite": "node scripts/ensure-sqlite.js",
    "dev": "npm run ensure-sqlite && strapi develop",
    "develop": "npm run ensure-sqlite && strapi develop"
  }
}
```

## Como Usar

```bash
cd cms
pnpm dev
```

O script verificará e compilará o `better-sqlite3` automaticamente antes de iniciar o Strapi.

## Solução Alternativa (se ainda não funcionar)

Se o problema persistir, você pode:

### Opção 1: Usar npm ao invés de pnpm
```bash
cd cms
rm -rf node_modules pnpm-lock.yaml
npm install
npm run dev
```

### Opção 2: Usar Node.js 22 (recomendado pelo Strapi)
```bash
nvm install 22
nvm use 22
cd cms
rm -rf node_modules
pnpm install
pnpm dev
```

### Opção 3: Atualizar better-sqlite3
```bash
cd cms
pnpm add better-sqlite3@latest
pnpm dev
```

## Troubleshooting

### Erro: "Could not locate the bindings file"
1. Execute o script manualmente:
   ```bash
   cd cms
   node scripts/ensure-sqlite.js
   ```

2. Verifique se o arquivo foi criado:
   ```bash
   ls -la node_modules/.pnpm/better-sqlite3@11.3.0/node_modules/better-sqlite3/build/Release/better_sqlite3.node
   ```

3. Se não existir, compile manualmente:
   ```bash
   cd node_modules/.pnpm/better-sqlite3@11.3.0/node_modules/better-sqlite3
   npm run build-release
   ```

### Erro: "Missing admin.auth.secret"
Verifique se o arquivo `.env` existe e tem todas as variáveis necessárias (veja `README-SETUP.md`).

## Notas

- O Strapi recomenda Node.js <=22.x.x, mas funciona com Node.js 25.1.0 após compilar o `better-sqlite3`
- O pnpm pode bloquear build scripts por padrão por segurança
- A compilação manual garante que o módulo nativo seja compilado para sua arquitetura específica

