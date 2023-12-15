import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { xlsxCreateWorkBook } from "../viewModel/XlsxCreateWorkBook";
import { WorkBook } from "xlsx";
import { callApi } from "../callApi/CallApi";
import DataTable from "./DataTable";
import { VegetableInfo } from "../core/type/VegetableInfo";

export function DropZone() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [data, setData] = useState<VegetableInfo[]>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newWorkBooks: WorkBook[] = [];
    const newFileName: string[] = [];
    await Promise.all(
      acceptedFiles.map(async (file) => {
        setFileNames((fileNames) => [...fileNames, file.name]);
        const binaryStr = await readFileAsync(file);
        const workBook: WorkBook = xlsxCreateWorkBook.execute(binaryStr);
        newWorkBooks.push(workBook);
        newFileName.push(file.name);
      })
    );

    await initRecap(newWorkBooks, newFileName);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const files = fileNames.map((fileName: string, index: number) => (
    <li key={index}>{fileName}</li>
  ));

  const initRecap = async (workBooks: WorkBook[], newFileName: string[]) => {
    const result = await callApi.initRecap(workBooks, newFileName);
    setData(result.data);
    console.log("result", result.data);
  };

  return (
    <>
      <section className="container">
        <div className="flex flex-col items-center justify-center">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p className="border-2 hover:bg-lime-100 inline-block p-[8px]">
              SELECT FILE
            </p>
          </div>
          <aside>
            <h4>Files :</h4>
            <ul>{files}</ul>
          </aside>
          <DataTable rows={data} />
        </div>
      </section>
    </>
  );
}

async function readFileAsync(file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
