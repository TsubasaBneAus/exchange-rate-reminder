import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from 'next-auth/next';
import prisma from "../../lib/prisma";

// Update a language in user preference
const UpdateLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
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

export default UpdateLanguage;
