import express from "express";

const app = express();
app.use(express.json());

// Libera o acesso ao arquivo de forma estática.
app.use(express.static("public"));

// Libera o acesso ao arquivo de forma estática. Rota virtual.
app.use("/images", express.static("public"));

app.listen(3000, () => {
    console.log("Subiu na porta 3000");
})