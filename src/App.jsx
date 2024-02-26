import { useEffect, useMemo, useState } from 'react';
import GenerateHash from './services/GenerateHash';
import CardList from './components/CardList';
import Logo from './assets/img/logo.svg';
import Spinner from './components/Spinner';

import './App.css';

const URL = 'http://api.valantis.store:40000/';
const limit = 25;

export default function App() {
  // console.log(`App`);

  const [items, setItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(step);
  const [isEnd, setIsEnd] = useState(false);

  const hash = useMemo(() => GenerateHash(), []);

  useEffect(() => {
    // console.log(`useFetch`);

    let cancelled = false;

    setIsLoading(true);
    setItems([]);
    // setError(null);

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
        // setError(e);
      })
      .finally(() => {
        // console.log(`finally`);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hash, offset]);

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
      {isloading ? <Spinner /> : <CardList items={items} />}
      <div className="app__buttons">
        <button
          className="app__btn"
          disabled={isloading || offset < limit}
          onClick={handlePrevClick}
        >{`<<`}</button>
        <button
          className="app__btn"
          disabled={isloading || isEnd}
          onClick={handleNextClick}
        >{`>>`}</button>
      </div>
    </div>
  );
}
