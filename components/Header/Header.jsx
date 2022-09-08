import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMedia } from "react-use";
import { useLogOutMutation } from "@store/auth/auth.api";
import {
  selectCurrentAuthStatus,
  removeStateData,
} from "@store/auth/authSlice";
import Button from "@component/Button/Button";
import Icon, { chooseIcon } from "@component/Icon/Icon";
import Drawer from "@component/Drawer/Drawer";

/* Style */
import styles from "./Header.module.scss";

const nonAuthLinks = [
  { title: "Movies", href: "/movies" },
  { title: "TV Shows", href: "/tvs" },
  { title: "Suggest me", href: "/suggest", icon: "arrow", iconPos: "right" },
];

const authLinks = [
  { title: "Dashboard", href: "/" },
  { title: "Suggestions", href: "/" },
  { title: "Add", href: "/" },
  { title: "Logout", href: "", icon: "logout", iconPos: "left" },
];

const Header = () => {
  const [menu, setMenu] = React.useState(false);
  const [loggedOut, setLoggetOut] = React.useState(false);
  const isTablet = useMedia("(max-width: 767.99px)", null);
  const router = useRouter();
  const status = useSelector(selectCurrentAuthStatus);
  const dispatch = useDispatch();
  const [logout] = useLogOutMutation();
  // const [login, { data }] = useLoginMutation();

  const renderList = (arr) => {
    return arr.map(({ title, href, icon, iconPos = "left" }, id) => {
      const checkIcon = icon === "arrow" || icon === "logout";

      if (!checkIcon && icon)
        return console.error(
          "Invalid list icon parameter from <Header/> component"
        );

      const iconClassnames = cn(styles.icon, {
        [styles.icon_left]: iconPos === "left",
        [styles.icon_right]: iconPos === "right",
      });

      return (
        <li key={id}>
          <Link href={href}>
            <a
              className={cn(styles.link, {
                [styles.active]: href === router.asPath,
              })}
              onClick={(e) => onClick(e)}
            >
              {chooseIcon({
                icon,
                size: icon === "arrow" ? 16 : 24,
                classTerms: iconClassnames,
              })}
              <span>{title}</span>
            </a>
          </Link>
        </li>
      );
    });
  };

  const onClick = (e) => {
    const logOutLink =
      e.currentTarget && e.currentTarget.textContent.includes("Logout");

    if (logOutLink) {
      router.replace("/");
      setLoggetOut(true);
    }

    isTablet && setMenu(!menu);
  };

  React.useEffect(() => {
    if (loggedOut) {
      logout();
      dispatch(removeStateData());
      router.reload(location.pathname);
    }
  }, [loggedOut, dispatch, logout, router]);

  return (
    <>
      <header className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logo} tabIndex="0">
            <Icon icon="logoColored" size={40} />
          </a>
        </Link>

        {!isTablet && (
          <nav className={styles.nav}>
            <ul className={styles.root}>
              {!status ? renderList(nonAuthLinks) : renderList(authLinks)}
            </ul>
          </nav>
        )}

        {isTablet && <Button icon="burger" onClick={onClick} />}
      </header>

      {isTablet && (
        <Drawer state={menu} onClose={onClick}>
          <nav>
            <ul className={cn(styles.root)}>
              {!status ? renderList(nonAuthLinks) : renderList(authLinks)}
            </ul>
          </nav>
        </Drawer>
      )}
    </>
  );
};

export default Header;
