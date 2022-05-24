import { NumberInput, TextInput } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GenericField(props: any) {
  const { zodType, ...otherProps } = props;

  switch (zodType) {
    case 'ZodString':
      return <TextInput {...otherProps} />;
      break;

    case 'ZodNumber':
      return <NumberInput {...otherProps} />;
      break;

    default:
      return <TextInput {...otherProps} />;
      break;
  }
}

export default GenericField;
