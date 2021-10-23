import React from "react";
import { useAuthDispatch } from "../../Context/auth-context";
import { actionTypes } from "../../Context/reducer";

export default function Dashboard() {
  const dispatch = useAuthDispatch();

  function handleLogOut() {
    localStorage.clear("token");
    dispatch({
      type: actionTypes.LOGOUT,
    });
  }

  return (
    <div className="login">
      <h4>Welcome!</h4>
      <button
        onClick={handleLogOut}
        className="btn btn-primary btn-block btn-large">
        LOGOUT
      </button>
    </div>
  );
}
