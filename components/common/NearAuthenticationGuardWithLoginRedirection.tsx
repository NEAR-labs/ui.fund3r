import { useRouter } from 'next/router';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';
import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';
import LoadingAnimation from '@/components/common/LoadingAnimation';

function NearAuthenticationGuardWithLoginRedirection({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const wallet = useWallet();

  const redirectionCallBack = () => {
    router.push('/login');
  };

  if (!wallet) {
    return <LoadingAnimation />;
  }

  return <NearAuthenticationGuard loggedInCallback={redirectionCallBack}>{children}</NearAuthenticationGuard>;
}

export default NearAuthenticationGuardWithLoginRedirection;
