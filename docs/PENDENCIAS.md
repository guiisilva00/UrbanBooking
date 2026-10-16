# Pendências da integração front ↔ back

Padrão de campos (migration): `artista, contratante, categoria, descricao, local, valor, data, status`
Status válidos: `Pendente`, `Confirmado`, `Cancelado`

## Integração
- [x] Proxy/CORS: rewrite `/api/:path*` → backend na porta 3005
- [x] `propostas/page.jsx`: trocar `propostas.json` por `fetch` em `GET /api/propostas` (ler `.dados`)
- [x] `nova-proposta`: trocar `console.log` por `POST /api/propostas` e exibir o `erro` do backend
- [x] Backend: criar `PUT /api/propostas/:id` e `DELETE /api/propostas/:id` (model, service, controller, rota)
- [x] Ligar `FormEditar` ao PUT
- [x] Ligar `BotaoExcluir` ao DELETE
- [x] `FormEditar` não tem os campos local, cidade, estado e data; adicionar junto com o PUT
- [x] Apagar `frontend/src/propostas.json`

## Outros problemas
- [x] Criar a página `/propostas/[id]` (detalhes); o card aponta para ela e hoje dá 404
- [x] `config/database.js`: adicionar `dateStrings: true` (evita data com fuso errado)
- [ ] `.env.example`: `DB_NAME=loja_api` → nome do banco do projeto
- [ ] `PropostaService.criar` usa `id: 1` falso para passar na validação da classe `Proposta`
- [ ] `PropostaController.criar`: só `TypeError` deve virar 400; o resto vai para `next(erro)`
- [ ] Card formata valor com `toFixed`; usar `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
