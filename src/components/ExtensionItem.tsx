import { useRef, useState } from "react";
import type { Extension } from "../types/extension";
import { useExtensionsStore } from "../store/extensions.store";

type Props = {
  extension: Extension;
};

export const ExtensionItem = ({ extension }: Props) => {
  const { id, logo, name, description, isActive: isActiveData } = extension;

  const { removeExtension, setIsActive } = useExtensionsStore();

  const card = useRef(null);

  const [isActiveState, setIsActiveState] = useState(isActiveData);

  const handleChange = () => {
    setIsActive(id, !isActiveState);
    setIsActiveState((prev) => !prev);
  };

  const handleClick = () => {
    removeExtension(id);
  };

  return (
    <article
      ref={card}
      className="max-w-xs flex flex-col justify-between bg-card-bg border border-card-border p-4 rounded-xl"
    >
      <div className="flex items-start gap-4">
        <img src={logo} alt={`${name} logo`} />

        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handleClick}
          className="outline-1 outline-Neutral-0 rounded-full py-1 px-4 cursor-pointer hover:bg-btn-hover-bg transition-colors duration-200 focus:outline focus:outline-Red-400"
        >
          Remove
        </button>

        <label className="inline-flex items-center cursor-pointer">
          <input
            name="extensionStatus"
            type="checkbox"
            checked={isActiveState}
            className="sr-only peer"
            onChange={handleChange}
          />
          <div className="relative w-9 h-5 bg-neutral-quaternary rounded-full peer peer-focus:ring-4 bg-gray-700 peer-focus:ring-Red-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-Red-400"></div>
        </label>
      </div>
    </article>
  );
};
