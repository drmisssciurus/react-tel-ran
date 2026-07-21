import { useEffect, useState } from 'react';
import { loadRatesData } from '../api/ratesApi';
import type { ConverterControls, RatesStatus } from '../types';
import FuncConverterForm from '../components/FuncConverterForm';
import FuncRatesSummary from '../components/FuncRatesSummary';
import { convertCurrency } from '../utils/currency';

const FunctionalPage = () => {
  const [controls, setControls] = useState<ConverterControls>({
    amount: 100,
    from: 'USD',
    to: 'EUR',
  });
  const [status, setStatus] = useState<RatesStatus>({
    type: 'idle',
    message: 'Rates are not loaded',
  });
  useEffect(() => {
    void loadCurrencyRates();
  }, []);

  async function loadCurrencyRates(forceRefresh = false) {
    setStatus({
      type: 'loading',
      message: 'Loading rates...',
    });
    try {
      const result = await loadRatesData();
      setStatus({
        type: 'success',
        result,
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to load rates',
      });
    }
  }
  function updateControls(partControls: Partial<ConverterControls>) {
    setControls((currentState) => ({
      ...currentState,
      ...partControls,
    }));
  }

  const ratesData = status.type === 'success' ? status.result.data : undefined;
  const result = convertCurrency(
    controls.amount,
    controls.from,
    controls.to,
    ratesData
  );

  return (
    <div className="page">
      <h2>functional page</h2>
      <FuncConverterForm
        controls={controls}
        onChange={updateControls}
        onRefresh={() => void loadCurrencyRates(true)}
      />
      <FuncRatesSummary result={result} status={status} to={controls.to} />
    </div>
  );
};

export default FunctionalPage;
