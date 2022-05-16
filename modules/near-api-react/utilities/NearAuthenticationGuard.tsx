import { useWallet } from '../hooks/useWallet';

function NearAuthenticationGuard({ children, loggedInCallback = () => {} }: { children: JSX.Element; loggedInCallback: Function }) {
  const wallet = useWallet();

  if (wallet && wallet.isSignedIn()) {
    return children;
  } else {
    loggedInCallback();
    return <></>;
  }
}

export default NearAuthenticationGuard;
