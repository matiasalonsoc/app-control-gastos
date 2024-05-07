export type BudgetAction =
  | { type: "add_budget"; payload: { budget: number } }
  | { type: "show_modal" }
  | { type: "close_modal" };

export type BudgetStateType = {
  budget: number;
  modal: boolean;
};

export const initialState: BudgetStateType = {
  budget: 0,
  modal: false,
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

  return state;
};
