import { httpClient } from "./httpClient";
import { WorkBook } from "xlsx";

class CallApi {
    async initRecap (workBooks:WorkBook[], fileName: string[] ) {
        const recap = await httpClient.post("/init", {
            file: workBooks,
            fileName: fileName
        });
        return recap
    }
    async openXlsFile () {
        await httpClient.post("/openXlsFile", {
            filePath: "recap.xls",
            libreOfficePath: "D:\\program\\scalc.exe"
        });

    }
}
export const callApi = new CallApi();