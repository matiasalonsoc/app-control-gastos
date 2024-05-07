import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const { addExpense } = useBudget();

  const [error, setError] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("") || expense.amount === 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    addExpense(expense);
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className=' uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        Nuevo gasto
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='flex flex-col gap-2'>
        <label htmlFor='expenseName' className='text-xl'>
          Nombre del gasto
        </label>
        <input
          type='text'
          id='expenseName'
          placeholder='Añade el nombre del gasto'
          className='bg-slate-100 p-2'
          name='expenseName'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Cantidad:
        </label>
        <input
          type='text'
          id='amount'
          placeholder='Añade la cantidad del gasto'
          className='bg-slate-100 p-2'
          name='amount'
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='category' className='text-xl'>
          Categoría:
        </label>
        <select
          id='category'
          className='bg-slate-100 p-2'
          name='category'
          value={expense.category}
          onChange={handleChange}
        >
          <option value=''> -- Seleccione -- </option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}{" "}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Fecha gasto:
        </label>
        <DatePicker
          onChange={handleChangeDate}
          value={expense.date}
          className=' bg-slate-100'
        />
      </div>

      <button className=' bg-blue-600 w-full p-2 text-white uppercase font-bold rounded-lg'>
        Registrar gasto
      </button>
    </form>
  );
};
