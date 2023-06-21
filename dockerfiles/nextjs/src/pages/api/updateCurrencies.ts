import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from 'next-auth/next';
import prisma from "../../lib/prisma";

// Update user preference of currencies used for the exchange rate
const UpdateCurrencies = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  const result = await prisma.userPreference.update({
    where: {
      id: session?.user.id,
    },
    data: {
      base: req.body.base,
      converted: req.body.converted,
    },
  });
  res.status(200).json(result);
};

export default UpdateCurrencies;
