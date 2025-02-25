
import { http, HttpResponse } from 'msw';

interface RequestBody {
  [key: string]: unknown;
}

export const handlers = [
  http.get('/api/*', () => {
    return HttpResponse.json([], { status: 200 });
  }),

  http.post('/api/*', async ({ request }) => {
    const body = await request.json() as RequestBody;
    return HttpResponse.json({ id: Date.now(), ...body }, { status: 201 });
  }),

  http.put('/api/:id', async ({ request, params }) => {
    const body = await request.json() as RequestBody;
    return HttpResponse.json({ id: params.id, ...body }, { status: 200 });
  }),

  http.delete('/api/:id', ({ params }) => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
