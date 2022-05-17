import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { rest } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getGrantsData: GrantApplicationInterface[] = [{ id: 1, nearId: 'sandoche.testnet' }];

export const handlers = [
  rest.get<never, any>(`${BASE_URL}/grants`, (_req, res, ctx) => {
    return res(ctx.json(getGrantsData));
  }),
];
