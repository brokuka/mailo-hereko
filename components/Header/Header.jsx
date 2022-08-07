import React from "react";
import Link from "next/link";
import cn from "classnames";

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
  const checkVariant = variant === "auth" || variant === "nonAuth";

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

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <a className={styles.logo}>
          <LogoIcon />
        </a>
      </Link>
      <nav>
        <ul className={styles.root}>
          {variant === "nonAuth"
            ? renderList(nonAuthLinks)
            : renderList(authLinks)}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
