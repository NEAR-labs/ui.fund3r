import { NumberInput, TextInput } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GenericField(props: any) {
  const { zodTypeDef, ...otherProps } = props;
  const typeName = zodTypeDef.innerType || zodTypeDef.typeName;
  const required = zodTypeDef.typeName !== 'ZodOptional';

  const sharedProps = {
    required,
  };

  switch (typeName) {
    case 'ZodString':
      return <TextInput {...sharedProps} {...otherProps} />;
      break;

    case 'ZodNumber':
      return <NumberInput {...sharedProps} {...otherProps} />;
      break;

    default:
      return <TextInput {...sharedProps} {...otherProps} />;
      break;
  }
}

export default GenericField;
