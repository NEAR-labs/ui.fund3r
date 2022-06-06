import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function MilestoneForm({ grantId, milestoneId }: { grantId: number; milestoneId: number }) {
  const { t } = useTranslation('milestone');

  const milestoneNumber = milestoneId + 1;

  return (
    <div>
      <Title>{t('form.title', { number: milestoneNumber })}</Title>
    </div>
  );
}

export default MilestoneForm;
