type AmountDisplayProps = {
  title?: string;
  amount: number;
};

export const AmountDisplay = ({ title, amount }: AmountDisplayProps) => {
  return (
    <p className='text-3xl text-blue-600 font-bold'>
      {title && `${title}: `}
      <span className='text-black font-black'>${amount}</span>
    </p>
  );
};
