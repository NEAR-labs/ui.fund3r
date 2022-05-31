import { Grid, Tabs } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DetailsAddress from '@/components/grant-application-details/DetailsAddress';
import DetailsHeader from '@/components/grant-application-details/DetailsHeader';
import DetailsMember from '@/components/grant-application-details/DetailsMember';
import DetailsMilestones from '@/components/grant-application-details/DetailsMilestones';
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
        <DetailsStatusActions />
        <Tabs color="violet" tabPadding="xl" mt="xl">
          <Tabs.Tab label={t('details.project.tab')}>
            <DetailsProject
              projectDescription={data?.projectDescription}
              fundingAmount={data?.fundingAmount}
              currency={data?.currency}
              projectLaunchDate={data?.projectLaunchDate}
              projectUrl={data?.projectUrl}
              githubUrl={data?.githubUrl}
            />
            <DetailsMilestones milestones={data?.milestones} currency={data?.currency} />
            <DetailsMember github={data?.github} twitter={data?.twitter} />
            <DetailsAddress addressCountry={data?.addressCountry} addressCity={data?.addressCity} addressStreet={data?.addressStreet} addressZip={data?.addressZip} />{' '}
          </Tabs.Tab>
          <Tabs.Tab label={t('details.payments.tab')}>
            <DetailsPayments payments={data?.payments} />
          </Tabs.Tab>
        </Tabs>
      </Grid.Col>
      <Grid.Col span={4}>
        <DetailsProcessOverview />
        <DetailsPaymentSchedule milestones={data?.milestones} fundingAmount={data?.fundingAmount} currency={data?.currency} projectLaunchDate={data?.projectLaunchDate} />
      </Grid.Col>
    </Grid>
  );
}

export default GrantApplicationDetails;
