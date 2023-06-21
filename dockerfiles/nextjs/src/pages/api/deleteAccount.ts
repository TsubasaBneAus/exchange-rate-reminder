import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from 'next-auth/next';
import prisma from "../../lib/prisma";

// Delete user account from the database
const DeleteAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  // Check if a user has already signed up or logged in
  if (session) {
    // Delete all records of the user from the database
    const deletedRecords = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    res.status(200).json(deletedRecords);
  }
};

export default DeleteAccount;
