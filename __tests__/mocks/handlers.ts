import { rest } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

const testData = [{ id: 1, name: 'test' }];

export const handlers = [
  rest.get<never, any>(`${BASE_URL}/grants`, (_req, res, ctx) => {
    return res(ctx.json(testData));
  }),
];
