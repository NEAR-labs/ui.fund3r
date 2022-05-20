import useWallet from '../hooks/useWallet';

// eslint-disable-next-line @typescript-eslint/ban-types
function NearAuthenticationGuard({ children, loggedInCallback }: { children: JSX.Element; loggedInCallback: Function }) {
  const wallet = useWallet();

  if (wallet && wallet.isSignedIn()) {
    return children;
  } else {
    loggedInCallback();
    return null;
  }
}

export default NearAuthenticationGuard;
