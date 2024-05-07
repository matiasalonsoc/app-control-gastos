type AmountDisplayProps = {
  title: string;
  amount: number;
};

export const AmountDisplay = ({ title, amount }: AmountDisplayProps) => {
  return (
    <p className='text-2xl text-blue-600 font-bold'>
      {title}: <span>${amount}</span>
    </p>
  );
};
