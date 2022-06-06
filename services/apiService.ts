import axios from 'axios';
import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';

import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import type MilestoneInterface from '@/types/MilestoneInterface';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getAllGrantApplicationsOfUser = async (signature: NearApiSignatureInterface | undefined): Promise<GrantApplicationInterface[] | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/grants`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const getGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  grantId: number | string[] | string | undefined,
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/grants/${grantId}`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const saveGrantApplicationAsDraft = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signStringMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    signStringMessage: (stringMessage: string) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const stringifiedGrantData = JSON.stringify(grantData);
  // todo: the following should be replaced by a hash function, issue #34
  const hash = stringifiedGrantData.slice(0, 10);
  const signedHash = signStringMessage(hash);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/draft`,
    {
      grantData,
      hash,
      signedHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signStringMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    signStringMessage: (stringMessage: string) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  await saveGrantApplicationAsDraft(signature, {
    grantId,
    grantData,
    signStringMessage,
  });

  const stringifiedGrantData = JSON.stringify(grantData);
  // todo: the following should be replaced by a hash function, issue #34
  const hash = stringifiedGrantData.slice(0, 10);
  const signedHash = signStringMessage(hash);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/submit`,
    {
      hash,
      signedHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const validateNearTransactionHash = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    proposalNearTransactionHash,
  }: {
    grantId: number | undefined;
    proposalNearTransactionHash: string | string[] | null | undefined;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !proposalNearTransactionHash) {
    return null;
  }

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/near-transactions`,
    {
      proposalNearTransactionHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitCalendlyUrl = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    calendlyUrl,
    signStringMessage,
  }: {
    grantId: number | undefined;
    calendlyUrl: string | null | undefined;
    signStringMessage: (stringMessage: string) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const signedCalendlyUrl = calendlyUrl && signStringMessage(calendlyUrl);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/calendly/interview`,
    {
      grantId,
      calendlyUrl,
      signedCalendlyUrl,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitMilestoneData = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    milestoneId,
    milestoneData,
    signObjectMessage,
  }: {
    grantId: number | undefined;
    milestoneId: number | undefined;
    milestoneData: MilestoneInterface;
    signObjectMessage: (stringMessage: unknown) => Promise<Uint8Array | undefined | null>;
  },
) => {
  if (!signature) {
    return null;
  }

  const signedData = signObjectMessage(milestoneData);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/milestones/${milestoneId}`,
    {
      milestoneId,
      signedData,
      milestoneData,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const validateMilestoneNearTransactionHash = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    milestoneId,
    proposalNearTransactionHash,
  }: {
    grantId: number | undefined;
    milestoneId: number | undefined;
    proposalNearTransactionHash: string | string[] | null | undefined;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !proposalNearTransactionHash) {
    return null;
  }

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/milestones/${milestoneId}/near-transactions`,
    {
      proposalNearTransactionHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

// const submitMilestoneAttachment = async (signature: NearApiSignatureInterface | undefined, data: any) => {};

// const submitGrantAttachment = async (signature: NearApiSignatureInterface | undefined, data: any) => {};

export {
  getAllGrantApplicationsOfUser,
  getGrantApplication,
  saveGrantApplicationAsDraft,
  submitCalendlyUrl,
  submitGrantApplication,
  submitMilestoneData,
  validateMilestoneNearTransactionHash,
  validateNearTransactionHash,
  // submitMilestoneAttachment,
  // submitGrantAttachment,
};
