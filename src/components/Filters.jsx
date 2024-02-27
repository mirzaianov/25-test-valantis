import { useEffect, useRef } from 'react';
import numberWithSpaces from '../utils/numberWithSpaces';

import './Filters.css';

const Filters = ({ minPrice, maxPrice }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="filters">
      <h2 className="filters__name">Фильтры:</h2>
      <div className="filters__search">
        <div className="filters__name-search">
          {/* Название{' '} */}
          <label htmlFor="name">
            <span>Название </span>
          </label>
          <input
            id="name"
            type="text"
            ref={inputRef}
            placeholder="Название изделия"
            className="filters__input"
          />
        </div>
        <div className="filters__brand-search">
          {/* Бренд{' '} */}
          <label htmlFor="brand">
            <span>Бренд </span>
          </label>
          <input
            id="brand"
            type="text"
            placeholder="Имя бренда"
            className="filters__input"
          />
        </div>
        <div className="filters__price-search">
          <label htmlFor="minPrice">
            <span>Цена от </span>
          </label>
          <input
            id="minPrice"
            type="number"
            placeholder={`${numberWithSpaces(minPrice)} ₽`}
            className="filters__input"
          />{' '}
          <label htmlFor="maxPrice">
            <span>до </span>
          </label>
          <input
            id="maxPrice"
            type="number"
            placeholder={`${numberWithSpaces(maxPrice)} ₽`}
            className="filters__input"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
