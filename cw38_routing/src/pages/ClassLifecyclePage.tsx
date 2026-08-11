import { Component } from "react";
import { loadRates } from "../api/ratesApi";
import type { CurrencyCode, RatesStatus } from "../types";
import { convertCurrency, currencies, formatDateTime } from "../utils/currency";

type ConverterControls = {
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
};

type ClassLifecyclePageState = {
  controls: ConverterControls;
  status: RatesStatus;
};

class ClassLifecyclePage extends Component<object, ClassLifecyclePageState> {
  state: ClassLifecyclePageState = {
    controls: {
      amount: 100,
      from: "EUR",
      to: "USD",
    },
    status: {
      type: "idle",
      message: "Rates are not loaded yet",
    },
  };

  componentDidMount() {
    void this.loadCurrencyRates();
  }

  async loadCurrencyRates(forceRefresh = false) {
    this.setState({
      status: {
        type: "loading",
        message: "Loading rates...",
      },
    });

    try {
      const result = await loadRates(forceRefresh);

      this.setState({
        status: {
          type: "success",
          result,
        },
      });
    } catch (error) {
      this.setState({
        status: {
          type: "error",
          message:
              error instanceof Error
                  ? error.message
                  : "Failed to load rates",
        },
      });
    }
  }

  updateControls = (partialControls: Partial<ConverterControls>) => {
    this.setState((currentState) => ({
      controls: {
        ...currentState.controls,
        ...partialControls,
      },
    }));
  };

  render() {
    const { controls, status } = this.state;

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
          <h2>Class component converter</h2>

          <ConverterForm
              controls={controls}
              onChange={this.updateControls}
              onRefresh={() => void this.loadCurrencyRates(true)}
          />

          <RatesSummary
              result={result}
              status={status}
              to={controls.to}
          />
        </section>
    );
  }
}

type ConverterFormProps = {
  controls: ConverterControls;
  onChange: (partialControls: Partial<ConverterControls>) => void;
  onRefresh: () => void;
};

class ConverterForm extends Component<ConverterFormProps> {
  render() {
    const { controls, onChange, onRefresh } = this.props;

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
                    onChange({
                      from: event.target.value as CurrencyCode,
                    })
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
                    onChange({
                      to: event.target.value as CurrencyCode,
                    })
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
}

type RatesSummaryProps = {
  result: number;
  status: RatesStatus;
  to: CurrencyCode;
};

class RatesSummary extends Component<RatesSummaryProps> {
  render() {
    const { result, status, to } = this.props;

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
}

export default ClassLifecyclePage;