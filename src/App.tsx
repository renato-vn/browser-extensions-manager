import { Header, Filters, ExtensionItem } from "./components";
import { useEffect } from "react";
import { useExtensionsStore } from "./store/extensions.store";

const App = () => {
  const { setExtensions, filteredExtensions } = useExtensionsStore();

  // TODO: Implementar Remove Extension
  // TODO: Implementar filtros

  const getData = async () => {
    try {
      const response = await fetch("./constants/data.json");
      const json = await response.json();
      setExtensions(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="mx-5 my-5 md:mx-10 lg:mx-28 md:my-8">
      <Header />

      <section className="flex flex-col items-center md:items-start mt-10">
        <div className="md:flex md:w-full md:justify-between">
          <h1 className="text-3xl font-bold text-center">Extensions List</h1>

          <Filters />
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:justify-center mt-8">
          {filteredExtensions.map((extension) => (
            <ExtensionItem key={extension.name} extension={extension} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
