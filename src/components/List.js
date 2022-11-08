import "../App.css";
import { useState, useEffect, useContext } from "react";
import { memoContext } from "./Context";
import Plan from "./Plan";

const List = () => {
  const [plan, setPlan] = useState("");
  const { plans, dispatch, checked } = useContext(memoContext);

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
          <div key={idx}>
            <Plan plan={plan} index={idx} />
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
