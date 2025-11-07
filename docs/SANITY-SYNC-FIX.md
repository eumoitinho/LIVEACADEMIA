# 🔄 Fix: Sincronização entre Sanity Cloud Studio e Studio Local

## ❌ Problema
Mudanças feitas no Sanity Cloud Studio não aparecem no Studio local (`/studio`).

## ✅ Solução Implementada

### 1. Configuração Atualizada
Os arquivos `sanity.config.ts` e `sanity.cli.ts` agora usam **variáveis de ambiente** em vez de valores hardcoded, garantindo que ambos os Studios usem a mesma configuração.

### 2. Verificar Variáveis de Ambiente

Certifique-se de que seu `.env.local` contém:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=c9pbklm2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=seu-token-aqui
```

### 3. Passos para Resolver

1. **Verificar variáveis de ambiente:**
   ```bash
   # Verificar se as variáveis estão definidas
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   echo $NEXT_PUBLIC_SANITY_DATASET
   ```

2. **Reiniciar o servidor de desenvolvimento:**
   ```bash
   # Parar o servidor (Ctrl+C)
   # Limpar cache do Next.js
   rm -rf .next
   # Reiniciar
   npm run dev
   ```

3. **Limpar cache do navegador:**
   - Abra o DevTools (F12)
   - Clique com botão direito no botão de recarregar
   - Selecione "Limpar cache e recarregar forçadamente"

4. **Verificar no Studio:**
   - Acesse `http://localhost:3000/studio`
   - Verifique se está logado com a mesma conta do Cloud Studio
   - Confirme que o projeto e dataset estão corretos (deve aparecer no canto superior direito)

### 4. Verificar Dataset

Certifique-se de que ambos os Studios estão usando o mesmo dataset:

- **Cloud Studio**: Verifique em `https://c9pbklm2.sanity.studio`
- **Studio Local**: Verifique no canto superior direito do Studio

Se estiverem diferentes, ajuste a variável `NEXT_PUBLIC_SANITY_DATASET` no `.env.local`.

### 5. Problemas Comuns

#### Problema: Mudanças não aparecem
**Solução**: 
- Verifique se está usando o mesmo dataset (`production`)
- Limpe o cache do navegador
- Reinicie o servidor de desenvolvimento

#### Problema: Erro de autenticação
**Solução**:
- Verifique se o `SANITY_API_TOKEN` está correto
- Gere um novo token em [sanity.io/manage](https://sanity.io/manage)
- Atualize o `.env.local`

#### Problema: Dataset diferente
**Solução**:
- Verifique qual dataset o Cloud Studio está usando
- Atualize `NEXT_PUBLIC_SANITY_DATASET` no `.env.local` para corresponder
- Reinicie o servidor

### 6. Verificação Rápida

Execute este comando para verificar a configuração:

```bash
node -e "console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c9pbklm2'); console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production');"
```

Ambos devem corresponder ao que está configurado no Cloud Studio.

## 📝 Notas Importantes

- **Sempre use variáveis de ambiente** para `projectId` e `dataset`
- **Nunca commite** o arquivo `.env.local` no Git
- **Ambos os Studios** devem usar o mesmo `projectId` e `dataset`
- **O token** (`SANITY_API_TOKEN`) deve ter permissões de leitura e escrita

## 🔍 Debug

Se o problema persistir, verifique:

1. Console do navegador (F12) para erros
2. Logs do servidor Next.js
3. Network tab para verificar requisições à API do Sanity
4. Se o token tem as permissões corretas

