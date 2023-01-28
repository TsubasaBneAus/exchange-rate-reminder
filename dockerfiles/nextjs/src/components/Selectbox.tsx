import React, { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
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
  // Format each name of the label for each option
  const formattedOptions = currencies.map((each) => {
    const formattedLabel = `${each.name}: ${each.label}`;
    return { value: each.value, label: formattedLabel };
  });
  return (
    <Select
      className={styles.select}
      options={formattedOptions}
      isSearchable={true}
      onChange={(selectedOption: SingleValue<SelectedOption>) => {
        props.setCurrency(selectedOption!.value);
      }}
    />
  );
};

export default Selectbox;
