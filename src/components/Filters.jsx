import { useEffect, useRef } from 'react';
import numberWithSpaces from '../utils/numberWithSpaces';

import './Filters.css';

const Filters = ({
  productFilter,
  setProductFilter,
  brandFilter,
  setBrandFilter,
  minPriceFilter,
  setMinPriceFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  minPricePlaceholder,
  maxPricePlaceholder,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

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
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
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
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          />
        </div>
        <div className="filters__price-search">
          <label htmlFor="minPricePlaceholder">
            <span>Цена, </span>
          </label>
          <div className="filters__price-wrapper">
            <span>от </span>
            <input
              id="minPricePlaceholder"
              name="minPricePlaceholder"
              type="number"
              placeholder={`${numberWithSpaces(minPricePlaceholder)} ₽`}
              className="filters__input"
              value={minPriceFilter}
              onChange={(e) => setMinPriceFilter(e.target.value)}
            />{' '}
            <label htmlFor="maxPricePlaceholder">
              <span>до </span>
            </label>
            <input
              id="maxPricePlaceholder"
              name="maxPricePlaceholder"
              type="number"
              placeholder={`${numberWithSpaces(maxPricePlaceholder)} ₽`}
              className="filters__input"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
