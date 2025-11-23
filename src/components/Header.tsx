import LogoLight from "/assets/images/logo-light.svg";
import LogoDark from "/assets/images/logo-dark.svg";
import MoonIcon from "/assets/images/icon-moon.svg";
import SunIcon from "/assets/images/icon-sun.svg";
import { useState } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const logo = !isDark ? LogoDark : LogoLight;

  const handleThemeColor = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between bg-card-bg p-2 rounded-lg">
      <img src={logo} alt="logo" />

      <button
        onClick={handleThemeColor}
        className="flex items-center justify-center bg-btn-theme-bg p-3 rounded-lg cursor-pointer hover:bg-btn-hover-bg transition-colors duration-200"
      >
        {!isDark ? (
          <img src={SunIcon} alt="sun" />
        ) : (
          <img src={MoonIcon} alt="moon" />
        )}
      </button>
    </div>
  );
};
