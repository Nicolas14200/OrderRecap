import express, { Application } from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { AppDependencies } from "./AppDependencies";
import { RecapController } from "../modules/RecapController";

export function configureExpress(app: Application) {
  
    const container = new AppDependencies().init();
  
    app.use(express.json());
  
    useContainer(container);
  
    useExpressServer(app, {
      controllers: [RecapController],
    });
    return container;
  }