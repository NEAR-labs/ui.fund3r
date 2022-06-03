import { Paper, Timeline, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Check, Clock } from 'tabler-icons-react';

import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';

function DetailsMilestonesProgress() {
  const { t } = useTranslation('grant');

  const { currentMilestone, milestonesStatus } = useMilestonesStatus();

  if (!milestonesStatus || milestonesStatus.length === 0) {
    return null;
  }

  // const getIcon = (timelineStep: number, currentStep: number, pendingStep?: number) => {
  //   if (timelineStep === pendingStep) {
  //     return <Clock size={12} />;
  //   }

  //   if (currentStep >= timelineStep) {
  //     return <Check size={12} />;
  //   }

  //   return null;
  // };

  const getIconMilestone = (milestoneNumber: number, status?: string | null) => {
    if (milestoneNumber > currentMilestone) {
      return null;
    }

    if (status === MILESTONE_STATUS.STARTED) {
      return <Clock size={12} />;
    } else {
      return <Check size={12} />;
    }
  };

  const milestoneTimelines = milestonesStatus.map((milestone, index) => {
    return (
      <Timeline.Item bullet={getIconMilestone(index, milestone.status)} title={t('details.milestones.milestone.working', { number: index + 1 })}>
        {currentMilestone === index && (
          <Timeline active={milestone.step || 0} bulletSize={24} lineWidth={2} mt="lg">
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
