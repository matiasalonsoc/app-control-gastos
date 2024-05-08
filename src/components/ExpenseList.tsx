import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter((exp) => exp.category === state.currentCategory)
    : state.expenses;

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <div className='text-white mt-10'>
      {isEmpty ? (
        <p className=' bg-green-400 font-light italic text-center p-5 rounded text-xl'>
          Sin gastos...
        </p>
      ) : (
        <>
          <p className='text-black text-2xl font-bold my-5'>
            Listado de gastos
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
};
