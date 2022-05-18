import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { rest } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getGrantsData = (accountId: string): GrantApplicationInterface[] => [{ id: 1, nearId: accountId }];

export const handlers = [
  rest.get<never, any>(`${BASE_URL}/grants`, (_req, res, ctx) => {
    return res(ctx.json(getGrantsData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string)));
  }),
];
