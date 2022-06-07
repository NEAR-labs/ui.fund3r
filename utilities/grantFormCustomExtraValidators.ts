import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { TFunction } from 'next-i18next';

import { WorkingTypes } from '@/types/GrantApplicationInterface';

const validate = (form: UseFormReturnType<any>, t: TFunction) => {
  const validation = form.validate();
  let hasCustomErrors = false;
  let customErrors = {};

  if (form.values.hasPreviouslyReceivedFundingTokensGrantsFromNear && form.values.aboutTokensReceivedFromNear.length === 0) {
    customErrors = {
      ...customErrors,
      aboutTokensReceivedFromNear: t('form.aboutTokensReceivedFromNear.error'),
    };

    hasCustomErrors = true;
  }

  if (form.values.workingAloneOrTeam === WorkingTypes.WorkingWithTeam && form.values.aboutTeam === '') {
    customErrors = {
      ...customErrors,
      aboutTeam: t('form.aboutTeam.error'),
    };

    hasCustomErrors = true;
  }

  form.setErrors({
    ...validation.errors,
    ...customErrors,
  });

  console.log(validation.errors);

  return validation.hasErrors || hasCustomErrors;
};

export default validate;
