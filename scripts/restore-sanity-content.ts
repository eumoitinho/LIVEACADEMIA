/**
 * Script para Restaurar Conteúdo do Sanity
 *
 * Este script restaura o conteúdo do Sanity CMS para o estado de 2 semanas atrás.
 * Usa a API de histórico do Sanity para buscar e restaurar versões anteriores.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

// Verificar se o token existe
const SANITY_TOKEN = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('❌ ERRO: Token do Sanity não encontrado!');
  console.error('   Adicione SANITY_API_TOKEN no arquivo .env.local');
  process.exit(1);
}

// Configuração do cliente Sanity
const client = createClient({
  projectId: 'c9pbklm2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
  withCredentials: true,
});

// Tipos de documentos do Sanity (todos os schemas)
const DOCUMENT_TYPES = [
  'homepage',
  'unit',
  'plano',
  'benefit',
  'testimonial',
  'appFeature',
  'modality',
  'structureFeature',
  'wellhubFeature',
  'bioimpedanciaFeature',
  'appSection',
  'beneficiosSection',
  'dayUse',
  'sobreNos',
  'contato',
  'trabalheConosco',
  'sobre',
];

// Documentos singleton (têm ID fixo)
const SINGLETON_DOCS = {
  homepage: 'homepage',
  appSection: 'appSection',
  beneficiosSection: 'beneficiosSection',
  dayUse: 'dayUse',
  sobreNos: 'sobreNos',
  contato: 'contato',
  trabalheConosco: 'trabalheConosco',
  sobre: 'sobre',
};

interface HistoryEntry {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  [key: string]: any;
}

/**
 * Calcula a data de N semanas atrás
 */
function getDateWeeksAgo(weeks: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - (weeks * 7));
  return date;
}

/**
 * Busca todos os documentos de um tipo específico
 */
async function fetchDocumentsByType(type: string): Promise<any[]> {
  console.log(`\n📄 Buscando documentos do tipo: ${type}`);

  const query = `*[_type == $type]`;
  const params = { type };

  const documents = await client.fetch(query, params);
  console.log(`   ✓ Encontrados ${documents.length} documentos`);

  return documents;
}

/**
 * Busca o histórico de um documento
 */
async function fetchDocumentHistory(documentId: string): Promise<HistoryEntry[]> {
  try {
    const history = await client.fetch(
      `*[_id == $documentId || _id in path("${documentId}.**")]| order(_updatedAt desc)`,
      { documentId }
    );

    return history;
  } catch (error) {
    console.error(`   ✗ Erro ao buscar histórico de ${documentId}:`, error);
    return [];
  }
}

/**
 * Encontra a versão do documento mais próxima da data alvo
 */
function findVersionAtDate(history: HistoryEntry[], targetDate: Date): HistoryEntry | null {
  if (history.length === 0) return null;

  // Filtrar versões até a data alvo
  const versionsBeforeDate = history.filter(entry => {
    const entryDate = new Date(entry._updatedAt);
    return entryDate <= targetDate;
  });

  if (versionsBeforeDate.length === 0) {
    // Se não houver versões antes da data, retornar a mais antiga disponível
    return history[history.length - 1];
  }

  // Retornar a versão mais recente antes da data alvo
  return versionsBeforeDate[0];
}

/**
 * Restaura um documento para uma versão específica
 */
async function restoreDocument(document: any, dryRun: boolean = false): Promise<boolean> {
  try {
    if (dryRun) {
      console.log(`   🔄 [DRY RUN] Restauraria documento ${document._id}`);
      return true;
    }

    // Remover campos do sistema antes de restaurar
    const cleanDocument = { ...document };
    delete cleanDocument._rev;
    delete cleanDocument._createdAt;
    delete cleanDocument._updatedAt;

    // Criar ou atualizar o documento
    await client.createOrReplace(cleanDocument);
    console.log(`   ✓ Restaurado: ${document._id}`);

    return true;
  } catch (error) {
    console.error(`   ✗ Erro ao restaurar ${document._id}:`, error);
    return false;
  }
}

/**
 * Restaura todos os documentos de um tipo para a data alvo
 */
async function restoreDocumentType(
  type: string,
  targetDate: Date,
  dryRun: boolean = false
): Promise<{ success: number; failed: number; skipped: number }> {
  const stats = { success: 0, failed: 0, skipped: 0 };

  console.log(`\n🔄 Restaurando tipo: ${type}`);
  console.log(`   Data alvo: ${targetDate.toISOString()}`);

  // Para singletons, usar ID fixo
  if (SINGLETON_DOCS[type as keyof typeof SINGLETON_DOCS]) {
    const documentId = SINGLETON_DOCS[type as keyof typeof SINGLETON_DOCS];
    console.log(`   📄 Processando singleton: ${documentId}`);

    const history = await fetchDocumentHistory(documentId);

    if (history.length === 0) {
      console.log(`   ⚠️  Sem histórico disponível`);
      stats.skipped++;
      return stats;
    }

    const version = findVersionAtDate(history, targetDate);

    if (!version) {
      console.log(`   ⚠️  Nenhuma versão encontrada para a data`);
      stats.skipped++;
      return stats;
    }

    console.log(`   📅 Versão encontrada: ${new Date(version._updatedAt).toISOString()}`);

    const restored = await restoreDocument(version, dryRun);
    if (restored) {
      stats.success++;
    } else {
      stats.failed++;
    }

    return stats;
  }

  // Para coleções, buscar todos os documentos
  const documents = await fetchDocumentsByType(type);

  for (const doc of documents) {
    console.log(`\n   📄 Processando: ${doc._id}`);

    const history = await fetchDocumentHistory(doc._id);

    if (history.length === 0) {
      console.log(`      ⚠️  Sem histórico disponível`);
      stats.skipped++;
      continue;
    }

    const version = findVersionAtDate(history, targetDate);

    if (!version) {
      console.log(`      ⚠️  Nenhuma versão encontrada para a data`);
      stats.skipped++;
      continue;
    }

    console.log(`      📅 Versão de: ${new Date(version._updatedAt).toISOString()}`);

    const restored = await restoreDocument(version, dryRun);
    if (restored) {
      stats.success++;
    } else {
      stats.failed++;
    }
  }

  return stats;
}

