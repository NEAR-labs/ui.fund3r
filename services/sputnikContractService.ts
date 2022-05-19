import createProposalDescription from '@/utilities/createProposalDescription';

const createPayoutProposal = async (contract, grantData, payoutNumber: number) => {
  const description = createProposalDescription(grantData.projectName, payoutNumber);
  const policy = await contract.get_policy();

  contract.add_proposal(
    {
      proposal: {
        description,
        kind: {
          Transfer: {
            token_id: '',
            receiver_id: grantData.nearId,
            amount: '10000',
          },
        },
      },
    },
    '30000000000000',
    policy.proposal_bond.toString(),
  );
};

// eslint-disable-next-line import/prefer-default-export
export { createPayoutProposal };
