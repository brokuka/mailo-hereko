import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useMedia } from "react-use";
import Button from "../Button/Button";
import useMountTransition from "./../../hooks/useMountTransition";

import LogoIcon from "./icons/logo.svg";
import ArrowIcon from "./icons/arrow-right.svg";
import LogoutIcon from "./icons/logout.svg";

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
  const [tablet, setTablet] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const isTablet = useMedia("(max-width: 767.99px)", tablet);
  const checkVariant = variant === "auth" || variant === "nonAuth";
  const nodeRef = React.useRef(null);
  const isTransitioning = useMountTransition(menu, 300);

  React.useEffect(() => {
    const body = document.body;

    if (!menu) return body.classList.remove("no-scroll");

    body.classList.add("no-scroll");
  }, [menu]);

  if (!checkVariant)
    return console.error(
      "Invalid parameter of variant for component <Header/>"
    );

  const chooseIcon = (icon, className) => {
    switch (icon) {
      case "arrow":
        return <ArrowIcon className={className} />;
      case "logout":
        return <LogoutIcon className={className} />;
    }
  };

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
              {chooseIcon(icon, iconClassnames)}
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
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logo}>
            <LogoIcon />
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
      </div>
      {isTablet && (
        <div
          className={cn(styles.menu, {
            [styles.close]: !menu,
            [styles.open]: menu && isTransitioning,
          })}
        >
          <div className={styles.wrapper}>
            <Link href="/">
              <a className={styles.logo}>
                <LogoIcon />
              </a>
            </Link>

            <Button icon="close" onClick={onClick} />
          </div>

          <nav>
            <ul className={cn(styles.root)}>
              {variant === "nonAuth"
                ? renderList(nonAuthLinks)
                : renderList(authLinks)}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
