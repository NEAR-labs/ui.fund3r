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

  // when dateSubmission is true, the backend should check if a proposal really exists
  // maybe we should share the tx id or we can check all the proposals in a dao (?)
  rest.get<never, any>(`${BASE_URL}/grants/:id`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const nearFundingAmount: BigInt = dummyData && dummyData.fundingAmount ? BigInt((dummyData.fundingAmount / 5.95) * 10 ** 24) : BigInt(0);

    const response = {
      ...basicData,
    };

    if (localStorage.getItem('fund3r-mock-submission')) {
      response.dateSubmission = new Date();
      response.projectName = dummyData.projectName || 'Mocked Dummy Project';
      response.projectDescription = dummyData.projectDescription || 'Mocked Dummy Project Description';
      response.nearFundingAmount = nearFundingAmount.toString();
    }

    if (localStorage.getItem('fund3r-mock-near-tx') === 'true') {
      response.isNearProposalValid = true;
    }

    return res(ctx.delay(GET_DELAY), ctx.json(response));
  }),

  rest.put<never, any>(`${BASE_URL}/grants/:id/draft`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));
    const { grantData } = _req.body;

    const response = {
      ...basicData,
      ...grantData,
    };

    localStorage.setItem('fund3r-mock-data', JSON.stringify(grantData));

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  rest.put<never, any>(`${BASE_URL}/grants/:id/submit`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const nearFundingAmount: BigInt = dummyData && dummyData.fundingAmount ? BigInt((dummyData.fundingAmount / 5.95) * 10 ** 24) : BigInt(0);

    const response = {
      ...basicData,
      dateSubmission: new Date(),
      projectName: dummyData.projectName || 'Mocked Dummy Project',
      projectDescription: dummyData.projectDescription || 'Mocked Dummy Project Description',
      nearFundingAmount: nearFundingAmount.toString(),
    };

    localStorage.setItem('fund3r-mock-submission', 'true');

    // uncomment below for testing error management
    // start
    // return res(
    //   ctx.status(400),
    //   ctx.json({
    //     ...response,
    //     errors: {
    //       projectName: 'Please enter a project name that is at least 3 characters long.',
    //     },
    //   }),
    // );
    // end

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // When this endpoint is called the backend should verify that the transaction hash is matching the grant
  rest.put<never, any>(`${BASE_URL}/grants/:id/near-transactions`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));
    const { proposalNearTransactionHash } = _req.body;

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const nearFundingAmount: BigInt = BigInt((dummyData.fundingAmount / 5.95) * 10 ** 24);

    const response = {
      ...basicData,
      dateSubmission: new Date(),
      projectName: dummyData.projectName || 'Mocked Dummy Project',
      projectDescription: dummyData.projectDescription || 'Mocked Dummy Project Description',
      nearFundingAmount: nearFundingAmount.toString(),
      proposalNearTransactionHash,
      isNearProposalValid: true,
    };

    localStorage.setItem('fund3r-mock-near-tx', 'true');

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
