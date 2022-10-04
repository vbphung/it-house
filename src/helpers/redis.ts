import { createClient } from "@redis/client";
import config from "config";

import logger from "./logger";

const redis = createClient({
  url: config.get("redis.url"),
});

redis
  .connect()
  .then(() => logger.info("redis connected"))
  .catch((err) => logger.error("redis connect failed", err));

export default redis;
