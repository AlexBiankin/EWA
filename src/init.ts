import "reflect-metadata";
import { Application } from "express";
import { useContainer, createExpressServer } from "routing-controllers";
import Container from "typedi";
import { RiskController } from "./controllers";
import { setupContainer, LoggerToken } from "./di";

export const BASE_PATH = "/api/v1";
export const DEFAULT_PORT = 5000;

export async function init(): Promise<Application> {
  await setupContainer();
  useContainer(Container);
  const logger = Container.get(LoggerToken);

  const app = createExpressServer({
    controllers: [RiskController],
    routePrefix: BASE_PATH,
  });

  app.set("port", DEFAULT_PORT);
  app.on("app-error", (error: Error) => logger.error(error));

  return app;
}
