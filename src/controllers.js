const db = require("./database");

function decrementOnInventory() {
  const sql = "SELECT * FROM db WHERE id = 1";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return;
    }

    const newTotal = rows?.at(0)?.total - 1;

    db.run(
      `UPDATE db set total = ? WHERE id = ?`,
      [newTotal, 1],
      function (err, result) {
        if (err) {
          return;
        }
        return {};
      }
    );
  });
}

function updateInventory(req, res) {
  db.run(
    `UPDATE db set total = ? WHERE id = ?`,
    [req.body.total, 1],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({});
    }
  );
}

module.exports = { decrementOnInventory, updateInventory };
