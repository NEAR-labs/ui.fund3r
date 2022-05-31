import { Paper, Text, Timeline, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Check } from 'tabler-icons-react';

function DetailsProcessOverview() {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={2} mb="lg">
        {t('details.process-overview.title')}
      </Title>

      <Paper shadow="0" p="lg" radius="lg" withBorder>
        <Timeline active={0} bulletSize={24} lineWidth={2} color="violet">
          <Timeline.Item bullet={<Check size={12} />} title={t('details.process-overview.submit.title')} />
          <Timeline.Item title={t('details.process-overview.evaluation-approval.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.evaluation-approval.description')}
            </Text>
          </Timeline.Item>
          <Timeline.Item title={t('details.process-overview.acceptance.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.acceptance.description')}
            </Text>
          </Timeline.Item>
          <Timeline.Item title={t('details.process-overview.kyc.title')} />
          <Timeline.Item title={t('details.process-overview.agreement.title')} />
          <Timeline.Item title={t('details.process-overview.payout.title')} />
          <Timeline.Item title={t('details.process-overview.onboarding.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.onboarding.description')}
            </Text>
          </Timeline.Item>
        </Timeline>
      </Paper>
    </>
  );
}

export default DetailsProcessOverview;
