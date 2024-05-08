import { useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { setNewBudget } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewBudget({
      budget,
      modal: false,
      expenses: [],
      editingId: "",
      currentCategory: "",
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
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
          value={budget}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={budget <= 0}
        className='bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 w-full p-2 text-white font-black uppercase'
      >
        Enviar
      </button>
    </form>
  );
};
