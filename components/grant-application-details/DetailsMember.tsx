import { SimpleGrid, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import LabelValue from '@/components/common/LabelValue';

function DetailsMember({ github, twitter }: { github: string | undefined; twitter: string | undefined }) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={3} mb="lg">
        {t('details.member.title')}
      </Title>
      <SimpleGrid cols={2}>
        <LabelValue label={t('form.github.label')} value={github} />
        <LabelValue label={t('form.twitter.label')} value={twitter} />
      </SimpleGrid>
    </>
  );
}

export default DetailsMember;
