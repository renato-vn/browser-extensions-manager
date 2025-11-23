import { useState } from "react";
import { FilterType } from "../types/extension";
import { useExtensionsStore } from "../store/extensions.store";

export const Filters = () => {
  const [isActive, setIsActive] = useState<FilterType>(FilterType.ALL);
  const { setFilteredExtensions, extensions, setCurrentFilter } =
    useExtensionsStore();

  const handleClick = (filter: FilterType) => {
    setCurrentFilter(filter);
    setFilteredExtensions(extensions, filter);
    setIsActive(filter);
  };

  const getButtonStyles = (filterType: FilterType) => {
    return `${
      isActive === filterType
        ? "bg-Red-500 text-Neutral-0"
        : "bg-card-bg text-text hover:bg-btn-hover-bg"
    } py-2 px-5 rounded-full cursor-pointer transition-colors duration-200 focus:outline focus:outline-Red-400`;
  };

  return (
    <div className="flex gap-4 mt-4 md:mt-0">
      <button
        onClick={() => handleClick(FilterType.ALL)}
        className={getButtonStyles(FilterType.ALL)}
      >
        All
      </button>
      <button
        onClick={() => handleClick(FilterType.ACTIVE)}
        className={getButtonStyles(FilterType.ACTIVE)}
      >
        Active
      </button>
      <button
        onClick={() => handleClick(FilterType.INACTIVE)}
        className={getButtonStyles(FilterType.INACTIVE)}
      >
        Inactive
      </button>
    </div>
  );
};
