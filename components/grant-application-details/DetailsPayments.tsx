import DetailsPaymentsItem from '@/components/grant-application-details/DetailsPaymentsItem';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';

function DetailsPayments({ payments, grantId }: { payments: PaymentInterface[] | undefined; grantId: number | undefined }) {
  if (!payments) {
    return null;
  }

  const paymentsItems = payments.map((payment, index) => {
    // eslint-disable-next-line no-underscore-dangle
    return <DetailsPaymentsItem key={payment._id} payment={payment} index={index} grantId={grantId} />;
  });

  return <div>{paymentsItems}</div>;
}

export default DetailsPayments;
