import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { rest } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getGrantsData = (accountId: string): GrantApplicationInterface[] => [{ id: 0, nearId: accountId }];

const getGrantData = (accountId: string, id: number): GrantApplicationInterface => {
  return [
    { id: 0, nearId: accountId },
    {
      id: 1,
      nearId: accountId,
    },
  ][id];
};

export const handlers = [
  // The backend will verify the signature following this https://stackoverflow.com/questions/61982163/jwt-authentication-for-near-protocol-in-a-python-backend
  // It will retrieve the grants from the database
  // If there is no grant, it will create a new one and return an array of grants
  rest.get<never, any>(`${BASE_URL}/grants`, (_req, res, ctx) => {
    return res(ctx.json(getGrantsData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string)));
  }),

  rest.get<never, any>(`${BASE_URL}/grants/:accountId-:id`, (_req, res, ctx) => {
    return res(ctx.json(getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id))));
  }),
];
