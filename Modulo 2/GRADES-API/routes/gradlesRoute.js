import express from "express";
import { promises as fs } from "fs";
import moment from "moment";

const router = express.Router();

global.fileName = "grades.json";

// 1 -  Criar o endpoint para inserção de um novo student no arquivo.
router.post("/", async (req, res, next) => {
  try {
    let grade = req.body;

    if (
      !grade.type ||
      grade.value == null ||
      !grade.subject ||
      !grade.student
    ) {
      throw new Error("Todos os valores devem ser preenchidos, obrigado!");
    }

    const data = JSON.parse(await fs.readFile(fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: moment(),
    };

    data.grades.push(grade);
    await fs.writeFile(fileName, JSON.stringify(data));

    res.send(grade);
  } catch (err) {
    next(err);
  }
});

// 2 - Criar um novo end point para atualizar os dados de um student
router.patch("/", async (req, res, next) => {
  try {
    let gradle = req.body;

    const data = JSON.parse(await fs.readFile(fileName));
    const index = data.grades.findIndex((a) => gradle.id === a.id);

    if (typeof index === "undefined") {
      throw new Error("Esse usuário não existe na lista!");
    }

    data.grades[index].student = gradle.student;
    data.grades[index].type = gradle.type;
    data.grades[index].student = gradle.student;
    data.grades[index].subject = gradle.subject;
    data.grades[index].value = gradle.value;

    console.log(data);

    await fs.writeFile(fileName, JSON.stringify(data));

    res.end();
  } catch (err) {
    next(err);
  }
});

// 3 - Criar um novo end point para deletar uma grade.
router.delete("/:id", async (req, res, next) => {
  try {
    let deletedId = req.params.id;
    const data = JSON.parse(await fs.readFile(fileName));
    const filteredList = data.grades.filter(
      (grade) => grade.id !== parseInt(deletedId)
    );

    if (!filteredList) {
      throw new Error("Esse usuário não existe na lista!");
    }

    data.grades = filteredList;

    console.log(filteredList);
    await fs.writeFile(fileName, JSON.stringify(data));
    res.end();
  } catch (err) {
    next(err);
  }
});

// 4 - Criar um novo end point para trazer uma grade recebendo um id.dados_pessoais
router.get("/:id", async (req, res, next) => {
  try {
    let queryId = req.params.id;
    const data = JSON.parse(await fs.readFile(fileName));

    const filteredData = data.grades.filter(
      (grade) => grade.id === parseInt(queryId)
    );

    res.send(filteredData);
  } catch (err) {
    next(err);
  }
});

// 5 - Criar um novo end point para trazer uma somátorias de pontos do subject e aluno.dados_pessoais
router.get("/", async (req, res, next) => {
  try {
    let body = req.body;
    const data = JSON.parse(await fs.readFile(fileName));

    const filteredArray = data.grades.filter(
      (grade) =>
        grade.student === body.student && grade.subject === body.subject
    );
    let sum = 0;

    if (filteredArray.length == 0) {
      throw new Error("Não existem lancamento para esse aluno");
    }

    filteredArray.forEach((item, index) => {
      sum += item.value;
    });

    const nota = {
      aluno: body.student,
      nota: sum,
    };

    res.send(nota);
  } catch (err) {
    next(err);
  }
});


router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

// Exportando o módulo em questão.
export default router;
