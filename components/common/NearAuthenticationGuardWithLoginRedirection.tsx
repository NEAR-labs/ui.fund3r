import { useRouter } from 'next/router';
import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';

function NearAuthenticationGuardWithLoginRedirection({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const redirectionCallBack = () => {
    router.push('/login');
  };

  return <NearAuthenticationGuard loggedInCallback={redirectionCallBack}>{children}</NearAuthenticationGuard>;
}

export default NearAuthenticationGuardWithLoginRedirection;
