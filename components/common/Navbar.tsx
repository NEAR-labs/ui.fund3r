import Image from 'next/image';
import Link from 'next/link';
import { createStyles, Header, Container, Group, Burger, Button } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  branding: {
    display: 'inline-flex',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25) : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

function Navbar() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Link href="/">
          <a className={classes.branding}>
            <Image src="/images/logo.svg" height={30} width={100} />
          </a>
        </Link>
        <Group spacing={5} className={classes.links}>
          <Link href="/grants" passHref>
            <Button component="a" variant="light" color="violet">
              {t('navbar.call_to_action')}
            </Button>
          </Link>
        </Group>
        <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}

export default Navbar;
