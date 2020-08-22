import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    minWidth: "200px",
  },
});

const SelectCurrency = ({
  variant = "source",
  label,
  defaultValue,
  onCurrencyChange,
  currencyOptions,
}) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={defaultValue}
          onChange={onCurrencyChange}
          multiple={variant === "target"}
        >
          {currencyOptions.map((currency) => {
            return (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCurrency;
