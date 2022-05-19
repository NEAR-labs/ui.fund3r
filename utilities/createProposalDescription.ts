import { APP_NAME } from '@/constants';

const createProposalDescription = (name: string, payoutNumber: number): string => {
  return `[${APP_NAME} - Grant Request] ${name} #${payoutNumber}`;
};

export default createProposalDescription;
