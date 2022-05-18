import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
// import { useTranslation } from 'next-i18next';
// import { Container } from '@mantine/core';

function GrantApplicationForm({ data }: { data: GrantApplicationInterface | undefined | null }) {
  //   const { t } = useTranslation('grant');
  console.log(data);

  return <span>Grant Application Form</span>;
}

export default GrantApplicationForm;
