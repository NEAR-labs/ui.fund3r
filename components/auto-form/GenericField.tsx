import { useMemo } from 'react';
import { NumberInput, TextInput, Select, Checkbox } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line max-lines-per-function
function GenericField(props: any) {
  const { t } = useTranslation('grant');

  const { zodTypeDef, ...otherProps } = props;
  const typeName = zodTypeDef.innerType || zodTypeDef.typeName;
  const required = zodTypeDef.typeName !== 'ZodOptional';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const maxArray = zodTypeDef.checks?.filter((check: any) => {
  //   return check.kind === 'max';
  // });

  const email = useMemo(
    () =>
      zodTypeDef.checks?.filter((check: any) => {
        return check.kind === 'email';
      }),
    [zodTypeDef],
  );

  const type = useMemo(() => (email?.length > 0 ? 'email' : 'text'), [email]);

  const sharedProps = {
    required,
    type,
  };

  console.log(typeName);

  switch (typeName) {
    case 'ZodString':
      return <TextInput {...otherProps} {...sharedProps} />;

    case 'ZodNumber':
      return <NumberInput {...otherProps} {...sharedProps} />;

    case 'ZodNativeEnum':
      // eslint-disable-next-line no-case-declarations
      const data = Object.keys(zodTypeDef.values).map((key) => ({
        label: t(`form.labels.${zodTypeDef.values[key]}`),
        value: zodTypeDef.values[key],
      }));

      return <Select {...otherProps} {...sharedProps} data={data} />;

    case 'ZodDate':
      return <DatePicker {...otherProps} {...sharedProps} />;

    case 'ZodBoolean':
      return <Checkbox {...otherProps} {...sharedProps} color="violet" type="checkbox" />;

    default:
      return <TextInput {...otherProps} {...sharedProps} />;
  }
}

export default GenericField;
