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
// import GrantProvider from '@/providers/GrantProvider';
import useGrant from '@/hooks/useGrant';

function GrantApplication() {
  const router = useRouter();
  const { t } = useTranslation('grant');
  const { id } = router.query;
  const { transactionHashes } = router.query;

  const { grant, setGrant, isLoading } = useGrant(id, transactionHashes);

  const showForm = grant;
  const showSubmitProposal = grant && grant.dateSubmission && !grant.isNearProposalValid;
  const showGrantData = grant && grant.dateSubmission && grant.isNearProposalValid;

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <NearAuthenticationGuardWithLoginRedirection>
          {/* <GrantProvider> */}
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <Container>
              {showForm && !showGrantData && !showSubmitProposal && <GrantApplicationForm data={grant} setData={setGrant} />}
              {showSubmitProposal && <GrantApplicationProposalSubmission data={grant} />}
              {showGrantData && <GrantApplicationDetails data={grant} />}
            </Container>
          )}
          {/* </GrantProvider> */}
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
