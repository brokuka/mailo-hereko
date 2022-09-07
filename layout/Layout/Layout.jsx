import React from "react";
import Container from "../Container/Container";
import Header from "../../components/Header/Header";
import { useDashboardQuery } from "@store/auth/auth.api";
import { useDispatch } from "react-redux";
import { addDashboardData } from "@store/dashboard/dashboardSlice";
import { setAuthStatus } from "@store/auth/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useDashboardQuery();

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
