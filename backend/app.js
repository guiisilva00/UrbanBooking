import express from 'express';
import { criarPropostaModel } from './models/PropostaModels.js';
import { criarPropostaService } from './services/PropostaService.js';
import { criarPropostaController } from './controllers/PropostaController.js';
import { criarPropostaRoutes } from './routes/propostaRoutes.js';

export const app = express();

app.use(express.json());

const propostaModel = criarPropostaModel();
const propostaService = criarPropostaService({ propostaModel });
const propostaController = criarPropostaController({ propostaService });
const propostaRoutes = criarPropostaRoutes({ controller: propostaController });

app.get('/api/check', (req, res) => {
  res.status(200).json({ status: 'ok', mensagem: 'Servidor funcionando via HTTP!' });
});
app.use('/api/propostas', propostaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe` });
});

app.use((erro, req, res, _next) => {
  console.error('Erro de Sistema: ', erro.message);
  res.status(500).json({ erro: 'Falha interna do servidor' });
});
