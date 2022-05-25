import { NumberInput, TextInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line max-lines-per-function
function GenericField(props: any) {
  const { t } = useTranslation('grant');

  const { zodTypeDef, ...otherProps } = props;
  const typeName = zodTypeDef.innerType || zodTypeDef.typeName;
  const required = zodTypeDef.typeName !== 'ZodOptional';

  const sharedProps = {
    required,
  };

  console.log(zodTypeDef);

  switch (typeName) {
    case 'ZodString':
      return <TextInput {...sharedProps} {...otherProps} />;

    case 'ZodNumber':
      return <NumberInput {...sharedProps} {...otherProps} />;

    case 'ZodNativeEnum':
      // eslint-disable-next-line no-case-declarations
      const data = Object.keys(zodTypeDef.values).map((key) => ({
        label: t(`form.labels.${zodTypeDef.values[key]}`),
        value: zodTypeDef.values[key],
      }));

      return <Select {...sharedProps} {...otherProps} data={data} />;

    case 'ZodDate':
      return <DatePicker {...sharedProps} {...otherProps} />;

    default:
      return <TextInput {...sharedProps} {...otherProps} />;
  }
}

export default GenericField;
