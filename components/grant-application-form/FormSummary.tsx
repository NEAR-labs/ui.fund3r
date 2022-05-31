// import { useQuery } from 'react-query';
import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import PaymentSchedule from '@/components/common/PaymentSchedule';
// import { getNearUsdConvertRate } from '@/services/currencyConverter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormSummary({ data }: { data: any }) {
  const { t } = useTranslation('grant');

  // const { data: usdNearConvertRate } = useQuery(['convertUsdToNear'], () => getNearUsdConvertRate(), {
  //   refetchOnWindowFocus: false,
  // });

  return (
    <>
      <Title order={2} mb="sm">
        {t('summary.schedule.title')}
      </Title>
      <PaymentSchedule milestones={data?.milestones} fundingAmount={data?.fundingAmount} currency={data?.currency} projectLaunchDate={data?.projectLaunchDate} />
      {/* <Paper shadow="0" p="lg" radius="lg" withBorder>
        <Text>1 NEAR = {usdNearConvertRate} USD</Text>
      </Paper> */}
    </>
  );
}

export default FormSummary;
