import { NextApiRequest, NextApiResponse } from "next";

const login = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "John Doe" });
}

export default login;