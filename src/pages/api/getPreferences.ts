import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// Get user preferences of currencies used for the exchange rate
const GetPreferences = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  // Check if users have already logged in
  if (session) {
    const result = await prisma.userPreference.findUnique({
      where: { id: session.user.id },
      select: {
        baseCurrency: true,
        convertedCurrency: true,
      },
    });
    res.status(200).json(result);
  } else {
    res.status(200).json({ baseCurrency: null, convertedCurrency: null });
  }
};

export default GetPreferences;
