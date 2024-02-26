import './Filters.css';

const Filters = () => {
  return (
    <div className="filters">
      <h2 className="filters__name">Фильтры:</h2>
      <div className="filters__search">
        <div className="filters__name-search">
          Название{' '}
          <input
            type="text"
            placeholder="Название изделия"
            className="filters__input"
          />
        </div>
        <div className="filters__brand-search">
          Бренд{' '}
          <input
            type="text"
            placeholder="Имя бренда"
            className="filters__input"
          />
        </div>
        <div className="filters__price-search">
          Цена от{' '}
          <input
            type="number"
            placeholder="0 &#8381;"
            className="filters__input"
          />{' '}
          до{' '}
          <input
            type="number"
            placeholder="100 000 &#8381;"
            className="filters__input"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
