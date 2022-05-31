import { Divider, Paper, SimpleGrid, Text, Timeline } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import type { FormList } from '../../node_modules/@mantine/form/lib/form-list/form-list';

function GrantMilestoneOverview({
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
        </SimpleGrid>
      </Timeline.Item>
    );
  });

  return (
    <Paper shadow="0" p="lg" radius="lg" withBorder mt="xl">
      <Timeline bulletSize={24} lineWidth={2} color="violet">
        <Timeline.Item title={t('details.payment-schedule.launch')}>
          <SimpleGrid cols={2}>
            <Text color="dimmed" size="sm">
              {typeof projectLaunchDate === 'number' || typeof projectLaunchDate === 'string' ? projectLaunchDate : projectLaunchDate?.toDateString()}
            </Text>
            <Text color="dimmed" size="sm" align="right">
              {fundingAmount} {currency}
            </Text>
          </SimpleGrid>
        </Timeline.Item>
        {timelineItems}
      </Timeline>
      <Divider mt="md" mb="md" />
      <SimpleGrid cols={2}>
        <Text weight="bold">{t('details.payment-schedule.total')}</Text>
        <Text color="dimmed" size="sm" align="right">
          {fundingAmount} {currency}
        </Text>
      </SimpleGrid>
    </Paper>
  );
}

export default GrantMilestoneOverview;
