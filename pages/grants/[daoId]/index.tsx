import type { NextApiRequest } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from '@/layouts/default';
import { QueryClient, dehydrate } from 'react-query';
import parseCookies from '@/utilities/parseCookies';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import { getGrantApplication } from '@/services/apiService';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import GrantApplicationForm from '@/components/grant-application-form/GrantApplicationForm';
import GrantApplicationProposalSubmission from '@/components/grant-application-form/GrantApplicationProposalSubmission';
import GrantApplicationDetails from '@/components/grant-application-details/GrantApplicationDetails';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import useGrant from '@/hooks/useGrant';
import { useGrantStatus, STATUS } from '@/hooks/useGrantStatus';

function GrantApplication() {
  const router = useRouter();
  const { t } = useTranslation('grant');
  const { transactionHashes } = router.query;
  const { daoId } = router.query;

  if (typeof daoId !== 'string') {
    throw new Error('Invalid URL');
  }

  const id = daoId.split('-')[1];
  const numberId = parseInt(id as string, 10);

  console.log(router.query);

  const { grant, setGrant, isLoading } = useGrant(numberId, transactionHashes);
  const status = useGrantStatus();

  const { EDIT, OFFCHAIN_SUBMITTED, FULLY_SUBMITTED } = STATUS;

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
              {status === EDIT && <GrantApplicationForm data={grant} setData={setGrant} />}
              {status === OFFCHAIN_SUBMITTED && <GrantApplicationProposalSubmission data={grant} />}
              {status === FULLY_SUBMITTED && <GrantApplicationDetails data={grant} />}
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

  const { daoId } = params;

  if (typeof daoId !== 'string') {
    return {
      notFound: true,
    };
  }

  const id = daoId.split('-')[1];

  await queryClient.prefetchQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, id));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grant'])),
      dehydratedState,
    },
  };
}

export default GrantApplication;
