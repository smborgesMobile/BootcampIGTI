import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs} from "fs";
import winston from "winston";
import cors from "cors";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp})=> {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

global.fileName = "accounts.json";
global.logger = winston.createLogger(
  {
    level: "silly", 
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File) ({
        filename: "my-bank-api.log"
      })
    ],
    format: combine (
      label({label: "my-bank-api"}),
      timestamp(),
      myFormat
    )
  }
);

const app = express();
app.use(express.json());
app.use(express.static("public"));
// Abre a API para dominios fora do projeto.
app.use(cors())

//Redireciona para o account routers.
app.use("/account", accountsRouter);
app.listen(3000, createFile);

async function createFile() {
  try {
    await fs.readFile(global.fileName);
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    //Caso não exista cria um novo arquivo.
    fs.writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        console.log("Novo Arquivo Criado");
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  logger.info("API Started");
}
