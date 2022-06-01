import { useQuery } from 'react-query';
import { Divider, Paper, SimpleGrid, Text, Timeline } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DEFAULT_CURRENCY from '@/config/currency';
import { getNearUsdConvertRate } from '@/services/currencyConverter';

import type { FormList } from '../../node_modules/@mantine/form/lib/form-list/form-list';

function GrantMilestoneOverview({
  milestones,
  fundingAmount,
  currency = DEFAULT_CURRENCY,
  projectLaunchDate,
}: {
  milestones: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }> | undefined;
  fundingAmount: number | undefined;
  currency: string | undefined;
  projectLaunchDate: Date | string | undefined;
}) {
  const { t } = useTranslation('grant');

  const { data: usdNearConvertRate } = useQuery(['convertUsdToNear'], () => getNearUsdConvertRate(), {
    refetchOnWindowFocus: false,
  });

  const timelineItems = milestones?.map((milestone, index) => {
    const { budget, deliveryDate } = milestone;

    return (
      <Timeline.Item title={t('details.project.milestone.title', { number: index + 1 })}>
        <SimpleGrid cols={2}>
          <Text color="dimmed" size="sm">
            {typeof deliveryDate === 'number' || typeof deliveryDate === 'string' ? deliveryDate : deliveryDate?.toDateString()}
          </Text>
          <Text color="dimmed" size="sm" align="right">
            {budget} {currency}
          </Text>
          <div>&nbsp;</div>
          <Text color="dimmed" size="sm" align="right">
            ≈ {((budget || 0) / (usdNearConvertRate || 1)).toFixed(2)} NEAR
          </Text>
        </SimpleGrid>
      </Timeline.Item>
    );
  });

  const totalMilestones = milestones?.reduce((acc, milestone) => acc + (milestone.budget || 0), 0);
  const initialBudget = (fundingAmount || 0) - (totalMilestones || 0);

  return (
    <Paper shadow="0" p="lg" radius="lg" withBorder mt="xl">
      <Timeline bulletSize={24} lineWidth={2} color="violet">
        <Timeline.Item title={t('details.payment-schedule.launch')}>
          <SimpleGrid cols={2}>
            <Text color="dimmed" size="sm">
              {typeof projectLaunchDate === 'number' || typeof projectLaunchDate === 'string' ? projectLaunchDate : projectLaunchDate?.toDateString()}
            </Text>
            <Text color="dimmed" size="sm" align="right">
              {initialBudget} {currency}
            </Text>
            <div>&nbsp;</div>
            <Text color="dimmed" size="sm" align="right">
              ≈ {(initialBudget / (usdNearConvertRate || 1)).toFixed(2)} NEAR
            </Text>
          </SimpleGrid>
        </Timeline.Item>
        {timelineItems}
      </Timeline>
      <Divider mt="md" mb="md" />
      <SimpleGrid cols={2}>
        <Text weight="bold">{t('details.payment-schedule.total')}</Text>
        <Text color="dimmed" size="sm" align="right">
          {fundingAmount || 0} {currency}
        </Text>
        <div>&nbsp;</div>
        <Text color="dimmed" size="sm" align="right">
          ≈ {((fundingAmount || 0) / (usdNearConvertRate || 1)).toFixed(2)} NEAR
        </Text>
      </SimpleGrid>
    </Paper>
  );
}

export default GrantMilestoneOverview;
