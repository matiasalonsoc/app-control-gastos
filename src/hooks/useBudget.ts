import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { BudgetStateType } from "../reducers/budget-reducer";
import { DraftExpense } from "../types";

export const useBudget = () => {
  const { state, dispatch, totalExpenses, remain } = useContext(BudgetContext);

  const setNewBudget = (payload: BudgetStateType) => {
    dispatch({ type: "add_budget", payload });
  };

  const showModal = () => {
    dispatch({ type: "show_modal" });
  };

  const closeModal = () => {
    dispatch({ type: "close_modal" });
  };

  const addExpense = (payload: DraftExpense) => {
    dispatch({ type: "add_expense", payload: { expense: payload } });
  };

  const removeExpense = (payload: string) => {
    dispatch({ type: "remove_expense", payload: { id: payload } });
  };

  const getExpenseById = (payload: string) => {
    dispatch({ type: "get_expense_by_id", payload: { id: payload } });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  const filterCategory = (payload: string) => {
    dispatch({ type: "add_filter_category", payload: { id: payload } });
  };

  if (!state) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }

  return {
    setNewBudget,
    state,
    showModal,
    closeModal,
    addExpense,
    removeExpense,
    getExpenseById,
    dispatch,
    totalExpenses,
    remain,
    handleReset,
    filterCategory,
  };
};
