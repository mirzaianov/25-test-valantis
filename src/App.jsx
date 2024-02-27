import { useEffect, useMemo, useState } from 'react';
import GenerateHash from './services/GenerateHash';
import CardList from './components/CardList';
import Logo from './assets/img/logo.svg';
import Spinner from './components/Spinner';
import Button from './components/Button';
import Filters from './components/Filters';
import NoItemsFound from './components/NoItemsFound';

import './App.css';

const URL = 'http://api.valantis.store:40000/';
const limit = 50;
const fetchCount = 0;

export default function App() {
  const [items, setItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [productFilter, setProductFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [minPricePlaceholder, setMinPricePlaceholder] = useState(0);
  const [maxPricePlaceholder, setMaxPricePlaceholder] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const [count, setCount] = useState(fetchCount);

  const hash = useMemo(() => GenerateHash(), []);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setItems([]);

    const fetchData = () => {
      fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Auth': hash,
        },
        body: JSON.stringify({
          action: 'get_ids',
          params: { offset, limit },
        }),
      })
        .then((res) => res.json())
        .then((respData) => {
          if (respData.result.length < limit) {
            setIsEnd(true);
          }

          return fetch(URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Auth': hash,
            },
            body: JSON.stringify({
              action: 'get_items',
              params: {
                ids: respData.result,
              },
            }),
          });
        })
        .then((res) => res.json())
        .then((respData) => {
          const itemsMap = new Map();
          let min = Infinity;
          let max = -Infinity;

          for (const item of respData.result) {
            if (!itemsMap.has(item.id)) {
              itemsMap.set(item.id, item);
              min = Math.min(min, item.price);
              max = Math.max(max, item.price);
            }
          }

          setMinPricePlaceholder(min);
          setMaxPricePlaceholder(max);

          const itemsArray = Array.from(itemsMap.values());

          setItems(itemsArray);
          // setFilteredItems(itemsArray); // note: for filters
        })
        .catch((e) => {
          console.error(e.message);
          setError(e);

          if (count > 4) {
            if (!alert('Ошибка на сервере. Пожалуйста, попробуйте позже...')) {
              window.location.reload();
            }
          }

          fetchData();
          setCount((prev) => prev + 1);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [hash, offset, error, count]);

  const handleNextClick = () => {
    setOffset((prev) => prev + limit);
  };

  const handlePrevClick = () => {
    if (offset >= limit) {
      setOffset((prev) => prev - limit);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      let updatedItems = [...items];

      if (productFilter) {
        updatedItems = updatedItems.filter((item) =>
          item.product.toLowerCase().includes(productFilter.toLowerCase()),
        );
      }

      if (brandFilter) {
        updatedItems = updatedItems.filter((item) =>
          item.brand?.toLowerCase().includes(brandFilter.toLowerCase()),
        );
      }

      if (minPriceFilter) {
        updatedItems = updatedItems.filter(
          (item) => item.price >= minPriceFilter,
        );
      }

      if (maxPriceFilter) {
        updatedItems = updatedItems.filter(
          (item) => item.price <= maxPriceFilter,
        );
      }

      setFilteredItems(updatedItems);
    }
  }, [items, productFilter, brandFilter, minPriceFilter, maxPriceFilter]);

  const CardListView = () => {
    return filteredItems.length > 0 ? (
      <CardList items={filteredItems} />
    ) : (
      <NoItemsFound />
    );
  };

  return (
    <div className="app">
      <div>
        <img
          className="app__logo"
          src={Logo}
          alt="Valantis"
        />
      </div>
      <h1 className="app__title">Каталог ювелирных изделий</h1>
      <Filters
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        minPriceFilter={minPriceFilter}
        setMinPriceFilter={setMinPriceFilter}
        maxPriceFilter={maxPriceFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        minPricePlaceholder={minPricePlaceholder}
        maxPricePlaceholder={maxPricePlaceholder}
      />
      {isloading ? <Spinner /> : <CardListView />}
      <div className="app__buttons">
        <Button
          disabled={isloading || offset < limit}
          onClick={handlePrevClick}
          title="Предыдущие 50 шт."
          text="<< Назад"
        />
        <Button
          disabled={isloading || isEnd}
          onClick={handleNextClick}
          title="Следующие 50 шт."
          text="Вперед >>"
        />
      </div>
    </div>
  );
}
