import { APP_NAME } from '@/constants';

const createProposalDescription = (name: string, payoutNumber: number, projectDescription: string): string => {
  return `[${APP_NAME} - Grant Request] ${name} #${payoutNumber} | ${projectDescription}`;
};

export default createProposalDescription;
