import { useMemo } from "react";
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import { Expense } from "../types";
import { AmountDisplay } from "./AmountDisplay";
// https://grafana.zksync.org/

type ExpenseDetailProps = {
  expense: Expense;
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { removeExpense, getExpenseById } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => getExpenseById(expense.id)}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => removeExpense(expense.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={10}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='bg-white shadow-lg px-8 py-6 w-full border-b border-gray-200 flex gap-5 items-center'>
          <div>
            <img
              src={`/public/icono_${categoryInfo.icon}.svg`}
              alt={categoryInfo.name}
              className='w-20'
            />
          </div>

          <div className='flex-1 space-y-2'>
            <p className='text-lg font-bold uppercase text-slate-500'>
              {categoryInfo.name}
            </p>
            <p className='text-slate-600'>{expense.expenseName} </p>
            <p className='text-slate-600 text-sm'>
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
