import Card from './Card';

import './CardList.css';

const CardList = ({ items }) => {
  return (
    <ul className="card-list">
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          product={item.product}
          price={item.price}
          brand={item.brand}
        />
      ))}
    </ul>
  );
};

export default CardList;
