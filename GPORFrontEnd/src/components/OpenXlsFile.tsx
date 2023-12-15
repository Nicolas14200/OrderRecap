import { callApi } from "../callApi/CallApi";

export function OpenXlsFile() {
  const readXlsFile = () => {
    callApi.openXlsFile();
  };

  return (
    <>
      <button
        onClick={readXlsFile}
        className="border-2 p-[8px] mb-[8px] hover:bg-lime-100"
      >
        Ouvrir le fichier Excel
      </button>
    </>
  );
}
