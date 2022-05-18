import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useAccountSignature } from '@/hooks/useAccountSignature';
import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';
import { COOKIE_SIGNATURE_KEY, COOKIE_EXPIRACY_TIME } from '@/constants';

function NearAuthenticationGuardWithLoginRedirection({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const [, setCookie] = useCookies([COOKIE_SIGNATURE_KEY]);
  const apiSignature = useAccountSignature();

  useEffect(() => {
    if (apiSignature) {
      setCookie(COOKIE_SIGNATURE_KEY, JSON.stringify(apiSignature), {
        path: '/',
        maxAge: COOKIE_EXPIRACY_TIME,
        sameSite: true,
      });
    }
  }, [apiSignature]);

  const redirectionCallBack = () => {
    router.push('/login');
  };

  return <NearAuthenticationGuard loggedInCallback={redirectionCallBack}>{children}</NearAuthenticationGuard>;
}

export default NearAuthenticationGuardWithLoginRedirection;
