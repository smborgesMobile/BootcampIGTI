import express from "express";
import { promises as fs, readFile, writeFile } from "fs";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name or balance is invalid");
    }

    //Lendo o arquivo asincronamente.
    const readedFile = await fs.readFile(global.fileName);
    // Parseou a promisse para o json atual.
    const data = JSON.parse(readedFile);

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance
    };

    // Estamos incluindo o json do request no body.
    data.accounts.push(account);

    //Devemos escrever novamente no arquivo.
    await fs.writeFile("accounts.json", JSON.stringify(data));

    res.end();
  } catch (err) {
    // Envia o erro 400 caso aconteca um erro ao ler o arquivo.
    next(err)
  }
});

router.get("/", async (req, res, next) => {
  try {
    //Peguei os dados de um arquivo e coloquei em um json.
    const data = JSON.parse(await fs.readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //Peguei os dados de um arquivo e coloquei em um json.
    const data = JSON.parse(await fs.readFile(global.fileName));
    console.log("Data:  " + data.accounts);

    const user = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    console.log("User: " + user);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  //Peguei os dados de um arquivo e coloquei em um json.
  try {
    const data = JSON.parse(await fs.readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    next(err);
  }
});

//Atualizar o recurso de forma integral
router.put("/", async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name or balance is invalid");
    }

    const data = JSON.parse(await fs.readFile(global.fileName));
    const index = data.accounts.findIndex((a) => account.id === a.id);

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.name;

    await fs.writeFile(global.fileName, JSON.stringify(data));

    res.send(account);
  } catch (err) {
    next(err)
  }
});

//Atualizar somente um campo
router.patch("/", async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await fs.readFile(global.fileName));
    const index = data.accounts.findIndex((a) => account.id === a.id);

    data.accounts[index].balance = account.balance;

    await fs.writeFile(global.fileName, JSON.stringify(data));

    res.send(account);
  } catch (err) {
    next(err)
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  global.logger.error(err.message);
  res.status(400).send({ error: err.message });
});

// Exportando o módulo em questão.
export default router;
