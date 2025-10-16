-- Migration: Criar tabela de redes para chaves da Pacto
-- Data: 2024-01-XX
-- Descrição: Tabela para armazenar chaves de rede da Pacto Soluções de forma segura

-- Criar tabela de redes
CREATE TABLE IF NOT EXISTS redes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  codigo TEXT UNIQUE NOT NULL, -- Código da rede na Pacto (ex: 66f5f102b6e5e2c7f84f3471ff10ce19)
  nome TEXT NOT NULL, -- Nome da rede/academia
  chave_secreta TEXT NOT NULL, -- Chave secreta criptografada
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_redes_codigo ON redes(codigo);
CREATE INDEX IF NOT EXISTS idx_redes_ativo ON redes(ativo);

-- Criar trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_redes_updated_at 
    BEFORE UPDATE ON redes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Atualizar tabela units para referenciar redes
ALTER TABLE units 
ADD COLUMN IF NOT EXISTS rede_id TEXT REFERENCES redes(id);

-- Criar índice para a nova coluna
CREATE INDEX IF NOT EXISTS idx_units_rede_id ON units(rede_id);

-- Comentários para documentação
COMMENT ON TABLE redes IS 'Tabela para armazenar chaves de rede da Pacto Soluções';
COMMENT ON COLUMN redes.codigo IS 'Código único da rede na Pacto';
COMMENT ON COLUMN redes.chave_secreta IS 'Chave secreta da rede criptografada';
COMMENT ON COLUMN redes.ativo IS 'Se a rede está ativa para uso';

-- Inserir dados de exemplo (remover em produção)
-- IMPORTANTE: Substituir pela chave real antes de usar!
INSERT INTO redes (codigo, nome, chave_secreta, ativo) VALUES 
('66f5f102b6e5e2c7f84f3471ff10ce19', 'Live Academia', 'CHAVE_CRIPTOGRAFADA_AQUI', true)
ON CONFLICT (codigo) DO NOTHING;

-- Atualizar unidades existentes para referenciar a rede
-- IMPORTANTE: Ajustar os IDs conforme sua estrutura
UPDATE units 
SET rede_id = (SELECT id FROM redes WHERE codigo = '66f5f102b6e5e2c7f84f3471ff10ce19')
WHERE slug IN ('centro', 'cidade-nova') -- Ajustar conforme suas unidades
AND rede_id IS NULL;

-- Criar tabela de logs de auditoria
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  codigo_rede TEXT NOT NULL,
  acao TEXT NOT NULL, -- 'auth', 'venda', 'simulacao', etc.
  ip TEXT,
  user_agent TEXT,
  sucesso BOOLEAN DEFAULT true,
  erro TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para logs de auditoria
CREATE INDEX IF NOT EXISTS idx_audit_logs_codigo_rede ON audit_logs(codigo_rede);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_acao ON audit_logs(acao);

COMMENT ON TABLE audit_logs IS 'Logs de auditoria para acesso às redes';

-- Função para log de acesso
CREATE OR REPLACE FUNCTION log_acesso_rede(
  p_codigo_rede TEXT,
  p_acao TEXT,
  p_ip TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_sucesso BOOLEAN DEFAULT true,
  p_erro TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  log_id TEXT;
BEGIN
  INSERT INTO audit_logs (
    codigo_rede, acao, ip, user_agent, sucesso, erro, metadata
  ) VALUES (
    p_codigo_rede, p_acao, p_ip, p_user_agent, p_sucesso, p_erro, p_metadata
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION log_acesso_rede IS 'Função para registrar logs de acesso às redes';

-- Política de segurança RLS (Row Level Security)
ALTER TABLE redes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Política para redes (apenas service role pode acessar)
CREATE POLICY "Service role can access redes" ON redes
  FOR ALL USING (auth.role() = 'service_role');

-- Política para logs (apenas service role pode inserir)
CREATE POLICY "Service role can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Política para logs (service role pode ler todos)
CREATE POLICY "Service role can read audit logs" ON audit_logs
  FOR SELECT USING (auth.role() = 'service_role');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON redes TO service_role;
GRANT ALL ON audit_logs TO service_role;
GRANT EXECUTE ON FUNCTION log_acesso_rede TO service_role;
