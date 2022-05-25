import type SputnikContractInterface from '@/types/SputnikContractInterface';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import createProposalDescription from '@/utilities/createProposalDescription';

const createPayoutProposal = async (contract: SputnikContractInterface, grantData: GrantApplicationInterface, payoutNumber: number) => {
  const description = createProposalDescription(grantData.projectName || '', payoutNumber, grantData.projectDescription || '');

  if (contract.get_policy && contract.add_proposal) {
    const policy = await contract.get_policy();

    contract.add_proposal(
      {
        proposal: {
          description,
          kind: {
            Transfer: {
              token_id: '',
              receiver_id: grantData.nearId,
              amount: grantData.nearFundingAmount,
            },
          },
        },
      },
      '30000000000000',
      policy.proposal_bond.toString(),
    );
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createPayoutProposal };
