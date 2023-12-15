import {  read } from "xlsx";

class XlsxCreateWorkBook {
  execute(link: string | ArrayBuffer | null) {
    return read(link, { sheetRows: 200 });
  }
}
export const xlsxCreateWorkBook = new XlsxCreateWorkBook();
