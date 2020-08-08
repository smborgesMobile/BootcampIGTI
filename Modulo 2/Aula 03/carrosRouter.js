import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Get no carros");
  res.send("Get no carros");
});

router.get("/precos", (req, res) => {
  console.log("Precos");
  res.send("Seus precos são altos");
});

export default router;
