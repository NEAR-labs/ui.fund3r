import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import StatusActionEvaluated from '@/components/grant-application-details/StatusActionEvaluated';
import StatusActionKycApproved from '@/components/grant-application-details/StatusActionKycApproved';
import StatusActionProposalSubmission from '@/components/grant-application-details/StatusActionProposalSubmission';
import StatusActionsMilestones from '@/components/grant-application-details/StatusActionsMilestones';
import { SKIP_EVALUATION_APPROVAL } from '@/config/grants';
import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

// eslint-disable-next-line max-lines-per-function
function DetailsStatusActions({
  id,
  email,
  firstname,
  lastname,
  dateInterview,
  helloSignRequestId,
  setGrant,
}: {
  id: number | undefined;
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  dateInterview: Date | string | undefined;
  helloSignRequestId: string | undefined;
  setGrant: (data: GrantApplicationInterface) => void;
}) {
  const { t } = useTranslation('grant');
  const { status } = useGrantStatus();

  const {
    SUBMITTED,
    EVALUATED,
    INTERVIEW_SCHEDULED,
    INTERVIEW_COMPLETED,
    DENIED,
    APPROVED,
    KYC_COMPLETED,
    KYC_DENIED,
    KYC_APPROVED,
    AGREEMENT_SIGNED,
    ONCHAIN_SUBMITTED,
    FIRST_PAYMENT_SENT,
    ONBOARDING_COMPLETED,
  } = STATUS;

  console.log(status);

  if (status === ONBOARDING_COMPLETED) {
    return <StatusActionsMilestones />;
  }

  if (status === FIRST_PAYMENT_SENT) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.first-payment-sent.message')}</Text>
      </Paper>
    );
  }

  if (status === AGREEMENT_SIGNED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.agreement-signed.message')}</Text>
      </Paper>
    );
  }

  if (status === KYC_APPROVED) {
    return <StatusActionKycApproved helloSignRequestId={helloSignRequestId} />;
  }

  if (status === KYC_DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-denied.message')}</Text>
        <Button color="violet">{t('details.status-actions.kyc-denied.button')}</Button>
      </Paper>
    );
  }

  if (status === KYC_COMPLETED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-completed.title')}</Text>
        <Text>{t('details.status-actions.kyc-completed.description')}</Text>
      </Paper>
    );
  }

  if (status === APPROVED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
        <Button color="violet">{t('details.status-actions.approved.button')}</Button>
      </Paper>
    );
  }

  if (status === DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.denied.message')}</Text>
      </Paper>
    );
  }

  if (status === INTERVIEW_COMPLETED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.title')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.message')}</Text>
        </Paper>
      </>
    );
  }

  if (status === INTERVIEW_SCHEDULED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.interview-scheduled.title')}</Text>
        <Text>{typeof dateInterview === 'string' ? dateInterview : dateInterview?.toISOString()}</Text>
      </Paper>
    );
  }

  if (status === EVALUATED) {
    return (
      <>
        {SKIP_EVALUATION_APPROVAL && (
          <Paper shadow="sm" p="lg" radius="lg" mt="xl">
            <Text>{t('details.status-actions.submitted.message')}</Text>
          </Paper>
        )}
        <StatusActionEvaluated id={id} email={email} firstname={firstname} lastname={lastname} setGrant={setGrant} />
      </>
    );
  }

  if (status === SUBMITTED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.message')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.description')}</Text>
        </Paper>
      </>
    );
  }
  return null;
}

export default DetailsStatusActions;
