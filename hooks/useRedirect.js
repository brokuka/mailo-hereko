import { useEffect } from "react";
import { useRouter } from "next/router";

export const useRedirect = ({ type }) => {
  const { push } = useRouter();

  useEffect(() => {
    const checkToken = localStorage.getItem("loginToken");

    switch (type) {
      case "auth":
        if (!checkToken) push("/");
        break;

      case "nonAuth":
        if (checkToken) push("/");
        break;
    }
  }, [push, type]);
};
