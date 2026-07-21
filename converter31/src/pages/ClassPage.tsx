import { Component } from 'react';
import type { ConverterControls, CurrencyCode, RatesStatus } from '../types';
import { loadRatesData } from '../api/ratesApi';
import { convertCurrency } from '../utils/currency';
import ConverterForm from '../components/ConverterForm';
import RatesSummary from '../components/RatesSummary';

type ClassPageState = {
  controls: ConverterControls;
  status: RatesStatus;
};

export default class ClassPage extends Component<
  Record<string, never>,
  ClassPageState
> {
  state: ClassPageState = {
    controls: {
      amount: 100,
      from: 'USD',
      to: 'EUR',
    },
    status: { type: 'idle', message: 'Rates are not loaded' },
  };
  componentDidMount() {
    void this.loadCurrencyRates();
  }
  async loadCurrencyRates(forceRefresh = false) {
    this.setState({
      status: {
        type: 'loading',
        message: 'Loading rates...',
      },
    });
    try {
      const result = await loadRatesData();
      this.setState({
        status: {
          type: 'success',
          result,
        },
      });
    } catch (error) {
      this.setState({
        status: {
          type: 'error',
          message:
            error instanceof Error ? error.message : 'Failed to load rates',
        },
      });
    }
  }

  updateControls = (partControls: Partial<ConverterControls>) => {
    this.setState((currentState) => ({
      controls: {
        ...currentState.controls,
        ...partControls,
      },
    }));
  };

  render() {
    const { controls, status } = this.state;
    const ratesData =
      status.type === 'success' ? status.result.data : undefined;
    const result = convertCurrency(
      controls.amount,
      controls.from,
      controls.to,
      ratesData
    );
    return (
      <div className="page">
        <h2>ClassPage</h2>
        <ConverterForm
          controls={this.state.controls}
          onChange={this.updateControls}
          onRefresh={() => void this.loadCurrencyRates(true)}
        />
        <RatesSummary to={controls.to} result={result} status={status} />
      </div>
    );
  }
}
