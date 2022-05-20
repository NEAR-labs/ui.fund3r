import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import type { NextApiRequest } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
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
import { getGrantApplication } from '@/services/apiService';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import GrantApplicationForm from '@/components/grant-application-form/GrantApplicationForm';
import GrantApplicationDetails from '@/components/grant-application-details/GrantApplicationDetails';
import LoadingAnimation from '@/components/common/LoadingAnimation';

function GrantApplication() {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();
  const router = useRouter();
  const { id } = router.query;

  const [grantData, setGrantData] = useState<GrantApplicationInterface | undefined | null>(undefined);

  const { isLoading } = useQuery(['grant', apiSignature, id], () => getGrantApplication(apiSignature, id), {
    refetchOnWindowFocus: false,
    onSuccess: (grant) => {
      setGrantData(grant);
    },
  });

  const showForm = grantData;
  const showGrantData = grantData && grantData.dateSubmission;

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
              {showForm && !showGrantData && <GrantApplicationForm data={grantData} setData={setGrantData} />}
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
