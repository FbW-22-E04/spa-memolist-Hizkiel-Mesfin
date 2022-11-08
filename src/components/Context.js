import { createContext, useReducer } from "react";

export const memoContext = createContext();

export function ContextProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "add-plan":
        return { ...state, plans: [...state.plans, action.payload] };

      case "checked":
        return { ...state, checked: action.event.target.checked };

      case "delete":
        return {
          ...state,
          plans: state.plans.filter((plan, i) => i !== action.payload),
        };

      case "clear-all":
        return { ...state, plans: [] };

      case "data":
        return { ...state, plans: [...action.payload] };

      default:
        return state;
    }
  };

  const [{ plans, checked }, dispatch] = useReducer(reducer, {
    plans: [],
    checked: false,
  });

  return (
    <memoContext.Provider value={{ plans, checked, dispatch }}>
      {children}
    </memoContext.Provider>
  );
}
