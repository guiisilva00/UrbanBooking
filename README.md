# Proposta Inicial de Projeto — Urban Booking

## Informações Gerais

- **Nome do Projeto:** Urban Booking
- **Tema:** Gerenciamento de Shows e Produção de Eventos de Hip Hop
- **Objetivo:** Desenvolver uma aplicação web de gestão operacional voltada para agências, produtoras ou contratantes de artistas de Hip Hop, permitindo cadastrar, listar, atualizar e excluir propostas de shows, turnês e eventos, além de controlar a situação (status de aprovação e cachê) de cada apresentação.
- **Usuário Principal:** Produtor de eventos, agente artístico ou manager de Hip Hop.

## Entidade Principal e Dados Gerenciados

A aplicação gerenciará um único tipo principal de registro (**Proposta de Show / Evento de Hip Hop**), contendo os seguintes campos:

1. **`id` :** Identificador numérico único de controle interno.
2. **`artista` :** Nome do rapper, grupo ou sound system principal (ex.: *"Djonga"*, *"Racionais MC's"*, *"Matuê"*).
3. **`contratante` :** Nome da casa de shows, festival ou promotora (ex.: *"Festival Cena 2K"*, *"Espaço das Américas"*).
4. **`categoria` :** Estilo ou formato do evento (ex.: *"Trap"*, *"Boom Bap"*, *"Batalha de MCs"*, *"Festival"*).
5. **`data` :** Data prevista para a realização do show.
6. **`local` :** Cidade, arena ou endereço do evento.
7. **`valor` :** Cachê artístico proposto em reais (R\$).
8. **`status`:** Situação da proposta (*"Pendente"*, *"Confirmado"*, *"Cancelado"*, *"Realizado"*).
