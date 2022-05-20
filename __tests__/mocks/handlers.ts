import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { rest } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;
const GET_DELAY = process.env.NEXT_PUBLIC_MOCK_DELAY_GET ? parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY_GET, 10) : 0;
const POST_PUT_DELAY = process.env.NEXT_PUBLIC_MOCK_DELAY_POST_PUT ? parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY_POST_PUT, 10) : 0;

const getGrantsData = (accountId: string): GrantApplicationInterface[] => [{ id: 0, nearId: accountId }];

const getGrantData = (accountId: string, id: number): GrantApplicationInterface => {
  return [
    { id: 0, nearId: accountId },
    {
      id: 1,
      nearId: accountId,
      dateLastDraftSaving: new Date(),
    },
  ][id];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const handlers = [
  // The backend will verify the signature following this https://stackoverflow.com/questions/61982163/jwt-authentication-for-near-protocol-in-a-python-backend
  // It will retrieve the grants from the database
  // If there is no grant, it will create a new one and return an array of grants
  rest.get<never, any>(`${BASE_URL}/grants`, (_req, res, ctx) => {
    return res(ctx.delay(GET_DELAY), ctx.json(getGrantsData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string)));
  }),

  rest.get<never, any>(`${BASE_URL}/grants/:accountId-:id`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const response = {
      ...basicData,
    };

    if (localStorage.getItem('fund3r-mock-sumission') === 'true') {
      response.dateSubmission = new Date();
    }

    return res(ctx.delay(GET_DELAY), ctx.json(response));
  }),

  rest.put<never, any>(`${BASE_URL}/grants/:id/draft`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));
    const response = {
      ...basicData,
    };

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  rest.put<never, any>(`${BASE_URL}/grants/:id/submit`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const response = {
      ...basicData,
      dateSubmission: new Date(),
      projectName: 'Mocked Dummy Project',
      projectDescription: 'Mocked Dummy Project Description',
      nearFundingAmount: '10000000000000',
    };

    localStorage.setItem('fund3r-mock-sumission', 'true');

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // todo
  rest.post<never, any>(`${BASE_URL}/grants/:id/milestone/:milestoneId`, (_req, res, ctx) => {
    return res(ctx.delay(POST_PUT_DELAY), ctx.json({ todo: true }));
  }),

  // todo
  rest.post<never, any>(`${BASE_URL}/grants/:id/milestone/:milestoneId/attachment`, (_req, res, ctx) => {
    return res(ctx.delay(POST_PUT_DELAY), ctx.json({ todo: true }));
  }),

  // todo
  rest.post<never, any>(`${BASE_URL}/grants/:id/attachment`, (_req, res, ctx) => {
    return res(ctx.delay(POST_PUT_DELAY), ctx.json({ todo: true }));
  }),
];

export default handlers;
