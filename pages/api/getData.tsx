import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../lib/db";

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = "SELECT * FROM users";
    const value: never[] = [];
    const data = await executeQuery(query, value);
    res.status(200).json({ results: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getData;
