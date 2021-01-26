import "reflect-metadata";
import Container from "typedi";
import { init } from "./init";
import { LoggerToken } from "./di";

(async () => {
  const app = await init();
  const logger = Container.get(LoggerToken);

  app.listen(app.get("port"), () => {
    logger.info(`Server listening at port ${app.get("port")}`);
  });
})();
