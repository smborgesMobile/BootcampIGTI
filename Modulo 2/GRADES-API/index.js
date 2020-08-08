import express from "express";
import gradreRouter from "./routes/gradlesRoute.js";
import cors from "cors";
import { promises as fs } from "fs";

const app = express();

// Criar um post para inserção de uma nova nota.
app.use(express.json());
//Redireciona para o account routers.
app.use("/gradlesRoute", gradreRouter);
app.use(cors());

// 6 - Criar um novo end point para trazer uma media das materias.
app.get("/media", async (req, res, next) => {
    try {
      let body = req.body;
      const data = JSON.parse(await fs.readFile(fileName));
  
      const filteredArray = data.grades.filter(
        (grade) =>
          grade.type === body.type && grade.subject === body.subject
      );
      let sum = 0;
  
      if (filteredArray.length == 0) {
        throw new Error("Não existem lancamento para esse aluno");
      }
  
      filteredArray.forEach((item, index) => {
        sum += item.value;
      });
  
      const nota = {
        subject: body.subject,
        nota: sum/filteredArray.length,
      };
  
      res.send(nota);
    } catch (err) {
      next(err);
    }
  });

  // 6 - Criar um novo end point para trazer uma media das materias.
app.get("/maioresNotas", async (req, res, next) => {
    try {
      let body = req.body;
      const data = JSON.parse(await fs.readFile(fileName));
  
      const filteredArray = data.grades.filter(
        (grade) =>
          grade.type === body.type && grade.subject === body.subject
      );
      let sum = 0;
  
      if (filteredArray.length == 0) {
        throw new Error("Não existem lancamento para esse aluno");
      }

      filteredArray.sort((a, b) => {
          return b.value - a.value;
      })

      console.log(filteredArray);

  
      res.send(filteredArray.slice(0, 3));
    } catch (err) {
      next(err);
    }
  });

app.listen(3000, ()=> {
    console.log("Grade API is running");
})
