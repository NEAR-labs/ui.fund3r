// import { useTranslation } from 'next-i18next';
import FeedbackComment from '@/components/common/FeedbackComment';

// THIS COMPONENT WILL BE IMPLEMENTED LATER
function DetailsAttachment({ reviewAttachments }: { reviewAttachments: string | undefined }) {
  //   const { t } = useTranslation('grant');

  return (
    <>
      {reviewAttachments && <FeedbackComment comment={reviewAttachments} />}
      <span>DetailsAttachment</span>
    </>
  );
}

export default DetailsAttachment;
