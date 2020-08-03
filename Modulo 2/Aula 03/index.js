import express from "express";

//Criando uma nova instancia do express.
const app = express();

// Avisa o express que queremos que usar um json.
app.use(express.json());

// Declara uma rota para a raiz da nossa aplicação.
// Arrow function com parametros (request, response)
app.get("/", (_req, res) => {
  res.send("Hello World 3");
});

app.post("/", (_req, res) => {
  const A = 10;
  const B = 15;
  const C = A + B;

  res.send("Resultado: " + C);
});

// Declara uma rota para a raiz da nossa aplicação.
// Arrow function com parametros (request, response)
app.all("/testAll", (req, res) => {
  res.send(req.method);
});

//Interrogração a letra imediatamente anterior a ela é opcional
app.get("/test?", (_req, res) => {
  res.send("/test?");
});

// + Indicar que a letra anterior a ele pode ser repetida varias vezes.
app.get("/test+", (_req, res) => {
  res.send("/test+");
});

//Tudo entra as palavras deve funcionar.
app.get("/one*blue", (req, res) => {
  res.send(req.path);
});

//Tudo que está entra parenteses se torna opcional.
app.post("/test(ing)?", (req, res) => {
  console.log(req.body);
  res.send(req.path);
});

// Paramêtros na rota!
// Também aceita expressões regulares;
app.get("/testParam/:id?/:name", (req, res) => {
  res.send(req.params.id + " " + req.params.name);
});

// Parametros via query
app.get("/testQuery", (req, res) => {
  res.send(req.query);
});

app.get(
  "/testMultipleHandlers",
  (req, resp, next) => {
    console.log("Callback 1");
    next();
  },
  (req, res) => {
    console.log("Callback 2");
    res.end();
  }
);

app
  .route("/testRoute")
  .get((req, res) => {
    res.send("Route get");
  })
  .post((req, res) => {
    res.send("Route post");
  })
  .delete((req, resp) => {
    resp.send("Route delete");
  });

// Startando o servidor;
app.listen(3000, () => {
  console.log("Api started");
});
