import React, { useState, useEffect } from "react";
import axios from "axios";

const CURRENCY_EXCHANGE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("EUR");

  console.log("currencyOptions", currencyOptions);
  console.log("sourceCurrency", sourceCurrency);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const url = `${CURRENCY_EXCHANGE_URL}?base=${sourceCurrency}`;
        const {
          data: { base, rates },
        } = await axios.get(url);

        setSourceCurrency(base);
        setCurrencyOptions(rates);
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
        setIsLoading(false);
      }
    })();
  }, [sourceCurrency]);

  return <div>Hello</div>;
}

export default App;
