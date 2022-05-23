/* eslint-disable max-lines-per-function */
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import type { NextApiRequest } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from '@/layouts/default';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import parseCookies from '@/utilities/parseCookies';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useAccountSignature from '@/hooks/useAccountSignature';
import { getGrantApplication, validateNearTransactionHash } from '@/services/apiService';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import GrantApplicationForm from '@/components/grant-application-form/GrantApplicationForm';
import GrantApplicationProposalSubmission from '@/components/grant-application-form/GrantApplicationProposalSubmission';
import GrantApplicationDetails from '@/components/grant-application-details/GrantApplicationDetails';
import LoadingAnimation from '@/components/common/LoadingAnimation';

function GrantApplication() {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();
  const router = useRouter();
  const { id } = router.query;
  const { transactionHashes } = router.query;

  const [grantData, setGrantData] = useState<GrantApplicationInterface | undefined | null>(undefined);

  const { isLoading: isGrantLoading } = useQuery(['grant', apiSignature, id], () => getGrantApplication(apiSignature, id), {
    refetchOnWindowFocus: false,
    onSuccess: (grant) => {
      setGrantData(grant);
    },
  });

  const { isLoading: isValidatingTransactionHash, refetch: validateTransactionHash } = useQuery(
    ['validate-transaction-hash', apiSignature, id],
    () => {
      return validateNearTransactionHash(apiSignature, { grantId: id, proposalNearTransactionHash: transactionHashes });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (grant) => {
        setGrantData(grant);
      },
    },
  );

  useEffect(() => {
    if (transactionHashes) {
      setTimeout(() => {
        validateTransactionHash();
      }, 1);
    }
  }, [transactionHashes, validateTransactionHash]);

  const showForm = grantData;
  const showSubmitProposal = grantData && grantData.dateSubmission && !grantData.isNearProposalValid;
  const showGrantData = grantData && grantData.dateSubmission && grantData.isNearProposalValid;
  const isLoading = isGrantLoading || isValidatingTransactionHash;

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <NearAuthenticationGuardWithLoginRedirection>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <Container>
              {showForm && !showGrantData && !showSubmitProposal && <GrantApplicationForm data={grantData} setData={setGrantData} />}
              {showSubmitProposal && <GrantApplicationProposalSubmission data={grantData} />}
              {showGrantData && <GrantApplicationDetails data={grantData} />}
            </Container>
          )}
        </NearAuthenticationGuardWithLoginRedirection>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale, params }: { req: NextApiRequest; locale: string; params: ParsedUrlQuery }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  await queryClient.prefetchQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, params.id));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grant'])),
      dehydratedState,
    },
  };
}

export default GrantApplication;
