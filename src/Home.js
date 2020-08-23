import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import LoadingScreen from "./ui/LoadingScreen";
import SelectCurrency from "./SelectCurrency";

const CURRENCY_EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

const useStyles = makeStyles({
  sourceAndTargetWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "20px",
    justifyItems: "center",
  },
  amount: {
    width: "200px",
    marginTop: "20px",
  },
  table: {
    marginTop: "20px",
  },
});

function Home() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [currencyRates, setCurrencyRates] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("INR");
  const [targetCurrency, setTargetCurrency] = useState(["USD"]);
  const [amount, setAmount] = useState(1);

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
        <h3>Source Currency</h3>
        <SelectCurrency
          label="Select Source Currency"
          defaultValue={sourceCurrency}
          onCurrencyChange={(e) => setSourceCurrency(e.target.value)}
          currencyOptions={currencyOptions}
        />
        <div className={classes.amount}>
          <TextField
            type="number"
            label="Set Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3>Target Currencies</h3>
        <SelectCurrency
          variant="target"
          label="Select Target Currencies"
          defaultValue={targetCurrency}
          onCurrencyChange={(e) => setTargetCurrency(e.target.value)}
          currencyOptions={currencyOptions}
        />

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
                      <TableCell>{currencyRates[currency] * amount}</TableCell>
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

export default Home;
