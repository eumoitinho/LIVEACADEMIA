# 🔧 Solução: Botão "Restore" Não Funciona no Sanity

## Problema
No Sanity Studio, o documento homepage aparece como deletado, mas quando você clica em "Restore most recent revision", nada acontece.

## ✅ Solução: Criar Novo Documento Manualmente

Como o restore não funciona, a melhor solução é **criar um novo documento** manualmente.

### Passo a Passo

1. **No Sanity Studio, ignore o documento deletado**
   - Não tente restaurar (não funciona)
   - Vá direto para criar um novo

2. **Criar novo documento**
   - Clique em **"Create"** ou **"+"** no canto superior
   - Selecione **"Homepage"**
   - Um novo documento será criado

3. **Preencher campos básicos**

   #### SEO
   ```
   Título da Página: Live Academia | Rede de Academias em Manaus
   Descrição: Transforme seu corpo e sua vida na maior rede de academias de Manaus. Sem fidelidade, sem anuidade, sem pegadinha.
   ```

   #### Hero
   ```
   Título (Linha 1): Transforme.
   Subtítulo (Linha 2): Evolua.
   Terceiro Título (Linha 3): Viva.
   Descrição: Transforme seu corpo e sua vida na maior rede de academias de Manaus. Construído para atletas que exigem excelência em cada repetição.
   
   Avaliação:
     Valor: 4.9
     Label: Elite rating
     Número de Alunos: 15k+ atletas
   
   CTA Principal:
     Texto: Comece Agora
     Link: /planos
   
   CTA Secundário:
     Texto: Ver as aulas
     Link: /aulas-coletivas
   
   Texto do Rodapé: Protocolos de treino de elite. Suporte premium. Todos os dispositivos suportados.
   ```

   #### About
   ```
   Badge: Sobre a Live Academia
   Título: Seu treino, suas regras
   Descrição: A Live Academia está presente em Manaus há mais de 10 anos, oferecendo estrutura moderna, equipamentos de última geração e profissionais altamente qualificados para te ajudar a alcançar seus objetivos.
   
   Estatísticas:
     - Valor: 10+, Label: Anos de Experiência
     - Valor: 15k+, Label: Alunos Ativos
   
   Destaques:
     - Equipamentos de última geração
     - Profissionais qualificados
     - Aulas coletivas inclusas
     - Sem fidelidade
     - Horário flexível
     - Ambiente climatizado
   ```

   #### Benefícios, Planos, Depoimentos
   - Pode deixar vazio inicialmente
   - Você pode preencher depois

4. **Publicar**
   - Clique em **"Publish"**
   - O documento será salvo e ficará **EDITÁVEL**

5. **Deletar documento antigo (opcional)**
   - Se o documento antigo ainda aparecer na lista
   - Clique nele
   - Clique nos **3 pontos (...)** no canto superior direito
   - Selecione **"Delete"** para deletar permanentemente
   - Isso limpa a lista

## ✅ Resultado

Após criar o novo documento:
- ✅ O documento estará **EDITÁVEL** no Studio
- ✅ Você poderá clicar nele e editar normalmente
- ✅ O site carregará os dados corretamente
- ✅ Não haverá mais mensagem de "deleted"

## 🆘 Se Ainda Não Funcionar

### Opção 1: Deletar Documento Antigo Primeiro

1. Clique no documento deletado
2. Clique nos **3 pontos (...)** no canto superior direito
3. Selecione **"Delete"** ou **"Delete permanently"**
4. Depois crie um novo documento

### Opção 2: Verificar Permissões

1. Verifique se você tem permissões de edição no projeto
2. Verifique se está no dataset correto (production)
3. Tente fazer logout e login novamente no Studio

### Opção 3: Limpar Cache do Browser

1. Faça um hard refresh: `Ctrl+Shift+R` (Windows/Linux) ou `Cmd+Shift+R` (Mac)
2. Ou limpe o cache do browser
3. Recarregue o Studio

## 📝 Valores Completos

Para valores completos de todos os campos, consulte:
- `docs/CRIAR-HOMEPAGE-EDITAVEL-MANUAL.md`

## 💡 Por Que o Restore Não Funciona?

Possíveis razões:
- Documento em estado inconsistente
- Problemas de permissão no Sanity
- Bug no Sanity Studio
- Documento realmente não pode ser restaurado

**Solução**: Criar um novo documento é sempre mais confiável que tentar restaurar.

## 🎯 Resumo

1. **Ignore o documento deletado**
2. **Crie um novo documento** do tipo "Homepage"
3. **Preencha os campos** com os valores acima
4. **Publique** o documento
5. **Delete o documento antigo** (opcional)

Pronto! Você terá um documento homepage editável no Sanity Studio.

