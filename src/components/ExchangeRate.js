import React from "react";


export default function ExchangeRate({exchangedData}) {

    return (
        <div className="exchange--rate">
            <h3>Exchange Rate</h3>
            <h1>{parseFloat(exchangedData.exchangeRate).toFixed(2)}</h1>
            <p>{exchangedData.primaryCurrency} to {exchangedData.secondaryCurrency}</p>
        </div>
    )
}