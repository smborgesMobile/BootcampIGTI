import { promises as fs } from "fs";

function start() {
    writeAsync()
}

async function writeAsync() {
    try {
        await fs.writeFile("teste05.txt", "blablabla");
        await fs.appendFile("teste05.txt", "Valor apendado com async");
        const data = await fs.readFile("teste05.txt", "utf-8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

function writeFileWithPromises() {
  fs.writeFile("teste2.txt", "Com promise")
    .then(() => {
      fs.appendFile("teste2.txt", "Appendando datos")
        .then(() => {
          fs.readFile("teste2.txt", "utf-8")
            .then((resp) => {
              console.log(resp);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function writeFileWithoutPromisse() {
  fs.writeFile("teste.txt", "bla bla bla bla", (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.appendFile("teste.txt", "\nTeste concatenação\n", (error) => {
        if (error) {
          console.log(error);
        } else {
          fs.readFile("teste.txt", "utf-8", (error, data) => {
            if (err) {
              console.log(error);
            } else {
              console.log(data);
            }
          });
          console.log("Arquivo criado com sucesso");
        }
      });
    }
  });
}

start();
