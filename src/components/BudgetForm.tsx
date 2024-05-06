import { useState } from "react";

export const BudgetForm = () => {
  const [budget, setBudget] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? +e.target.value : null;
    setBudget(value);
  };

  return (
    <form className='space-y-5'>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir presupuesto
        </label>
        <input
          type='number'
          id='budget'
          className='w-full bg-white border border-gray-200 p-2'
          placeholder='Define tu presupuesto'
          name='budget'
          value={budget === null ? "" : budget}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={budget === null || budget <= 0}
        className='bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 w-full p-2 text-white font-black uppercase'
      >
        Enviar
      </button>
    </form>
  );
};
