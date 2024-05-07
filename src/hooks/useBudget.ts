import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { BudgetStateType } from "../reducers/budget-reducer";

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

  if (!state) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }

  return {
    setNewBudget,
    state,
    showModal,
    closeModal,
  };
};
