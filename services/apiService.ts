import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getAllGrantApplicationsOfUser = async (signature: NearApiSignatureInterface | undefined): Promise<GrantApplicationInterface[]> => {
  if (!signature) {
    throw Error('getAllGrantApplicationsOfUser: signature not received');
  }

  const { data } = await axios.get(API_HOST + '/grants', {
    headers: {
      'NEAR-ACCOUNT-ID': signature.accountId,
      'NEAR-SIGNATURE': signature.signature,
    },
  });

  return data;
};

export { getAllGrantApplicationsOfUser };
