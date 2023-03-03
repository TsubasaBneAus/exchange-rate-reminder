import { ExchangeRate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// Get user preference of currencies used for the exchange rate from database
const getPreference = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  // Calculate the exchange rate
  const calcExchangeRate = (exchangeRate: number) => {
    // Round exchangeRate to 3 decimal places
    exchangeRate = exchangeRate * 100;
    exchangeRate = Math.round(exchangeRate);
    exchangeRate = exchangeRate / 100;
    return exchangeRate;
  };

  // Check if a user has already signed up or logged in
  if (session) {
    // Fetch currency data user set as preference
    const userPreference = await prisma.userPreference.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        language: true,
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

    const language = userPreference?.language;
    const base = userPreference?.base as keyof ExchangeRate;
    const converted = userPreference?.converted as keyof ExchangeRate;

    // Check if a user has already set their preference of currencies
    if (base !== null && converted !== null) {
      const baseValue = latestData![base] as number;
      const convertedValue = latestData![converted] as number;
      const exchangeRate = convertedValue / baseValue;
      const finalisedExchangeRate = calcExchangeRate(exchangeRate);
      res.status(200).json({
        language: language,
        base: base,
        converted: converted,
        exchangeRate: finalisedExchangeRate,
        fetchedDatetime: latestData!["fetched_datetime"],
      });
    } else {
      res.status(200).json({
        language: null,
        base: null,
        converted: null,
        fetchedDatetime: null,
      });
    }
  }
};

export default getPreference;
