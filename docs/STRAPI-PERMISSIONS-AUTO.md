# 🔐 Configuração Automática de Permissões do Strapi

## ✅ Solução Implementada

As permissões agora são configuradas **automaticamente** quando o Strapi inicia, através do arquivo `cms/src/index.ts`.

## 🚀 Como Funciona

1. Quando o Strapi inicia, o bootstrap executa automaticamente
2. Verifica se as permissões já foram configuradas
3. Se não, configura todas as permissões necessárias
4. Se sim, apenas verifica e continua

## 📋 Permissões Configuradas Automaticamente

### Single Types
- `homepage`
- `contact-page`
- `day-use-page`
- `about-page`
- `trabalhe-conosco-page`
- `global-setting`

**Ações**: `find`, `update`

### Collection Types
- `plan`
- `unit`
- `benefit`
- `modality`

**Ações**: `find`, `findOne`, `create`, `update`, `delete`

## 🎯 Como Usar

1. **Inicie o Strapi**:
   ```bash
   cd cms
   pnpm dev
   ```

2. **Aguarde a configuração automática**:
   Você verá no console:
   ```
   🔐 Configurando X permissões...
   ✅ Permissões configuradas com sucesso!
   ```

3. **Execute o seed**:
   ```bash
   cd cms
   pnpm run seed
   ```

## 🔄 Reinicialização

As permissões são configuradas apenas na primeira vez. Nas próximas inicializações, o Strapi apenas verifica se já estão configuradas.

Se precisar reconfigurar:
1. Pare o Strapi
2. Reinicie o Strapi
3. As permissões serão verificadas e atualizadas se necessário

## 🐛 Troubleshooting

### Permissões não estão sendo configuradas

**Causa**: O Strapi pode não ter iniciado completamente.

**Solução**:
1. Pare o Strapi (Ctrl+C)
2. Reinicie: `pnpm dev`
3. Aguarde a mensagem de confirmação

### Erro ao configurar permissões

**Causa**: Pode haver um problema com o plugin de users-permissions.

**Solução**:
1. Verifique os logs do Strapi
2. Certifique-se de que o plugin `users-permissions` está instalado
3. Verifique se o role "Public" existe no Strapi

### Permissões ainda não funcionam

**Solução Manual**:
1. Acesse: `http://localhost:1337/admin`
2. Vá em: Settings → Users & Permissions Plugin → Roles → Public
3. Habilite manualmente as permissões
4. Salve

## 📚 Referências

- [Strapi Bootstrap Documentation](https://docs.strapi.io/dev-docs/configurations/server#bootstrap)
- [Strapi Permissions API](https://docs.strapi.io/dev-docs/plugins/users-permissions#programmatic-usage)

