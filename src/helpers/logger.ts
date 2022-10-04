import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ level: "error", filename: "logs/error.log" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  format: winston.format.colorize(),
});

export default logger;
