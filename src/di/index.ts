import Container from "typedi";
import { LoggerToken } from "./tokens";
import winston, { createLogger } from "winston";

export * from "./tokens";

export async function setupContainer(): Promise<void> {
  // DI, here we can inject dependency for our app container
  // Can be AWS connectors, third party services etc.

  Container.set(
    LoggerToken,
    createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "ewa-service" },
      transports: [new winston.transports.Console()],
    })
  );
}
