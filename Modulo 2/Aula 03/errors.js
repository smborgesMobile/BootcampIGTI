import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
  throw new Error("Error test");
});

app.post("/", async (req, res, next) => {
  try {
    throw new Error("Error message assync");
  } catch (err) {
    next(err);
  }
});

// Persiste ao longo da execução.
app.use((err, req, res, next) => {
  console.log("Error 1");
  next(err);
});

// Persiste ao longo da execução.
app.use((err, req, res, next) => {
  console.log("Error 2");
  res.status(500).send("Ocorreu um erro no sistema! Try again later.");
});

// Rodando o servidor na porta 3000.
app.listen(3000, () => {
  console.log("API Started");
});
