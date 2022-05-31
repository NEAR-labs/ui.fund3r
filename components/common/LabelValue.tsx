import { Text } from '@mantine/core';

function LabelValue({ label, value }: { label: string | undefined; value: string | undefined }) {
  return (
    <div>
      <Text size="xs">{label}</Text>
      <Text weight={500}>{value}</Text>
    </div>
  );
}

export default LabelValue;
