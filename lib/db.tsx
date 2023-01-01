import mysql from "mysql2/promise";

const executeQuery = async (query: string, values: string[]) => {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  try {
    const [results] = await db.execute(query, values);
    db.end();
    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default executeQuery;
