import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useSigner } from '@/modules/near-api-react/hooks/useSigner';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';
import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';
import { COOKIE_SIGNATURE_KEY, COOKIE_EXPIRACY_TIME } from '@/constants';

function NearAuthenticationGuardWithLoginRedirection({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const wallet = useWallet();
  const [, setCookie] = useCookies([COOKIE_SIGNATURE_KEY]);
  const { signStringMessage } = useSigner();

  useEffect(() => {
    if (wallet && wallet.isSignedIn() && signStringMessage) {
      const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();
      signStringMessage(accountId).then((signature) => {
        setCookie(COOKIE_SIGNATURE_KEY, JSON.stringify({ signature, accountId }), {
          path: '/',
          maxAge: COOKIE_EXPIRACY_TIME,
          sameSite: true,
        });
      });
    }
  }, [wallet]);

  const redirectionCallBack = () => {
    router.push('/login');
  };

  return <NearAuthenticationGuard loggedInCallback={redirectionCallBack}>{children}</NearAuthenticationGuard>;
}

export default NearAuthenticationGuardWithLoginRedirection;
