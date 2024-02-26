import { useEffect, useMemo, useState } from 'react';
import GenerateHash from './services/GenerateHash';
import CardList from './components/CardList';
import Logo from './assets/img/logo.svg';
import Spinner from './components/Spinner';
import Button from './components/Button';
import Filters from './components/Filters';

import './App.css';

const URL = 'http://api.valantis.store:40000/';
const limit = 50;
const fetchCount = 0;

export default function App() {
  // console.log(`App`);

  const [items, setItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(step);
  const [isEnd, setIsEnd] = useState(false);
  const [count, setCount] = useState(fetchCount);

  const hash = useMemo(() => GenerateHash(), []);

  useEffect(() => {
    // console.log(`useFetch`);

    let cancelled = false;

    setIsLoading(true);
    setItems([]);
    // setError(null);

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
          // console.log(respData.result);

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
          // console.log(respData.result);

          // const items = respData.result;
          const itemsMap = new Map();

          for (const item of respData.result) {
            if (!itemsMap.has(item.id)) {
              itemsMap.set(item.id, item);
            }
          }

          const itemsArray = Array.from(itemsMap.values());
          // console.log(itemsArray);

          setItems(itemsArray);
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
          console.log(`count: ${count}`);
        })
        .finally(() => {
          // console.log(`finally`);

          setIsLoading(false);
        });
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [hash, offset, error, count]);

  const handleNextClick = () => {
    // console.log(`handleNextClick`);

    setOffset((prev) => prev + limit);
  };

  const handlePrevClick = () => {
    // console.log(`handlePrevClick`);

    // offset < limit ? null : setOffset((prev) => prev - limit);

    if (offset >= limit) {
      setOffset((prev) => prev - limit);
    }
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
      <Filters />
      {isloading ? <Spinner /> : <CardList items={items} />}
      <div className="app__buttons">
        <Button
          disabled={isloading || offset < limit}
          onClick={handlePrevClick}
          title="Предыдущие 50 шт."
          text="<< -50"
        />
        <Button
          disabled={isloading || isEnd}
          onClick={handleNextClick}
          title="Следующие 50 шт."
          text="+50 >>"
        />
      </div>
    </div>
  );
}
