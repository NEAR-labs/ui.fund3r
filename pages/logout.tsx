import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'next-i18next';
import { useEffect, useCallback } from 'react';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';
import DefaultLayout from '@/layouts/default';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import { useRouter } from 'next/router';

function Logout() {
  const { t } = useTranslation('logout');
  const wallet = useWallet();
  const router = useRouter();
  const [, , removeCookie] = useCookies([COOKIE_SIGNATURE_KEY]);

  const logout = useCallback(() => {
    wallet?.signOut();
    removeCookie(COOKIE_SIGNATURE_KEY);
    router.push('/');
  }, [wallet, router, removeCookie]);

  useEffect(() => {
    if (wallet) {
      logout();
    }
  }, [logout, wallet]);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <LoadingAnimation />
      </>
    </DefaultLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'logout'])),
    },
  };
}

export default Logout;
