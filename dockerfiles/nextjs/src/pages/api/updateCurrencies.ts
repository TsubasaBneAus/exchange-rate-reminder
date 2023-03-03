import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// Update user preference of currencies used for the exchange rate
const UpdateCurrencies = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
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
