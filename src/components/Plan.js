import "../App.css";
import { useContext } from "react";
import { memoContext } from "./Context";

const Plan = ({ plan, index }) => {
  const { dispatch } = useContext(memoContext);

  return (
    <div className="item">
      <p className="">{plan}</p>
      <div className="radio-close">
        <input
          type="checkbox"
          onChange={(e) =>
            dispatch({ type: "checked", payload: index, event: e })
          }
        />
        <span
          className="close"
          onClick={() => dispatch({ type: "delete", payload: index })}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Plan;
