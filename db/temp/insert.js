import { createDbConnection } from "./db.js";
const db = createDbConnection();

function insertRow() {
    const [name, color, weight] = ['Second', 'red',1700];
    db.run(
        `INSERT INTO sharks (name, color, weight) VALUES (?, ?, ?)`,
        [name, color, weight],
        function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a row with the ID: ${this.lastID}`);
        }
    );
}

// insertRow();

function selectRows() {
  db.each(`SELECT * FROM sharks`, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log(row);
  });
}

selectRows();