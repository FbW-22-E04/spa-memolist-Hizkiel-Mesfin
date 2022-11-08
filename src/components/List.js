import "../App.css";
import { useState, useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-plan":
      return { plans: [...state.plans, action.payload] };
    case "delete":
      return { plans: state.plans.filter((plan, i) => i !== action.payload) };

    case "clear-all":
      return { plans: [] };

    case "data":
      return { plans: [...action.payload] };

    default:
      return state;
  }
};

const List = () => {
  const [plan, setPlan] = useState("");
  const [{ plans }, dispatch] = useReducer(reducer, { plans: [] });
  const [completed, setCompleted] = useState(false);

  console.log(completed);

  useEffect(() => {
    const data = localStorage.getItem("plans");

    if (data) {
      dispatch({ type: "data", payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlan("");
    dispatch({ type: "add-plan", payload: plan });
  };

  const handleClear = () => {
    dispatch({ type: "clear-all", payload: plans });
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="plan-input"
          type="text"
          placeholder="Put a plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />
      </form>
      <div className="list-container">
        {plans?.map((plan, idx) => (
          <div key={idx} className="item">
            <p className={completed ? "completed" : ""}>{plan}</p>
            <div className="radio-close">
              <input
                type="checkbox"
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <span
                className="close"
                onClick={() => dispatch({ type: "delete", payload: idx })}
              >
                X
              </span>
            </div>
          </div>
        ))}
      </div>
      {plans.length > 1 ? (
        <button className="clear-all" onClick={handleClear}>
          clear all
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default List;
