import NoItemsPhoto from '../assets/img/no-items-found.png';

const NoItemsFound = () => {
  return (
    <div className="did-not-found">
      <h3>Ничего не найдено</h3>
      <h3>Попробуйте изменить параметры поиска</h3>
      <img
        src={NoItemsPhoto}
        alt="Пусто"
      />
    </div>
  );
};

export default NoItemsFound;
