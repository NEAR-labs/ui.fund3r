import { Paper, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function DetailsMilestonesProgress() {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={2} mb="lg">
        {t('details.milestones.title')}
      </Title>

      <Paper shadow="0" p="lg" radius="lg" withBorder mb="xl">
        Coming soon
      </Paper>
    </>
  );
}

export default DetailsMilestonesProgress;
