import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadRates } from "../api/ratesApi";
import type { CurrencyCode, RatesStatus } from "../types";
import { convertCurrency, currencies, formatDateTime, isCurrencyCode } from "../utils/currency";

function RoutePresentPage() {
    const { from, to } = useParams<{ from: string; to: string }>();

    const [amount, setAmount] = useState(100);

    const [status, setStatus] = useState<RatesStatus>({
        type: "idle",
        message: "Rates are not loaded yet",
    });

    const fromValid = isCurrencyCode(from);
    const toValid = isCurrencyCode(to);
    const paramsValid = fromValid && toValid;

    useEffect(() => {
        if (!paramsValid) {
            return;
        }

        let cancelled = false;

        setStatus({ type: "loading", message: "Loading rates..." });

        loadRates()
            .then((result) => {
                if (!cancelled) {
                    setStatus({ type: "success", result });
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setStatus({
                        type: "error",
                        message:
                            error instanceof Error
                                ? error.message
                                : "Failed to load rates",
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [from, to]);

    if (!paramsValid) {
        return (
            <section className="panel">
                <p className="eyebrow">Currency converter</p>
                <h2>Invalid currency pair</h2>
                <p className="error">
                    The pair "{from}/{to}" is not supported. Allowed
                    currencies are: {currencies.join(", ")}.
                </p>
                <div className="home-actions">
                    <Link to="/">Back to home</Link>
                </div>
            </section>
        );
    }

    const ratesData = status.type === "success" ? status.result.data : undefined;
    const result = convertCurrency(amount, from as CurrencyCode, to as CurrencyCode, ratesData);

    return (
        <section className="panel">
            <p className="eyebrow">Currency converter</p>
            <h2>
                {from} → {to}
            </h2>

            <div className="amount-field">
                <label>
                    Amount
                    <input
                        min="0"
                        onChange={(event) => setAmount(Number(event.target.value))}
                        type="number"
                        value={amount}
                    />
                </label>
            </div>

            {status.type === "loading" || status.type === "idle" ? (
                <p className="muted">{status.message}</p>
            ) : status.type === "error" ? (
                <p className="error">{status.message}</p>
            ) : (
                <div className="result-box">
                    <span>Result</span>

                    <strong>
                        {amount} {from} = {result.toFixed(2)} {to}
                    </strong>

                    <small>
                        Source: {status.result.source}. Rates date:{" "}
                        {status.result.data.date}. Cache expires:{" "}
                        {formatDateTime(status.result.expiresAt)}.
                    </small>
                </div>
            )}
        </section>
    );
}

export default RoutePresentPage;
