import { dehydrate, QueryClient } from 'react-query';
import { Container } from '@mantine/core';
import type { NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ParsedUrlQuery } from 'querystring';

import LoadingAnimation from '@/components/common/LoadingAnimation';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useGrant from '@/hooks/useGrant';
import DefaultLayout from '@/layouts/default';
import { getGrantApplication } from '@/services/apiService';
import parseCookies from '@/utilities/parseCookies';

function SubmitMilestone() {
  const router = useRouter();
  const { t } = useTranslation('milestone');
  const { grantRequestSlug } = router.query;

  if (typeof grantRequestSlug !== 'string') {
    throw new Error('Invalid URL');
  }

  const id = grantRequestSlug.split('-')[1];
  const numberId = parseInt(id as string, 10);

  const { isLoading } = useGrant(numberId, null);

  /*
    5 Cases to handle here
    - Previous milestone not submitted / Error
    - Already submitted / Error
    - Milestone does not exist / Error
    - Milestone form
    - Milestone submitted but not onchain
  */

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <NearAuthenticationGuardWithLoginRedirection>
          {isLoading ? <LoadingAnimation /> : <Container size="lg">Milestone submission form here</Container>}
        </NearAuthenticationGuardWithLoginRedirection>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale, params }: { req: NextApiRequest; locale: string; params: ParsedUrlQuery }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  const { grantRequestSlug } = params;

  if (typeof grantRequestSlug !== 'string') {
    return {
      notFound: true,
    };
  }

  const id = grantRequestSlug.split('-')[1];

  await queryClient.prefetchQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, id));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['milestone'])),
      dehydratedState,
    },
  };
}

export default SubmitMilestone;
