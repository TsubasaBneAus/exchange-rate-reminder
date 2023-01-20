import { ExchangeRate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// Get user preferences of currencies used for the exchange rate from database
const GetPreferences = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  // Calculate the exchange rate
  const calcExchangeRate = (exchangeRate: number) => {
    // Round exchangeRate to 3 decimal places
    exchangeRate = exchangeRate * 100;
    exchangeRate = Math.round(exchangeRate);
    exchangeRate = exchangeRate / 100;
    return exchangeRate;
  };

  // Check if users have already signed up or logged in
  if (session) {
    // Fetch currency data user set as preference
    const userPreference = await prisma.userPreference.findUnique({
      where: { id: session.user.id },
      select: {
        base: true,
        converted: true,
      },
    });

    // Fetch the latest exchange rate data
    const latestData = await prisma.exchangeRate.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const base = userPreference?.base as keyof ExchangeRate;
    const converted = userPreference?.converted as keyof ExchangeRate;

    // Check if users have already set their preferences of currencies
    if (base !== null && converted !== null) {
      const baseValue = latestData![base] as number;
      const convertedValue = latestData![converted] as number;
      const exchangeRate = convertedValue / baseValue;
      const finalisedExchangeRate = calcExchangeRate(exchangeRate);
      res.status(200).json({
        base: base,
        converted: converted,
        exchangeRate: finalisedExchangeRate,
      });
    } else {
      res.status(200).json({
        base: null,
        converted: null,
      });
    }
  } else {
    res.status(200).json({
      base: null,
      converted: null,
    });
  }
};

export default GetPreferences;
