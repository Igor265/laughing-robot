import { Frown } from "lucide-react";

const NoProductsFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white p-6">
      <Frown className="w-16 h-16 text-gray-500 dark:text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Nenhum produto encontrado
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Não encontramos nenhum produto com os critérios de pesquisa. Tente novamente com outras palavras.
      </p>
    </div>
  );
};

export default NoProductsFound;
