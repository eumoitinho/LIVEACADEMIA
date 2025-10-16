# 🔐 Segurança das Chaves de Rede - API Pacto

## 🚨 **Problema de Segurança**
As chaves de rede da Pacto são **altamente sensíveis** e dão acesso completo aos dados e transações financeiras de cada academia.

## 🛡️ **Estratégias de Segurança Implementadas**

### 1. **Criptografia no Banco de Dados**
```typescript
// As chaves são armazenadas criptografadas
const chaveRedeCriptografada = encrypt(chaveRedePlana)

// E descriptografadas apenas quando necessário
const chaveRedePlana = decrypt(chaveRedeCriptografada)
```

### 2. **Variáveis de Ambiente (Fallback)**
```bash
# Para desenvolvimento/teste
PACTO_SECRET_KEY_REDE1=chave_da_rede_1
PACTO_SECRET_KEY_REDE2=chave_da_rede_2
```

### 3. **Cache em Memória (Temporário)**
```typescript
// Tokens ficam em memória por tempo limitado
private tokens: Map<string, { token: string; expiry: number }> = new Map()
```

## 🔒 **Implementação Recomendada**

### **Opção 1: Banco de Dados Criptografado (RECOMENDADO)**
```sql
-- Tabela redes com chaves criptografadas
CREATE TABLE redes (
  id TEXT PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  chave_secreta TEXT NOT NULL, -- Criptografada
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela units referenciando redes
CREATE TABLE units (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  codigo_unidade INTEGER NOT NULL,
  rede_id TEXT REFERENCES redes(id),
  -- outros campos...
);
```

### **Opção 2: Vault/Secret Manager (PRODUÇÃO)**
```typescript
// Integração com AWS Secrets Manager, HashiCorp Vault, etc.
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"

async function getChaveRede(codigoRede: string): Promise<string> {
  const client = new SecretsManagerClient({ region: 'us-east-1' })
  const command = new GetSecretValueCommand({
    SecretId: `pacto/rede/${codigoRede}`
  })
  
  const result = await client.send(command)
  return result.SecretString || ''
}
```

## 🚀 **Implementação Atual (Simplificada)**

### **1. Função de Busca Segura**
```typescript
private async getChaveRede(codigoRede: string): Promise<string | null> {
  try {
    // 1. Tentar buscar do Supabase (criptografada)
    const { data } = await supabase
      .from('redes')
      .select('chave_secreta')
      .eq('codigo', codigoRede)
      .eq('ativo', true)
      .single()
    
    if (data?.chave_secreta) {
      return decrypt(data.chave_secreta) // Descriptografa
    }
    
    // 2. Fallback para variáveis de ambiente
    const chaveFromEnv = process.env[`PACTO_SECRET_KEY_${codigoRede.toUpperCase()}`]
    if (chaveFromEnv) {
      return chaveFromEnv
    }
    
    throw new Error(`Chave da rede ${codigoRede} não encontrada`)
  } catch (error) {
    console.error(`Erro ao buscar chave da rede ${codigoRede}:`, error)
    return null
  }
}
```

### **2. Rotação de Chaves**
```typescript
async function rotacionarChaveRede(codigoRede: string, novaChave: string) {
  const chaveCriptografada = encrypt(novaChave)
  
  await supabase
    .from('redes')
    .update({ 
      chave_secreta: chaveCriptografada,
      updated_at: new Date().toISOString()
    })
    .eq('codigo', codigoRede)
  
  // Limpar cache de tokens
  this.tokens.delete(codigoRede)
}
```

## 🛡️ **Medidas de Segurança Adicionais**

### **1. Logs de Auditoria**
```typescript
async function logAcessoRede(codigoRede: string, acao: string, ip: string) {
  await supabase
    .from('audit_logs')
    .insert({
      codigo_rede: codigoRede,
      acao: acao,
      ip: ip,
      timestamp: new Date().toISOString()
    })
}
```

### **2. Rate Limiting por Rede**
```typescript
// Limitar requisições por rede
const rateLimiter = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(codigoRede: string): boolean {
  const now = Date.now()
  const limit = rateLimiter.get(codigoRede)
  
  if (!limit || now > limit.resetTime) {
    rateLimiter.set(codigoRede, { count: 1, resetTime: now + 60000 }) // 1 min
    return true
  }
  
  if (limit.count >= 100) { // 100 req/min por rede
    return false
  }
  
  limit.count++
  return true
}
```

### **3. Validação de IP Whitelist**
```typescript
async function validarIPRede(codigoRede: string, ip: string): Promise<boolean> {
  const { data } = await supabase
    .from('rede_whitelist')
    .select('ip')
    .eq('codigo_rede', codigoRede)
    .eq('ativo', true)
  
  return data?.some(item => item.ip === ip) || false
}
```

## 📋 **Checklist de Segurança**

### **✅ Implementado:**
- [x] Criptografia AES-256-GCM para chaves
- [x] Tokens com expiração automática
- [x] Fallback para variáveis de ambiente
- [x] Logs de erro sem exposição de chaves

### **🔄 A Implementar:**
- [ ] Tabela `redes` no Supabase
- [ ] Logs de auditoria
- [ ] Rate limiting por rede
- [ ] Whitelist de IPs
- [ ] Rotação automática de chaves
- [ ] Monitoramento de anomalias

### **🚀 Para Produção:**
- [ ] AWS Secrets Manager / HashiCorp Vault
- [ ] Certificados SSL/TLS
- [ ] WAF (Web Application Firewall)
- [ ] Monitoramento 24/7
- [ ] Backup seguro das chaves

## 🔧 **Como Configurar**

### **1. Criar Tabela de Redes**
```sql
INSERT INTO redes (codigo, nome, chave_secreta, ativo) VALUES 
('66f5f102b6e5e2c7f84f3471ff10ce19', 'Live Academia', 'chave_criptografada_aqui', true);
```

### **2. Configurar Unidades**
```sql
INSERT INTO units (slug, nome, codigo_unidade, rede_id) VALUES 
('centro', 'Live Academia Centro', 1, 'rede-live-id');
```

### **3. Variáveis de Ambiente (Desenvolvimento)**
```bash
PACTO_SECRET_KEY_66F5F102B6E5E2C7F84F3471FF10CE19=chave_secreta_aqui
```

## ⚠️ **Atenção**
- **NUNCA** commite chaves no código
- **SEMPRE** use HTTPS em produção
- **MONITORE** acessos às chaves
- **ROTACIONE** chaves periodicamente
- **BACKUP** seguro das chaves

---

**A segurança das chaves é responsabilidade crítica. Implemente as medidas adequadas para seu ambiente!** 🛡️
