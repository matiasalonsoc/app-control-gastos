import { createContext, useMemo, useReducer } from "react";
import {
  BudgetAction,
  BudgetStateType,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";
import { Expense } from "../types";

type BudgetContextProps = {
  state: BudgetStateType;
  dispatch: React.Dispatch<BudgetAction>;
  totalExpenses: number;
  remain: number;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BudgetProviderProps = {
  children: React.ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(
    budgetReducer as (
      state: BudgetStateType,
      action: BudgetAction
    ) => BudgetStateType,
    initialState as BudgetStateType
  );

  const totalExpenses = useMemo(
    () =>
      state.expenses.reduce(
        (total: number, expense: Expense) => expense.amount + total,
        0
      ),
    [state.expenses]
  );

  const remain = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state: state || initialState,
        dispatch,
        totalExpenses,
        remain,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
