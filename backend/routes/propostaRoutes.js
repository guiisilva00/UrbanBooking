import { Router } from 'express';

export function criarPropostaRoutes({ controller }) {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.buscar);
  router.post('/', controller.criar);
  return router;
}
