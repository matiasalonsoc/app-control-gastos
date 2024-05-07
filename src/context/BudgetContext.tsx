import { createContext, useReducer } from "react";
import {
  BudgetAction,
  BudgetStateType,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetStateType;
  dispatch: React.Dispatch<BudgetAction>;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BudgetProviderProps = {
  children: React.ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        state: state || initialState,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
