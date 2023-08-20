// src/logger.ts
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ message }) => {
      return `${message}`;
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;
