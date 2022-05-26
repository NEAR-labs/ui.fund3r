import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import { Paper, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { getNearUsdConvertRate } from '@/services/currencyConverter';
import { useQuery } from 'react-query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormSummary({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  const { t } = useTranslation('grant');

  const { data: usdNearConvertRate } = useQuery(['convertUsdToNear'], () => getNearUsdConvertRate(), {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Title order={2} mb="sm">
        {t('summary.schedule.title')}
      </Title>
      <Paper shadow="0" p="md" withBorder>
        <Text>1 NEAR = {usdNearConvertRate} USD</Text>
      </Paper>
    </>
  );
}

export default FormSummary;
