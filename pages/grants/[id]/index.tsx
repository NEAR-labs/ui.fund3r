import type { NextApiRequest } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from '@/layouts/default';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { parseCookies } from '@/utilities/parseCookies';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import { useAccountSignature } from '@/hooks/useAccountSignature';
import { getGrantApplication } from '@/services/apiService';

function GrantApplication() {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, id));

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <Container>{data?.nearId}</Container>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale, params }: { req: NextApiRequest; locale: string; params: ParsedUrlQuery }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  await queryClient.prefetchQuery(['grants', apiSignature], () => getGrantApplication(apiSignature, params.id));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grant'])),
      dehydratedState,
    },
  };
}

export default GrantApplication;
