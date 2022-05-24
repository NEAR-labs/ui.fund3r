import { NumberInput, TextInput, Textarea } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GenericField(props: any) {
  const { zodType, ...otherProps } = props;

  switch (zodType) {
    case 'ZodString':
      return <TextInput {...otherProps} />;
      break;

    default:
      return <TextInput {...otherProps} />;
      break;
  }
}

export default GenericField;
