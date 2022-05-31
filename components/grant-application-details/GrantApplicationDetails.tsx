import { Grid, Tabs } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DetailsAddress from '@/components/grant-application-details/DetailsAddress';
import DetailsAttachment from '@/components/grant-application-details/DetailsAttachment';
import DetailsHeader from '@/components/grant-application-details/DetailsHeader';
import DetailsMember from '@/components/grant-application-details/DetailsMember';
import DetailsPayments from '@/components/grant-application-details/DetailsPayments';
import DetailsPaymentSchedule from '@/components/grant-application-details/DetailsPaymentSchedule';
import DetailsProcessOverview from '@/components/grant-application-details/DetailsProcessOverview';
import DetailsProject from '@/components/grant-application-details/DetailsProject';
import DetailsStatusActions from '@/components/grant-application-details/DetailsStatusActions';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function GrantApplicationDetails({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');

  return (
    <Grid gutter="xl" mb="xl">
      <Grid.Col span={8}>
        <DetailsHeader
          projectName={data?.projectName}
          email={data?.email}
          firstname={data?.firstname}
          lastname={data?.lastname}
          grantCategory={data?.grantCategory}
          grantType={data?.grantType}
          openSourceState={data?.openSourceState}
        />
        <br />
        <br />
        <br />
        <DetailsStatusActions />
        <br />
        <br />
        <br />
        <Tabs color="violet" tabPadding="xl">
          <Tabs.Tab label={t('details.project.tab')}>
            <DetailsProject />
            <br />
            <DetailsAttachment />
            <br />
            <DetailsMember github={data?.github} twitter={data?.twitter} />
            <br />
            <DetailsAddress addressCountry={data?.addressCountry} addressCity={data?.addressCity} addressStreet={data?.addressStreet} addressZip={data?.addressZip} />{' '}
          </Tabs.Tab>
          <Tabs.Tab label={t('details.payments.tab')}>
            <DetailsPayments />
          </Tabs.Tab>
        </Tabs>
      </Grid.Col>
      <Grid.Col span={4}>
        <DetailsProcessOverview />
        <br />
        <DetailsPaymentSchedule />
      </Grid.Col>
    </Grid>
  );
}

export default GrantApplicationDetails;
