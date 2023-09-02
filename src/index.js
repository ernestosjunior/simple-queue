const express = require("express");
const cors = require("cors");
const db = require("./database");
const controllers = require("./controllers");

const Bull = require("bull");

const Queue = new Bull("Queue", {
  redis: { port: 6379, host: "redis" },
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", async (_, res) => {
  return res.json({ message: "Ok" });
});

app.get("/inventory", async (_, res) => {
  const sql = "SELECT * FROM db WHERE id = 1";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json({ available_total: rows?.at(0)?.total });
  });
});

app.post("/update-inventory", controllers.updateInventory);

app.post("/decrement-inventory", (_, res) => {
  Queue.add();
  return res.sendStatus(200);
});

Queue.process(async () => {
  return controllers.decrementOnInventory();
});

app.listen(3000, () => console.log(`Server is running on PORT 3000`));
