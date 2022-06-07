import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { TFunction } from 'next-i18next';

const validate = (form: UseFormReturnType<any>, t: TFunction) => {
  const validation = form.validate();

  if (form.values.hasPreviouslyReceivedFundingTokensGrantsFromNear && form.values.aboutTokensReceivedFromNear.length === 0) {
    form.setErrors({
      ...validation.errors,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      aboutTokensReceivedFromNear: t('form.aboutTokensReceivedFromNear.error'),
    });

    return true;
  }

  return validation.hasErrors;
};

export default validate;
