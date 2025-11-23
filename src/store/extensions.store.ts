import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Extension, FilterType } from "../types/extension";

interface ExtensionStore {
  extensions: Extension[];
  filteredExtensions: Extension[];
  currentFilter: FilterType;

  setCurrentFilter: (filter: FilterType) => void;
  setExtensions: (extensions: Extension[]) => void;
  setFilteredExtensions: (extensions: Extension[], filter: FilterType) => void;
  setIsActive: (id: number, newValue: boolean) => void;

  removeExtension: (id: number) => void;

  resetStore: () => void;
}

export const useExtensionsStore = create<ExtensionStore>()(
  devtools((set, get) => ({
    extensions: [],
    filteredExtensions: [],
    currentFilter: FilterType.ALL,

    setCurrentFilter: (filter: FilterType) =>
      set(() => ({
        currentFilter: filter,
      })),

    setExtensions: (extensions: Extension[]) =>
      set(() => ({
        extensions: extensions,
        filteredExtensions: extensions,
      })),

    setFilteredExtensions: (extensions: Extension[], filter: FilterType) => {
      switch (filter) {
        case FilterType.ALL:
          set(() => ({
            filteredExtensions: extensions,
          }));
          break;

        case FilterType.ACTIVE:
          set(() => ({
            filteredExtensions: extensions.filter((ext) => ext.isActive),
          }));

          break;

        case FilterType.INACTIVE:
          set(() => ({
            filteredExtensions: extensions.filter((ext) => !ext.isActive),
          }));

          break;

        default:
          break;
      }
    },

    setIsActive: (id: number, newValue: boolean) => {
      const extension = get().filteredExtensions.find(
        (extension) => extension.id === id
      );
      extension!.isActive = newValue;

      const updatedExtensions = get().filteredExtensions.filter((ext) =>
        ext.id === id ? extension! : ext
      );

      switch (get().currentFilter) {
        case FilterType.ALL:
          set(() => ({
            filteredExtensions: updatedExtensions,
          }));

          break;

        case FilterType.ACTIVE:
          set(() => ({
            filteredExtensions: updatedExtensions.filter((ext) => ext.isActive),
          }));

          break;

        case FilterType.INACTIVE:
          set(() => ({
            filteredExtensions: updatedExtensions.filter(
              (ext) => !ext.isActive
            ),
          }));

          break;

        default:
          break;
      }
    },

    removeExtension: (id: number) => {
      const updatedExtensions = get().extensions.filter(
        (extension) => extension.id !== id
      );
      set(() => ({
        extensions: updatedExtensions,
        filteredExtensions: updatedExtensions,
      }));
    },
  }))
);
