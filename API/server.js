import express from "express";

const app = express();
const PORT = 3000;

const rodents = [
  { id: 1, name: "Chrupek", species: "hamster", age: "6" },
  { id: 2, name: "Puszek", species: "mouse", age: "12" },
  { id: 3, name: "Tuptuś", species: "guinea pig", age: "18" },
];


app.get("/api/rodents", (req, res) => {
  res.status(200).json(rodents);
});


app.get("/api/rodents/:id", (req, res) => {
  const { id } = req.params;


  if (isNaN(id)) {
    return res.status(400).json({ error: "Bad Request – ID should be a number" });
  }

  const rodent = rodents.find((r) => r.id === Number(id));

  if (!rodent) {
    return res.status(404).json({ error: "Animal not found" });
  }

  res.status(200).json(rodent);
});

// run server
app.listen(PORT, () => {
  console.log(`Rodent Analytics API runs on http://localhost:${PORT}`);
});