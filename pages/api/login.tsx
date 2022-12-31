import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../lib/db";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);
    const query = "SELECT * FROM users WHERE email = ?";
    const value = [email];
    const data = await executeQuery(query, value);
    // console.log(data);

    res.status(200).json({ email: email, password: password });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default login;
