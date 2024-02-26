import { useEffect, useMemo, useState } from 'react';
import GenerateHash from './services/GenerateHash';

import './App.scss';

const URL = 'http://api.valantis.store:40000/';
const step = 25;

export default function App() {
  console.log(`App`);

  // const [ids, setIds] = useState([]);
  const [items, setItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(step);
  const [isEnd, setIsEnd] = useState(false);

  const hash = useMemo(() => GenerateHash(), []);

  useEffect(() => {
    console.log(`useFetch`);

    let cancelled = false;

    setIsLoading(true);
    setItems([]);
    setError(null);

    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth': hash,
      },
      body: JSON.stringify({
        action: 'get_ids',
        params: {
          offset: offset,
          limit: limit,
        },
      }),
    })
      .then((res) => res.json())
      .then((respData) => {
        console.log(respData.result);

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
        console.log(respData.result);

        const items = respData.result;
        const itemsMap = new Map();

        for (const item of items) {
          if (!itemsMap.has(item.id)) {
            itemsMap.set(item.id, item);
          }
        }

        const itemsArray = Array.from(itemsMap.values());
        console.log(itemsArray);

        setItems(itemsArray);
      })
      .catch((e) => {
        console.warn(e);
        setError(e);
      })
      .finally(() => {
        console.log(`finally`);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [URL, hash, offset, limit]);

  const handleNextClick = () => {
    console.log(`handleNextClick`);

    setOffset((offset) => offset + step);
  };

  const handlePrevClick = () => {
    console.log(`handlePrevClick`);

    offset < limit ? null : setOffset((offset) => offset - limit);
  };

  return (
    <>
      <h1>Valantis</h1>
      <div>Каталог ювелирных изделий</div>
      {isloading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>Id: {item.id}</div>
              <div>Product: {item.product}</div>
              <div>Price: {item.price}</div>
              <div>
                {item.brand ? `Brand: ${item.brand}` : `Имя бренда отсутствует`}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        disabled={isloading || offset < limit}
        onClick={handlePrevClick}
      >{`<<`}</button>
      <button
        disabled={isloading || isEnd}
        onClick={handleNextClick}
      >{`>>`}</button>
    </>
  );
}
