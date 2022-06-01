import { Paper, Text, Timeline, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Check } from 'tabler-icons-react';

import { useGrantStatus } from '@/hooks/useGrantStatus';

function DetailsProcessOverview() {
  const { t } = useTranslation('grant');
  const { step } = useGrantStatus();

  console.log(step);

  return (
    <>
      <Title order={2} mb="lg">
        {t('details.process-overview.title')}
      </Title>

      <Paper shadow="0" p="lg" radius="lg" withBorder mb="xl">
        <Timeline active={step} bulletSize={24} lineWidth={2} color="violet">
          <Timeline.Item bullet={<Check size={12} />} title={t('details.process-overview.submit.title')} />
          <Timeline.Item bullet={step >= 1 && <Check size={12} />} title={t('details.process-overview.evaluation-approval.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.evaluation-approval.description')}
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={step >= 2 && <Check size={12} />} title={t('details.process-overview.acceptance.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.acceptance.description')}
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={step >= 3 && <Check size={12} />} title={t('details.process-overview.kyc.title')} />
          <Timeline.Item bullet={step >= 4 && <Check size={12} />} title={t('details.process-overview.agreement.title')} />
          <Timeline.Item bullet={step >= 5 && <Check size={12} />} title={t('details.process-overview.payout.title')} />
          <Timeline.Item bullet={step >= 6 && <Check size={12} />} title={t('details.process-overview.onboarding.title')}>
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
