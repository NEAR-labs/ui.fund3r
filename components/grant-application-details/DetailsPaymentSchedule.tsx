import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import PaymentSchedule from '@/components/common/PaymentSchedule';

import type { FormList } from '../../node_modules/@mantine/form/lib/form-list/form-list';

function DetailsPaymentSchedule({
  milestones,
  fundingAmount,
  currency,
  projectLaunchDate,
}: {
  milestones: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }> | undefined;
  fundingAmount: number | undefined;
  currency: string | undefined;
  projectLaunchDate: Date | string | undefined;
}) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={2}>{t('details.payment-schedule.title')}</Title>
      <PaymentSchedule milestones={milestones} fundingAmount={fundingAmount} currency={currency} projectLaunchDate={projectLaunchDate} />
    </>
  );
}

export default DetailsPaymentSchedule;
