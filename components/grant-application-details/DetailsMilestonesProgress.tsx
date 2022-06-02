import { Paper, Timeline, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { useMilestonesStatus } from '@/hooks/useMilestonesStatus';

function DetailsMilestonesProgress() {
  const { t } = useTranslation('grant');

  const { currentMilestone, milestonesStatus } = useMilestonesStatus();

  if (!milestonesStatus || milestonesStatus.length === 0) {
    return null;
  }

  const milestoneTimelines = milestonesStatus.map((milestone, index) => {
    return (
      <Timeline.Item title={t('details.milestones.milestone.working', { number: index + 1 })}>
        {currentMilestone === index && (
          <Timeline active={1} bulletSize={24} lineWidth={2} mt="lg">
            <Timeline.Item title={t('details.milestones.milestone.status.submit')} />
            <Timeline.Item title={t('details.milestones.milestone.status.review')} />
            <Timeline.Item title={t('details.milestones.milestone.status.payout')} />
          </Timeline>
        )}
      </Timeline.Item>
    );
  });

  return (
    <>
      <Title order={2} mb="lg">
        {t('details.milestones.title')}
      </Title>

      <Paper shadow="0" p="lg" radius="lg" withBorder mb="xl">
        <Timeline active={currentMilestone} bulletSize={24} lineWidth={2}>
          {milestoneTimelines}
        </Timeline>
      </Paper>
    </>
  );
}

export default DetailsMilestonesProgress;
