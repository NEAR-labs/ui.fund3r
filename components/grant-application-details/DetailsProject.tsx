import { SimpleGrid, Spoiler } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import LabelValue from '@/components/common/LabelValue';

function DetailsProject({
  projectDescription,
  fundingAmount,
  currency,
  projectLaunchDate,
  projectUrl,
  githubUrl,
}: {
  projectDescription: string | undefined;
  fundingAmount: number | undefined;
  currency: string | undefined;
  projectLaunchDate: Date | string | undefined;
  projectUrl: string | undefined;
  githubUrl: string | undefined;
}) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Spoiler mb="xl" maxHeight={120} showLabel={t('details.common.show_more')} hideLabel={t('details.common.show_less')}>
        {projectDescription}
      </Spoiler>
      <SimpleGrid cols={2}>
        <LabelValue label={t('details.project.requested')} value={`${fundingAmount?.toFixed(0)} ${currency}`} />
        <LabelValue label={t('details.project.launch')} value={typeof projectLaunchDate === 'string' ? projectLaunchDate : projectLaunchDate?.toDateString()} />
        <LabelValue label={t('details.project.project-url')} value={projectUrl} />
        <LabelValue label={t('details.project.github-url')} value={githubUrl} />
      </SimpleGrid>
    </>
  );
}

export default DetailsProject;
