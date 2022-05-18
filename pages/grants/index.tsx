import type { NextApiRequest } from 'next';
import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import DefaultLayout from '@/layouts/default';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { getAllGrantApplicationsOfUser } from '@/services/apiService';
import { parseCookies } from '@/utilities/parseCookies';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import { useAccountSignature } from '@/hooks/useAccountSignature';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Grants() {
  const router = useRouter();
  const { t } = useTranslation('grants');
  const apiSignature = useAccountSignature();
  const { data } = useQuery(['grants', apiSignature], () => getAllGrantApplicationsOfUser(apiSignature));

  // Since we currently don't handle multiple grants we will redirect to the first grant
  useEffect(() => {
    if (data && data.length > 0) {
      const grant = data[0];
      router.push(`/grants/${grant.nearId}-${grant.id}`);
    }
  }, [data]);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <NearAuthenticationGuardWithLoginRedirection>
          <>
            <Container>Grants</Container>
            <div>{data && data[0].nearId}</div>
          </>
        </NearAuthenticationGuardWithLoginRedirection>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale }: { req: NextApiRequest; locale: string }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  await queryClient.prefetchQuery(['grants', apiSignature], () => getAllGrantApplicationsOfUser(apiSignature));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grants'])),
      dehydratedState,
    },
  };
}

export default Grants;
