import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function StatusActionReload() {
  const { t } = useTranslation('grant');
  const router = useRouter();
  const { grantRequestSlug } = router.query;

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('errors.generic.message')}</Text>
      <Link href={`/grants/${grantRequestSlug}`} passHref>
        <Button component="a"  color="violet">
          {t('errors.generic.button')}
        </Button>
      </Link>
    </Paper>
  );
}

export default StatusActionReload;
