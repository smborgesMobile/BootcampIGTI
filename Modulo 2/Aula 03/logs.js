import express from "express";
import winston from "winston";

const app = express();
app.use(express.json());

const {combine, printf, label, timestamp} = winston.format;

const myFormat = printf(({
    level,
    message,
    label, 
    timestamp
}) => {
    return `${timestamp} [${label}]  [${level}] : [${message}]`;
});

//Criar o looger do winstom
const logger = winston.createLogger({
  level: "warn",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-log.log" })
  ],
  format: combine(
    label({label: "my-app"}),
    timestamp(),
    myFormat
  )
});

// Os niveis são definidos de ordem crescente inciando no nivel (Silly).
logger.error("Error log");
logger.warn("Warning log");
logger.info("Info log");
logger.debug("Debug log");
logger.silly("Silly log");
logger.log("info", "Hellow with parameter");



app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
