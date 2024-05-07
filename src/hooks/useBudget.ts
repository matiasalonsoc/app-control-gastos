import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { BudgetStateType } from "../reducers/budget-reducer";
import { DraftExpense } from "../types";

export const useBudget = () => {
  const { state, dispatch } = useContext(BudgetContext);

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

  if (!state) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }

  return {
    setNewBudget,
    state,
    showModal,
    closeModal,
    addExpense,
  };
};
