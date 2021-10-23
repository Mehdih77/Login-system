import React, { useState, useEffect, useLayoutEffect } from "react";
import { actionTypes } from "../../Context/reducer";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import { fetchToken, fetchCurrentUserInfo } from "../../Context/axios";

///////////////////////////////////////////////////////////////

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const { loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const actionSuccess = (data, token) => {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        user: data,
        token,
      },
    };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });
    // username & password for State on line 9
    // اطلاعات داخل success & data  از خط 13 میایند
    fetchToken(username, password).then(({ success, data }) => {
      if (success) {
        setToken(data);
      }
    });
  };

  // تفاوت useEffect وووو  useLayoutEffect ؟؟؟
  // useLayoutEffect قبل از رندر اجرا میشود
  // useEffect بعد از رندر
  // هدف در اینجا این است که token ذخیره شود و برای دفعات بعد اتومات وارد شود
  // همچنین فرم را دیگر نبینیم
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
    }
  }, [dispatch]);

  // ارسال درخاست سمت سرور و دریافت اطلاعات کاربر جاری
  // ذخیره کردن token   برای دفعات بعد که دیگر یوزر و پسوور وارد نکنیم
  useEffect(() => {
    if (token) {
      fetchCurrentUserInfo(token).then(({ success, data }) => {
        if (success) {
          localStorage.setItem("token", token);
          dispatch(actionSuccess(data, token));
        }
      });
    }
  }, [token, dispatch]);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="login" onSubmit={handleLogin}>
          <h1>Login</h1>
          <form method="post">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username: admin"
              required="required"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password: admin"
              required="required"
            />
            <button
              type="submit"
              className="btn btn-primary btn-block btn-large">
              Let me in.
            </button>
          </form>
        </div>
      )}
    </>
  );
}
