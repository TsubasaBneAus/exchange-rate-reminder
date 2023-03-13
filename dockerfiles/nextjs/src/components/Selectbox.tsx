import React, { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import currencies from "../lib/currencies";
import styles from "../styles/Selectbox.module.css";

interface Props {
  setCurrency: Dispatch<SetStateAction<string | null>>;
}

interface SelectedOption {
  value: string;
  label: string;
}

const Selectbox = (props: Props) => {
  const { t } = useTranslation("");

  // Format each name of the label for each option
  const formattedOptions = currencies.map((each) => {
    const formattedLabel = `${each.name}: ${each.label}`;
    return { value: each.value, label: formattedLabel };
  });
  return (
    <Select
      className={styles.select}
      options={formattedOptions}
      placeholder={t("Selectbox.Placeholder")}
      isSearchable={true}
      onChange={(selectedOption: SingleValue<SelectedOption>) => {
        props.setCurrency(selectedOption!.value);
      }}
    />
  );
};

export default Selectbox;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};