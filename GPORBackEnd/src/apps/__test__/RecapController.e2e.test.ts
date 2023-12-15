import "reflect-metadata";
import express from "express";
import request from "supertest";
import { configureExpress } from "../config/configureExpress";

const app = express();

configureExpress(app);

describe("e2e - RecapController", () => {
  it("Should return 200", async () => {
    await request(app)
      .get("/recap/")
      .expect((response) => {
        console.log(response.error);
      })
      .expect(200);
  });
  it("Should return 200", async () => {
    await request(app)
      .post("/recap/openXlsFile/")
      .send({
        filePath: "E:\\Gardin-Partageo\\Order_Recap\\GPORElectronAppV2\\GPORBackEnd\\recap.xls",
        libreOfficePath:"D:\\program\\scalc.exe",
      })
      .expect((response) => {
        console.log(response.error);
      })
      .expect(200);
  });
});
