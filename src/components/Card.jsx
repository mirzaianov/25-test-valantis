import numberWithSpaces from '../utils/numberWithSpaces';
import Photo from '../assets/img/photo.png';

import './Card.css';

const Card = ({ id, product, price, brand }) => {
  return (
    <div className="card">
      <img
        className="card__img"
        src={Photo}
        alt="image"
      />
      <div className="card__id">{id}</div>
      <div className="card__product">{product}</div>
      <div className="card__brand">
        {brand ? `Бренд: ${brand}` : `Бренд отсутствует`}
      </div>
      <div className="card__price">{numberWithSpaces(price)} ₽</div>
    </div>
  );
};

export default Card;
