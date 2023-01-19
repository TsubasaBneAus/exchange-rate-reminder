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

  // Check if users have already logged in
  if (session) {
    // Fetch currency data user set as preference
    const userPreference = await prisma.userPreference.findUnique({
      where: { id: session.user.id },
      select: {
        baseCurrency: true,
        convertedCurrency: true,
      },
    });

    // Fetch the latest exchange rate data
    const latestData = await prisma.exchangeRate.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const baseCurrency = userPreference?.baseCurrency as keyof ExchangeRate;
    const convertedCurrency =
      userPreference?.convertedCurrency as keyof ExchangeRate;

    // Check if users have already set their preferences of currencies
    if (baseCurrency !== null || convertedCurrency !== null) {
      const baseCurrencyValue = latestData![baseCurrency] as number;
      const convertedCurrencyValue = latestData![convertedCurrency] as number;
      const exchangeRate = convertedCurrencyValue / baseCurrencyValue;
      const finalisedExchangeRate = calcExchangeRate(exchangeRate);
      res.status(200).json({
        baseCurrency: baseCurrency,
        convertedCurrency: convertedCurrency,
        exchangeRate: finalisedExchangeRate,
      });
    } else {
      res.status(200).json({
        baseCurrency: null,
        convertedCurrency: null,
      });
    }
  } else {
    res.status(200).json({
      baseCurrency: null,
      convertedCurrency: null,
    });
  }
};

export default GetPreferences;
