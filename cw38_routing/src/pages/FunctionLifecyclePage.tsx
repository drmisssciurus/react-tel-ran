import { useEffect, useState } from "react";
import { loadRates } from "../api/ratesApi";
import type { CurrencyCode, RatesStatus } from "../types";
import { convertCurrency, currencies, formatDateTime } from "../utils/currency";

type ConverterControls = {
    amount: number;
    from: CurrencyCode;
    to: CurrencyCode;
};

function FunctionLifecyclePage() {
    const [controls, setControls] = useState<ConverterControls>({
        amount: 100,
        from: "EUR",
        to: "USD",
    });

    const [status, setStatus] = useState<RatesStatus>({
        type: "idle",
        message: "Rates are not loaded yet",
    });

    async function loadCurrencyRates(forceRefresh = false) {
        setStatus({
            type: "loading",
            message: "Loading rates...",
        });

        try {
            const result = await loadRates(forceRefresh);

            setStatus({
                type: "success",
                result,
            });
        } catch (error) {
            setStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load rates",
            });
        }
    }

    useEffect(() => {
        void loadCurrencyRates();
    }, []);

    function updateControls(partialControls: Partial<ConverterControls>) {
        setControls((currentControls) => ({
            ...currentControls,
            ...partialControls,
        }));
    }

    const ratesData =
        status.type === "success" ? status.result.data : undefined;

    const result = convertCurrency(
        controls.amount,
        controls.from,
        controls.to,
        ratesData
    );

    return (
        <section className="panel">
            <p className="eyebrow">Currency converter</p>
            <h2>Function component converter</h2>

            <ConverterForm
                controls={controls}
                onChange={updateControls}
                onRefresh={() => void loadCurrencyRates(true)}
            />

            <RatesSummary
                result={result}
                status={status}
                to={controls.to}
            />
        </section>
    );
}

type ConverterFormProps = {
    controls: ConverterControls;
    onChange: (partialControls: Partial<ConverterControls>) => void;
    onRefresh: () => void;
};

function ConverterForm({ controls, onChange, onRefresh }: ConverterFormProps) {
    return (
        <div className="converter-grid">
            <label>
                Amount
                <input
                    min="0"
                    onChange={(event) =>
                        onChange({ amount: Number(event.target.value) })
                    }
                    type="number"
                    value={controls.amount}
                />
            </label>

            <label>
                From
                <select
                    onChange={(event) =>
                        onChange({ from: event.target.value as CurrencyCode })
                    }
                    value={controls.from}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                To
                <select
                    onChange={(event) =>
                        onChange({ to: event.target.value as CurrencyCode })
                    }
                    value={controls.to}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </label>

            <button type="button" onClick={onRefresh}>
                Refresh rates
            </button>
        </div>
    );
}

function RatesSummary({
                          result,
                          status,
                          to,
                      }: {
    result: number;
    status: RatesStatus;
    to: CurrencyCode;
}) {
    if (status.type === "loading" || status.type === "idle") {
        return <p className="muted">{status.message}</p>;
    }

    if (status.type === "error") {
        return <p className="error">{status.message}</p>;
    }

    return (
        <div className="result-box">
            <span>Result</span>

            <strong>
                {result.toFixed(2)} {to}
            </strong>

            <small>
                Source: {status.result.source}. Rates date:{" "}
                {status.result.data.date}. Cache expires:{" "}
                {formatDateTime(status.result.expiresAt)}.
            </small>
        </div>
    );
}

export default FunctionLifecyclePage;