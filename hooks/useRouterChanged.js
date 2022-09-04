import { useEffect } from "react";
import { useRouter } from "next/router";
import { setFilterType, setFilterValue } from "store/filter/filterSlice";
import { useDispatch } from "react-redux";

const useRouterChanged = ({ type, removeValue }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteChange = () => {
      if (type) {
        dispatch(setFilterType(type));
      }

      if (removeValue) {
        dispatch(setFilterValue(""));
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [dispatch, router.events, type, removeValue]);
};

export default useRouterChanged;