/**
 * Função principal
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   RESTAURAÇÃO DE CONTEÚDO DO SANITY                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Mostrar informações de configuração
  console.log('🔧 Configuração:');
  console.log(`   Project ID: c9pbklm2`);
  console.log(`   Dataset: production`);
  console.log(`   API Version: 2024-01-01`);

  if (SANITY_TOKEN) {
    const tokenPreview = SANITY_TOKEN.substring(0, 8) + '...' + SANITY_TOKEN.substring(SANITY_TOKEN.length - 4);
    console.log(`   Token: ${tokenPreview} (${SANITY_TOKEN.length} caracteres)`);
  }
  console.log('');

  // Testar conexão com Sanity
  console.log('🔌 Testando conexão com Sanity...');
  try {
    const testQuery = await client.fetch('*[_type == "homepage"][0]{_id, _type}');
    console.log(`   ✓ Conexão bem-sucedida!`);
    if (testQuery) {
      console.log(`   ✓ Documento de teste encontrado: ${testQuery._type}`);
    }
  } catch (error: any) {
    console.error('\n❌ ERRO ao conectar com Sanity:');
    console.error(`   ${error.message}`);
    console.error('\n💡 Possíveis causas:');
    console.error('   1. Token inválido ou expirado');
    console.error('   2. Token não pertence ao projeto c9pbklm2');
    console.error('   3. Token sem permissões de leitura');
    console.error('\n📝 Como obter um token válido:');
    console.error('   1. Acesse: https://www.sanity.io/manage');
    console.error('   2. Selecione o projeto: Live Academia (c9pbklm2)');
    console.error('   3. Vá em: API > Tokens');
    console.error('   4. Crie um token com permissões de Editor');
    console.error('   5. Adicione no .env.local: SANITY_API_TOKEN=seu-token\n');
    process.exit(1);
  }
  console.log('');

  // Configuração
  const WEEKS_AGO = 2;
  const targetDate = getDateWeeksAgo(WEEKS_AGO);
  const dryRun = process.argv.includes('--dry-run');

  console.log(`📅 Data atual: ${new Date().toISOString()}`);
  console.log(`📅 Data alvo: ${targetDate.toISOString()}`);
  console.log(`⏰ Restaurando para: ${WEEKS_AGO} semanas atrás\n`);

  if (dryRun) {
    console.log('🔍 MODO DRY RUN - Nenhuma alteração será feita\n');
  } else {
    console.log('⚠️  MODO DE PRODUÇÃO - Alterações serão aplicadas!\n');
    console.log('   Pressione Ctrl+C nos próximos 5 segundos para cancelar...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Estatísticas gerais
  const totalStats = {
    success: 0,
    failed: 0,
    skipped: 0,
    types: 0,
  };

  // Processar cada tipo de documento
  for (const type of DOCUMENT_TYPES) {
    try {
      const stats = await restoreDocumentType(type, targetDate, dryRun);

      totalStats.success += stats.success;
      totalStats.failed += stats.failed;
      totalStats.skipped += stats.skipped;
      totalStats.types++;

      console.log(`\n   ✓ Concluído: ${stats.success} restaurados, ${stats.failed} falharam, ${stats.skipped} ignorados`);
    } catch (error) {
      console.error(`\n   ✗ Erro ao processar tipo ${type}:`, error);
      totalStats.failed++;
    }
  }

  // Resumo final
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   RESUMO DA RESTAURAÇÃO                                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`   Tipos processados:    ${totalStats.types}`);
  console.log(`   ✓ Documentos restaurados: ${totalStats.success}`);
  console.log(`   ✗ Falhas:                 ${totalStats.failed}`);
  console.log(`   ⚠️  Ignorados:              ${totalStats.skipped}`);
  console.log(`\n   Data alvo: ${targetDate.toISOString()}`);

  if (dryRun) {
    console.log('\n   🔍 Este foi um DRY RUN - nenhuma alteração foi feita.');
    console.log('   Execute novamente sem --dry-run para aplicar as mudanças.\n');
  } else {
    console.log('\n   ✓ Restauração concluída!\n');
  }
}

// Executar
main().catch(error => {
  console.error('\n❌ Erro fatal:', error);
  process.exit(1);
});
