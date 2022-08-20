import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useMedia } from "react-use";
import Button from "../Button/Button";
import Icon, { chooseIcon } from "../Icon/Icon";
import Drawer from "../Drawer/Drawer";

/* Style */
import styles from "./Header.module.scss";

const nonAuthLinks = [
  { title: "Movies", href: "/" },
  { title: "TV Shows", href: "/" },
  { title: "Suggest me", href: "/", icon: "arrow", iconPos: "right" },
];

const authLinks = [
  { title: "Dashboard", href: "/" },
  { title: "Suggestions", href: "/" },
  { title: "Add", href: "/" },
  { title: "Logout", href: "/", icon: "logout", iconPos: "left" },
];

const Header = ({ variant = "nonAuth" }) => {
  const [tablet] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const isTablet = useMedia("(max-width: 767.99px)", tablet);
  const checkVariant = variant === "auth" || variant === "nonAuth";

  React.useEffect(() => {
    const body = document.body;

    if (!menu) return body.classList.remove("no-scroll");

    body.classList.add("no-scroll");
  }, [menu]);

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
            <a className={styles.link}>
              {chooseIcon(icon, 16, undefined, iconClassnames)}
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
          <a className={styles.logo}>
            <Icon icon="logoColored" size={40} />
          </a>
        </Link>

        {!isTablet && (
          <nav>
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
