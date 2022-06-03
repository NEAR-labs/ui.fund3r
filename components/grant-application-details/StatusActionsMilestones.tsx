import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';

function StatusActionsMilestones() {
  const router = useRouter();
  const { t } = useTranslation('grant');
  const { grantRequestSlug } = router.query;

  const { currentMilestone, milestonesStatus } = useMilestonesStatus();

  if (!milestonesStatus || milestonesStatus.length === 0) {
    return null;
  }

  const { status } = milestonesStatus[currentMilestone];
  const number = currentMilestone + 1;

  if (status === MILESTONE_STATUS.STARTED) {
    // to move to a different component
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.milestones.waiting-submit.message', { number })}</Text>
        <Link href={`/grants/${grantRequestSlug}/milestones/${currentMilestone}`} passHref>
          <Button component="a" color="violet">
            {t('details.milestones.waiting-submit.button', { number })}
          </Button>
        </Link>
      </Paper>
    );
  }

  if (status === MILESTONE_STATUS.PARTLY_SUBMITTED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.milestones.waiting-blockchain.message')}</Text>
        <Button color="violet">{t('details.milestones.waiting-blockchain.button')}</Button>
      </Paper>
    );
  }

  if (status === MILESTONE_STATUS.SUBMIT) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.milestones.submitted.message', { number })}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.milestones.submitted.description', { number })}</Text>
        </Paper>
      </>
    );
  }

  if (status === MILESTONE_STATUS.REJECTED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.milestones.rejection.message')}</Text>
        </Paper>
        {/* To move to a different component */}
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text mb="sm">{t('details.milestones.waiting-submit.message', { number })}</Text>
          <Link href={`/grants/${grantRequestSlug}/milestones/${currentMilestone}`} passHref>
            <Button component="a" color="violet">
              {t('details.milestones.waiting-submit.button', { number })}
            </Button>
          </Link>
        </Paper>
      </>
    );
  }

  return null;
}

export default StatusActionsMilestones;
