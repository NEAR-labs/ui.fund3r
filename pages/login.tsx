import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useWallet from '@/modules/near-api-react/hooks/useWallet';
import DefaultLayout from '@/layouts/default';
import LoginContent from '@/components/login/LoginContent';
import LoadingAnimation from '@/components/common/LoadingAnimation';

function Login() {
  const { t } = useTranslation('login');

  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet && wallet.isSignedIn()) {
      router.push('/grants');
    }
  }, [wallet, router]);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        {wallet && wallet.isSignedIn() ? <LoadingAnimation /> : <LoginContent />}
      </>
    </DefaultLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
}

export default Login;
