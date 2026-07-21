import type { ConverterControls, CurrencyCode } from '../types';
import { currencies } from '../utils/currency';
type ConverterFormProps = {
  controls: ConverterControls;
  onChange: (partControls: Partial<ConverterControls>) => void;
  onRefresh: () => void;
};
const FuncConverterForm = ({
  controls,
  onChange,
  onRefresh,
}: ConverterFormProps) => {
  return (
    <div className="form">
      <div className="form__field">
        <label className="form__label" htmlFor="amount">
          Amount
        </label>
        <input
          className="form__input"
          min=""
          type="number"
          id="amount"
          value={controls.amount}
          onChange={(e) => onChange({ amount: Number(e.target.value) })}
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="from">
          From
        </label>
        <select
          className="form__select"
          id="from"
          value={controls.from}
          onChange={(e) => onChange({ from: e.target.value as CurrencyCode })}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="to">
          To
        </label>
        <select
          className="form__select"
          id="to"
          value={controls.to}
          onChange={(e) => onChange({ to: e.target.value as CurrencyCode })}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" type="button" onClick={onRefresh}>
        Refresh rates
      </button>
    </div>
  );
};

export default FuncConverterForm;
