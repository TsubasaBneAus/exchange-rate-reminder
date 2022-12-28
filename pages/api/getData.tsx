import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const query = "SELECT * FROM users";
    const values: never[] = [];
    const [data] = await db.execute(query, values);
    db.end();
    res.status(200).json({ results: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getData;
