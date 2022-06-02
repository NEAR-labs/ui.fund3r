import { SimpleGrid, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import FeedbackComment from '@/components/common/FeedbackComment';
import LabelValue from '@/components/common/LabelValue';

function DetailsMember({ github, twitter, reviewMemberDetail }: { github: string | undefined; twitter: string | undefined; reviewMemberDetail: string | undefined }) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.member.title')}
      </Title>
      {reviewMemberDetail && <FeedbackComment comment={reviewMemberDetail} />}
      <SimpleGrid cols={2}>
        <LabelValue label={t('form.github.label')} value={github} />
        <LabelValue label={t('form.twitter.label')} value={twitter} />
      </SimpleGrid>
    </>
  );
}

export default DetailsMember;
