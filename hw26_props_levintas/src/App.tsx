import CarCard from './components/CarCard';
import { CarClass } from './components/CarClass';
import { cars } from './mock/cars-data';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">
        Cars <span>available</span> on sale right now (builded with functional
        react)
      </h1>
      <div className="app__grid">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            model={car.model}
            manufacturer={car.manufacturer}
            serialNumber={car.serialNumber}
            year={car.year}
          />
        ))}
      </div>
      <h2 className="app__title">
        Cars <span>available</span> on sale right now (builded with class)
      </h2>
      <div className="app__grid">
        {cars.map((car) => (
          <CarClass
            key={car.id}
            id={car.id}
            model={car.model}
            manufacturer={car.manufacturer}
            serialNumber={car.serialNumber}
            year={car.year}
          />
        ))}
      </div>
      <h2 className="app__title">
        <span>All</span> styles was created by claude 😊
      </h2>

      <dl>
        <dt>React</dt>
        <dd>Библиотека для создания пользовательских интерфейсов.</dd>

        <dt>TypeScript</dt>
        <dd>Строгий наднабор JavaScript, добавляющий статическую типизацию.</dd>
      </dl>
    </div>
  );
};
export default App;
``;
