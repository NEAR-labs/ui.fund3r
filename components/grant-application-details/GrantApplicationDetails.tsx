import { Grid, Space, Tabs } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DetailsAddress from '@/components/grant-application-details/DetailsAddress';
import DetailsAgreements from '@/components/grant-application-details/DetailsAgreements';
import DetailsHeader from '@/components/grant-application-details/DetailsHeader';
import DetailsMember from '@/components/grant-application-details/DetailsMember';
import DetailsMilestones from '@/components/grant-application-details/DetailsMilestones';
import DetailsMilestonesProgress from '@/components/grant-application-details/DetailsMilestonesProgress';
import DetailsPayments from '@/components/grant-application-details/DetailsPayments';
import DetailsPaymentSchedule from '@/components/grant-application-details/DetailsPaymentSchedule';
import DetailsProcessOverview from '@/components/grant-application-details/DetailsProcessOverview';
import DetailsProject from '@/components/grant-application-details/DetailsProject';
import DetailsStatusActions from '@/components/grant-application-details/DetailsStatusActions';
import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function GrantApplicationDetails({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  const { t } = useTranslation('grant');
  const { status } = useGrantStatus();

  return (
    <Grid gutter={48} mb="xl">
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
        <Space h="xs" />
        <DetailsStatusActions
          id={data?.id}
          email={data?.email}
          firstname={data?.firstname}
          lastname={data?.lastname}
          dateInterview={data?.dateInterview}
          helloSignRequestId={data?.helloSignRequestId}
          setGrant={setData}
        />
        <Space h="xl" />
        <Tabs color="violet" tabPadding="xl" mt="xl">
          <Tabs.Tab label={t('details.project.tab')}>
            <DetailsProject
              projectDescription={data?.projectDescription}
              fundingAmount={data?.fundingAmount}
              currency={data?.currency}
              projectLaunchDate={data?.projectLaunchDate}
              projectUrl={data?.projectUrl}
              githubUrl={data?.githubUrl}
              reviewProject={data?.reviewProject}
            />
            <Space h="xl" />
            <DetailsMilestones milestones={data?.milestones} currency={data?.currency} />
            <Space h="xs" />
            {data?.helloSignRequestId && data?.dateAgreementSignature && (
              <>
                <DetailsAgreements helloSignRequestId={data.helloSignRequestId} />
                <Space h="xl" />
              </>
            )}
            <DetailsMember github={data?.github} twitter={data?.twitter} reviewMemberDetail={data?.reviewMemberDetail} />
            <Space h="xl" />
            <DetailsAddress addressCountry={data?.addressCountry} addressCity={data?.addressCity} addressStreet={data?.addressStreet} addressZip={data?.addressZip} />{' '}
          </Tabs.Tab>
          <Tabs.Tab label={t('details.payments.tab')}>
            <DetailsPayments payments={data?.payments} />
          </Tabs.Tab>
        </Tabs>
      </Grid.Col>
      <Grid.Col span={4}>
        {status === STATUS.ONBOARDING_COMPLETED ? <DetailsMilestonesProgress /> : <DetailsProcessOverview />}
        <DetailsPaymentSchedule milestones={data?.milestones} fundingAmount={data?.fundingAmount} currency={data?.currency} projectLaunchDate={data?.projectLaunchDate} />
      </Grid.Col>
    </Grid>
  );
}

export default GrantApplicationDetails;
