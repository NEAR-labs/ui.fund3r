import { Grid } from '@mantine/core';

import DetailsHeader from '@/components/grant-application-details/DetailsHeader';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function GrantApplicationDetails({ data }: { data: GrantApplicationInterface | undefined | null }) {
  return (
    <Grid gutter="xl" mb="xl">
      <Grid.Col span={8}>
        <DetailsHeader
          projectName={data?.projectName}
          firstname={data?.firstname}
          lastname={data?.lastname}
          grantCategory={data?.grantCategory}
          grantType={data?.grantType}
          openSourceState={data?.openSourceState}
        />
      </Grid.Col>
      <Grid.Col span={4}>&nbsp;</Grid.Col>
    </Grid>
  );
}

export default GrantApplicationDetails;
