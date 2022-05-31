import { Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import type { PaymentInterface } from '@/types/GrantApplicationInterface';

function DetailsPayments({ payments }: { payments: PaymentInterface[] | undefined }) {
  const { t } = useTranslation('grant');

  if (!payments) {
    return null;
  }

  const paymentsItems = payments.map((payment) => {
    return (
      <Paper shadow="xs" radius="md" p="lg">
        <SimpleGrid cols={2}>
          <Title order={4} mb="lg">
            {t('details.payments.payment.title')} #{payment.id}
          </Title>
          <Text align="right">{t(`details.payments.payment.statuses.${payment.status}`)}</Text>
          <Text>{typeof payment.date === 'number' || typeof payment.date === 'string' ? payment.date : payment.date?.toDateString()}</Text>
          <div>&nbsp;</div>
          <Text>{t('details.payments.payment.amount')}</Text>
          <Text align="right">
            {payment.amount} {payment.currency}
          </Text>
        </SimpleGrid>
      </Paper>
    );
  });

  return <div>{paymentsItems}</div>;
}

export default DetailsPayments;
