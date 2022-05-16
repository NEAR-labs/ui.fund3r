import NearAuthenticationGuard from '@/modules/near-api-react/utilities/NearAuthenticationGuard';

function NearAuthenticationGuardWithLoginRedirection({ children }: { children: JSX.Element }) {
  const redirectionCallBack = () => {
    alert('redirect here');
  };

  return <NearAuthenticationGuard loggedInCallback={redirectionCallBack}>{children}</NearAuthenticationGuard>;
}

export default NearAuthenticationGuardWithLoginRedirection;
