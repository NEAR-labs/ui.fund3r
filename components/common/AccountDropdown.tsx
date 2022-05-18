import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useCallback } from 'react';
import Link from 'next/link';
import { Divider, Button, Menu, useMantineTheme } from '@mantine/core';
import { Checklist, ChevronDown, Logout, UserCircle } from 'tabler-icons-react';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';
import { useTranslation } from 'next-i18next';
import styles from '@/styles/AccountDropdown.module.css';
import { COOKIE_SIGNATURE_KEY } from '@/constants';

function AccountDropdown() {
  const theme = useMantineTheme();
  const wallet = useWallet();
  const { t } = useTranslation('common');
  const router = useRouter();
  const [, , removeCookie] = useCookies([COOKIE_SIGNATURE_KEY]);

  const logout = useCallback(() => {
    wallet?.signOut();
    removeCookie(COOKIE_SIGNATURE_KEY);
    router.push('/');
  }, [wallet, router, removeCookie]);

  return (
    <Menu
      control={
        <Button rightIcon={<ChevronDown size={18} />} sx={{ paddingRight: 12 }} variant="light" color="indigo" radius="xl">
          <UserCircle size={22} color="#4c6ef5" />
          &nbsp; {wallet && wallet.isSignedIn() && wallet.getAccountId()}
        </Button>
      }
      transition="pop-top-right"
      placement="end"
      size="lg"
    >
      <Link href="/grants" passHref>
        <Menu.Item component="a" icon={<Checklist size={16} color={theme.colors.violet[6]} />} className={styles.linkmenu}>
          {t('navbar.applications')}
        </Menu.Item>
      </Link>
      <Divider />
      <Menu.Item icon={<Logout size={16} color={theme.colors.red[6]} />} onClick={logout}>
        {t('navbar.signout')}
      </Menu.Item>
    </Menu>
  );
}

export default AccountDropdown;
