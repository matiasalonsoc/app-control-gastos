import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetAction =
  | { type: "add_budget"; payload: { budget: number } }
  | { type: "show_modal" }
  | { type: "close_modal" }
  | { type: "add_expense"; payload: { expense: DraftExpense } };

export type BudgetStateType = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetStateType = {
  budget: 0,
  modal: false,
  expenses: [],
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetStateType = initialState,
  action: BudgetAction
) => {
  if (action.type === "add_budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show_modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close_modal") {
    return {
      ...state,
      modal: false,
    };
  }

  if (action.type === "add_expense") {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  return state;
};
