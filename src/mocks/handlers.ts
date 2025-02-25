
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/*', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json([])
    );
  }),

  rest.post('/api/*', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({ id: Date.now(), ...req.body })
    );
  }),

  rest.put('/api/:id', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ id: req.params.id, ...req.body })
    );
  }),

  rest.delete('/api/:id', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ success: true })
    );
  }),
];
