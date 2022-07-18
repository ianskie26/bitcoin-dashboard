import React from "react";
import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

export default function CurrencyConverter() {

    const currencies = ['BTC', 'USD','ETH']
    const [primaryCurrency, setPrimaryCurrency] = useState('BTC')
    const [secondaryCurrency, setSecondaryCurrency] = useState('BTC')
    
    // Default to 1 BTC / 1 USD 
    const [amount, setAmount] = useState(1)

    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })

    const [result, setResult] = useState(null)

    const convert = () => {
        const options = {
        method: 'GET',
        url: 'http://localhost:8000/convert',
        params: {from_currency: primaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: secondaryCurrency},
        }

        axios.request(options).then((response) => {
            setResult(response.data * amount)
            setExchangedData({
                primaryCurrency: primaryCurrency,
                secondaryCurrency: secondaryCurrency,
                exchangeRate: response.data
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className="currency--converter">
            <h2>Currency Converter</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={primaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                value={secondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="center">
                <button className="btn-grad" id="convert-button" onClick={convert}>Convert</button>
            </div>

            <ExchangeRate
                exchangedData={exchangedData}
            />
        </div>
    )
}