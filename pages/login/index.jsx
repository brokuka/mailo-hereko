import LoginForm from "@component/LoginForm/LoginForm";
import { useLoginMutation } from "@store/auth/auth.api";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentEmail,
  selectCurrentPassword,
  setAuthStatus,
  setUser,
  setEmail,
  setPassword,
  setToken,
  selectCurrentAuthStatus,
} from "@store/auth/authSlice";
import { addDashboardData } from "@store/dashboard/dashboardSlice";
import { useRouter } from "next/router";

const Index = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectCurrentEmail);
  const password = useSelector(selectCurrentPassword);
  const authStatus = useSelector(selectCurrentAuthStatus);
  const router = useRouter();

  React.useEffect(() => {
    if (authStatus) {
      router.replace("/");
    }
  }, [router, authStatus]);

  const [login, { data }] = useLoginMutation();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password }).unwrap();
      router.push("/");
      setEmail("");
      setPassword("");
      setToken("");
    } catch (error) {
      if (error.status === 400) {
        return console.log("Invalid email or password");
      }
      return error;
    }
  };

  React.useEffect(() => {
    if (data && !localStorage.getItem("loginToken")) {
      dispatch(setToken(data.token));
      dispatch(setUser(data.token));
      dispatch(addDashboardData(data));
      dispatch(setAuthStatus(true));
    }
  }, [data, dispatch, email]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <LoginForm />
      </form>
    </>
  );
};

export default Index;
