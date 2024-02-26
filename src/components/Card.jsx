import './Card.css';

const Card = ({ id, product, price, brand }) => {
  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="card">
      <img
        className="card__img"
        src="./photo.png"
        alt="image"
      />
      <div className="card__id">{id}</div>
      <div className="card__product">{product}</div>
      <div className="card__brand">
        {brand ? `Бренд: ${brand}` : `Бренд отсутствует`}
      </div>
      <div className="card__price">{numberWithSpaces(price)} &#8381;</div>
    </div>
  );
};

export default Card;
