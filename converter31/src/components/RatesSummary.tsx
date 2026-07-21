import { Component } from 'react';
import type { CurrencyCode, RatesStatus } from '../types';

type RatesSummaryProps = {
  result: number;
  status: RatesStatus;
  to: CurrencyCode;
};
class RatesSummary extends Component<RatesSummaryProps> {
  render() {
    const { result, status, to } = this.props;
    if (status.type === 'loading' || status.type === 'idle') {
      return <div className="status-msg">{status.message}</div>;
    }
    return (
      <div className="result">
        <h3 className="result__title">Result</h3>
        <p className="result__value">
          {result.toFixed(2)} {to}
        </p>
        {status.type === 'success' && <p className="result__meta">Source: {status.result.source}</p>}
        <p className="result__meta">Status: {status.type}</p>
        <p className="result__meta">To: {to}</p>
      </div>
    );
  }
}

export default RatesSummary;
