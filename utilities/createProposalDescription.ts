import { APP_NAME } from '@/constants';

const createProposalDescription = (name: string, payoutNumber: number, projectDescription: string): string => {
  const description = payoutNumber === 0 ? projectDescription : `Milestone ${payoutNumber}`;
  return `[${APP_NAME} - Grant Request] ${name} #${payoutNumber} | ${description}`;
};

export default createProposalDescription;
