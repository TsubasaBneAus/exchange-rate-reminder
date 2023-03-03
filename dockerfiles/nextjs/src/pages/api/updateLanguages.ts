import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// Update user preference of languages
const UpdateLanguages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const result = await prisma.userPreference.update({
    where: {
      id: session?.user.id,
    },
    data: {
      language: req.body.language,
    },
  });
  res.status(200).json(result);
};

export default UpdateLanguages;
