import { Divider, Space, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import LabelValue from '@/components/common/LabelValue';

import type { FormList } from '../../node_modules/@mantine/form/lib/form-list/form-list';

function DetailsMilestones({
  milestones,
  currency,
}: {
  milestones: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }> | undefined;
  currency: string | undefined;
}) {
  const { t } = useTranslation('grant');

  if (!milestones) {
    return <span />;
  }

  const milestonesComponents = milestones.map((milestone, index) => {
    return (
      <>
        <Divider mt="xl" mb="xl" />
        <div>
          <Title order={4} mb="lg">
            {t('details.project.milestone.title', { number: index + 1 })}
          </Title>
          <LabelValue label={t('details.project.milestone.budget')} value={`${milestone.budget?.toFixed(0)} ${currency}`} />
          {/* <LabelValue
            label={t('details.project.milestone.deliveryDate')}
            value={milestone.deliveryDate && typeof milestone.deliveryDate === 'string' ? milestone.deliveryDate : milestone.deliveryDate?.toDateString()}
          /> */}
          <Space h="md" />
          <LabelValue label={t('details.project.milestone.description')} value={milestone.description} />
        </div>
      </>
    );
  });

  return (
    <div>
      {milestonesComponents}
      <Divider mt="xl" mb="xl" />
    </div>
  );
}

export default DetailsMilestones;
