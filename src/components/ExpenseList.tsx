import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className='text-white mt-10'>
      {isEmpty ? (
        <p>Está vacío</p>
      ) : (
        <>
          <p className='text-black text-2xl font-bold my-5'>
            Listado de gastos
          </p>
          {state.expenses.map((expense) => (
            <ExpenseDetail expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
};
