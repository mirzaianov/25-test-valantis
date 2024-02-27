import NoItemsPhoto from '../assets/img/no-items-found.png';

import './NoItemsFound.css';

const NoItemsFound = () => {
  return (
    <div className="did-not-found">
      <p className="did-not-found__descr">
        Ничего не найдено. <br />
        Попробуйте изменить параметры поиска.
      </p>
      <img
        className="did-not-found__img"
        src={NoItemsPhoto}
        alt="Пусто"
      />
    </div>
  );
};

export default NoItemsFound;
