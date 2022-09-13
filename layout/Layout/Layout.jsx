import React from "react";
import { useLocalStorage } from "react-use";
import { useDispatch } from "react-redux";
import { useDashboardQuery } from "@store/auth/auth.api";
import { addDashboardData } from "@store/dashboard/dashboardSlice";
import { setAuthStatus } from "@store/auth/authSlice";
import Container from "@layout/Container/Container";
import Header from "@component/Header/Header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage("loginToken");
  const { data } = useDashboardQuery(undefined, { skip: Boolean(token) });

  React.useEffect(() => {
    if (data) {
      dispatch(addDashboardData(data.results));
      dispatch(setAuthStatus(true));
    }
  }, [dispatch, data]);

  return (
    <div className="page">
      <Container>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
