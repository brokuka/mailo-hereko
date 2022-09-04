import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import { useMedia } from "react-use";
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
  { title: "Logout", href: "/", icon: "logout", iconPos: "left" },
];

const Header = ({ variant = "nonAuth" }) => {
  const [menu, setMenu] = React.useState(false);
  const isTablet = useMedia("(max-width: 767.99px)", null);
  const checkVariant = variant === "auth" || variant === "nonAuth";
  const router = useRouter();

  if (!checkVariant)
    return console.error(
      "Invalid parameter of variant for component <Header/>"
    );

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
            >
              {chooseIcon({ icon, size: 16, classTerms: iconClassnames })}
              <span>{title}</span>
            </a>
          </Link>
        </li>
      );
    });
  };

  const onClick = () => {
    setMenu(!menu);
  };

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
              {variant === "nonAuth"
                ? renderList(nonAuthLinks)
                : renderList(authLinks)}
            </ul>
          </nav>
        )}

        {isTablet && <Button icon="burger" onClick={onClick} />}
      </header>

      {isTablet && (
        <Drawer state={menu} onClose={onClick}>
          <nav>
            <ul className={cn(styles.root)}>
              {variant === "nonAuth"
                ? renderList(nonAuthLinks)
                : renderList(authLinks)}
            </ul>
          </nav>
        </Drawer>
      )}
    </>
  );
};

export default Header;
