import React from "react";
import Container from "../Container/Container";
import Header from "../../components/Header/Header";
import { useDashboardQuery, useLazyDashboardQuery } from "@store/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { addDashboardData } from "@store/dashboard/dashboardSlice";
import { selectCurrentAuthStatus, setAuthStatus } from "@store/auth/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  //   const { data } = useDashboardQuery();
  const [trigger, { data }] = useLazyDashboardQuery();

  const checkToken = React.useCallback(() => {
    if (!localStorage.getItem("loginToken")) return;

    return trigger();
  }, [trigger]);

  React.useEffect(() => {
    checkToken();
    if (data) {
      dispatch(addDashboardData(data.results));
      dispatch(setAuthStatus(true));
    }
  }, [dispatch, data, checkToken]);

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
