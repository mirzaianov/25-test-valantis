import { useEffect, useRef } from 'react';
import numberWithSpaces from '../utils/numberWithSpaces';

import './Filters.css';

const Filters = ({ minPrice, maxPrice, filterByProduct }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="filters">
      <h2 className="filters__name">Фильтры:</h2>
      <div className="filters__search">
        <div className="filters__name-search">
          <label htmlFor="name">
            <span>Название </span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            ref={inputRef}
            placeholder="Название изделия"
            className="filters__input"
            onChange={filterByProduct}
          />
        </div>
        <div className="filters__brand-search">
          <label htmlFor="brand">
            <span>Бренд </span>
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            placeholder="Имя бренда"
            className="filters__input"
            // onChange={filterByBrand}
          />
        </div>
        <div className="filters__price-search">
          <label htmlFor="minPrice">
            <span>Цена от </span>
          </label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            placeholder={`${numberWithSpaces(minPrice)} ₽`}
            className="filters__input"
          />{' '}
          <label htmlFor="maxPrice">
            <span>до </span>
          </label>
          <input
            id="maxPrice"
            name="maxPrice"
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
