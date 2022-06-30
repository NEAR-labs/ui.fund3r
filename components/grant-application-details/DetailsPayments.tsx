import { useState } from 'react';
import { Button, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import { downloadFile } from '@/services/invoiceService';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';

function DetailsPayments({ payments, grantId }: { payments: PaymentInterface[] | undefined; grantId: number | undefined }) {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();
  const [isLoading, setIsLoading] = useState(false);

  if (!payments) {
    return null;
  }

  const loadAndDownload = async (invoiceId: number) => {
    setIsLoading(true);
    await downloadFile(apiSignature, grantId, invoiceId);
    setIsLoading(false);
  };

  const paymentsItems = payments.map((payment, index) => {
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Paper key={payment._id} shadow="xs" radius="md" p="lg" mt="lg">
        <SimpleGrid cols={2}>
          <Title order={4} mb="lg">
            {t('details.payments.payment.title')} #{payment.milestoneNumber}
          </Title>
          <Text align="right">{t(`details.payments.payment.statuses.${payment.status}`)}</Text>
          <Text>{dayjs.default(payment.date).format('ddd, MMM D, YYYY')}</Text>
          <Button variant="light" color="gray" onClick={() => loadAndDownload(index)} loading={isLoading} disabled={isLoading}>
            {t('details.payments.payment.download')}
          </Button>
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
