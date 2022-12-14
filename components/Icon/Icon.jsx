import React from "react";
import cn from "classnames";

import BurgerIcon from "./icons/burger.svg";
import CheckedIcon from "./icons/checked.svg";
import CloseIcon from "./icons/close.svg";
import LikeIcon from "./icons/like.svg";
import LogoIcon from "./icons/logo.svg";
import LogoColoredIcon from "./icons/logo-colored.svg";
import LogoPlaceholder from "./icons/logo-placeholder.svg";
import LogoutIcon from "./icons/logout.svg";
import ArrowIcon from "./icons/arrow.svg";
import PlusIcon from "./icons/plus.svg";
import SearchIcon from "./icons/search.svg";
import StarIcon from "./icons/star.svg";
import WatchedIcon from "./icons/watched.svg";
import NotFoundIcon from "./icons/404.svg";
import Password from "./icons/password.svg";
import ShowPassIcon from "./icons/showpass.svg";
import HidePassIcon from "./icons/hidepass.svg";
import EmailIcon from "./icons/email.svg";
import VideoPlayIcon from "./icons/video-play.svg";
import LinkIcon from "./icons/link.svg";
import ThankYouIcon from "./icons/thankyou.svg";

const Icon = ({ icon, size, width, height, className }) => {
  return <>{chooseIcon({ icon, size, width, height, className })}</>;
};

export const chooseIcon = ({
  icon,
  size,
  width,
  height,
  className,
  classTerms,
}) => {
  const customClassname = classTerms || cn(className);

  switch (icon) {
    case "burger":
      return (
        <BurgerIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "checked":
      return (
        <CheckedIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "close":
      return (
        <CloseIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "like":
      return (
        <LikeIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "logo":
      return (
        <LogoIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "logoColored":
      return (
        <LogoColoredIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "logoPlaceholder":
      return (
        <LogoPlaceholder
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "logout":
      return (
        <LogoutIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "arrow":
      return (
        <ArrowIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "plus":
      return (
        <PlusIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "search":
      return (
        <SearchIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "star":
      return (
        <StarIcon
          width={size || width}
          height={size || height}
          viewBox={`0 0 24 24`}
          className={customClassname && customClassname}
        />
      );
    case "watched":
      return (
        <WatchedIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "404":
      return (
        <NotFoundIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "password":
      return (
        <Password
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "showPass":
      return (
        <ShowPassIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "hidePass":
      return (
        <HidePassIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "email":
      return (
        <EmailIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "videoPlay":
      return (
        <VideoPlayIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "link":
      return (
        <LinkIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
    case "thankYou":
      return (
        <ThankYouIcon
          width={size || width}
          height={size || height}
          className={customClassname && customClassname}
        />
      );
  }
};

export default Icon;
