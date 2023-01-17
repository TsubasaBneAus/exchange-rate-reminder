import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

const GetPreferences = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
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
