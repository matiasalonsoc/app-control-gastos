import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetAction =
  | { type: "add_budget"; payload: { budget: number } }
  | { type: "show_modal" }
  | { type: "close_modal" }
  | { type: "add_expense"; payload: { expense: DraftExpense } }
  | { type: "remove_expense"; payload: { id: Expense["id"] } }
  | { type: "get_expense_by_id"; payload: { id: Expense["id"] } }
  | { type: "update_expense"; payload: { expense: Expense } }
  | { type: "reset" }
  | { type: "add_filter_category"; payload: { id: Category["id"] } };

export type BudgetStateType = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetStateType = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
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
      editingId: "",
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

  if (action.type === "remove_expense") {
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload.id),
    };
  }

  if (action.type === "get_expense_by_id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update_expense") {
    return {
      ...state,
      expenses: state.expenses.map((exp) =>
        exp.id === action.payload.expense.id ? action.payload.expense : exp
      ),
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "reset") {
    return {
      budget: 0,
      modal: false,
      expenses: [],
      editingId: "",
    };
  }

  if (action.type === "add_filter_category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
