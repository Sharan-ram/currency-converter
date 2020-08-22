import React, { useState, useEffect } from "react";
import axios from "axios";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { makeStyles } from "@material-ui/core/styles";

import LoadingScreen from "./ui/LoadingScreen";

const CURRENCY_EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

const useStyles = makeStyles({
  sourceAndTargetWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "20px",
    justifyItems: "center",
  },
  formControl: {
    minWidth: "200px",
  },
  table: {
    marginTop: "20px",
  },
});

function App() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [currencyRates, setCurrencyRates] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("INR");
  const [targetCurrency, setTargetCurrency] = useState(["USD"]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const url = `${CURRENCY_EXCHANGE_URL}?base=${sourceCurrency}`;
        let {
          data: { base, rates },
        } = await axios.get(url);

        // Adding this because the exchange rates API does not send EUR currency
        // value if the source is EUR, for any other source currency,the API
        // sends the currency value as 1.0
        // For example, if source currency is INR, the API sends INR value as 1.0
        // https://exchangeratesapi.io/
        if (sourceCurrency === "EUR") {
          rates.EUR = 1.0;
        }

        setSourceCurrency(base);
        setCurrencyRates(rates);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
        setIsLoading(false);
      }
    })();
  }, [sourceCurrency]);

  if (isLoading) return <LoadingScreen />;
  if (Object.keys(currencyRates).length === 0) return null;

  const currencyOptions = [...Object.keys(currencyRates)];

  return (
    <div className={classes.sourceAndTargetWrapper}>
      <div>
        <div>
          <h3>Source Currency</h3>
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel>Source Currency</InputLabel>
            <Select
              value={sourceCurrency}
              onChange={(e) => setSourceCurrency(e.target.value)}
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
      </div>
      <div className={classes.target}>
        <h3>Target Currencies</h3>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Target Currency</InputLabel>
          <Select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            multiple
          >
            {currencyOptions.map((currency) => {
              return (
                <MenuItem
                  key={currency}
                  disabled={sourceCurrency === currency}
                  value={currency}
                >
                  {currency}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetCurrency.map((currency) => {
                  return (
                    <TableRow hover key={currency}>
                      <TableCell>{currency}</TableCell>
                      <TableCell>{currencyRates[currency]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
