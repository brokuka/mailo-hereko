import React from "react";
import cn from "classnames";

import BurgerIcon from "./icons/burger.svg";
import CheckedIcon from "./icons/checked.svg";
import CloseIcon from "./icons/close.svg";
import LikeIcon from "./icons/like.svg";
import LogoIcon from "./icons/logo.svg";
import LogoColoredIcon from "./icons/logo-colored.svg";
import LogoutIcon from "./icons/logout.svg";
import ArrowIcon from "./icons/arrow.svg";
import PlusIcon from "./icons/plus.svg";
import SearchIcon from "./icons/search.svg";
import StarIcon from "./icons/star.svg";
import WatchedIcon from "./icons/watched.svg";

const Icon = ({ icon, size = 24, className }) => {
  return <>{chooseIcon(icon, size, className)}</>;
};

export const chooseIcon = (icon, size = 24, className, classTerms) => {
  const customClassname = classTerms || cn(className);

  switch (icon) {
    case "burger":
      return (
        <BurgerIcon width={size} height={size} className={customClassname} />
      );
    case "checked":
      return (
        <CheckedIcon width={size} height={size} className={customClassname} />
      );
    case "close":
      return (
        <CloseIcon width={size} height={size} className={customClassname} />
      );
    case "like":
      return (
        <LikeIcon width={size} height={size} className={customClassname} />
      );
    case "logo":
      return (
        <LogoIcon width={size} height={size} className={customClassname} />
      );
    case "logoColored":
      return (
        <LogoColoredIcon
          width={size}
          height={size}
          className={customClassname}
        />
      );
    case "logout":
      return (
        <LogoutIcon width={size} height={size} className={customClassname} />
      );
    case "arrow":
      return (
        <ArrowIcon width={size} height={size} className={customClassname} />
      );
    case "plus":
      return (
        <PlusIcon width={size} height={size} className={customClassname} />
      );
    case "search":
      return (
        <SearchIcon width={size} height={size} className={customClassname} />
      );
    case "star":
      return (
        <StarIcon
          width={size}
          height={size}
          viewBox={`0 0 24 24`}
          className={customClassname}
        />
      );
    case "watched":
      return (
        <WatchedIcon width={size} height={size} className={customClassname} />
      );
  }
};

export default Icon;
