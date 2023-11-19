import { useState } from "react";
import "./App.css";
import { data } from "./constants/data";
import { useEffect } from "react";

function App() {
  const [itemList, setItemList] = useState(data);
  const [selectedList, setSelectedList] = useState([]);
  const [name, setName] = useState();
  const countdown = 5000;

  useEffect(() => {
    let timer;

    if (selectedList.length > 0) {
      timer = setTimeout(() => {
        setSelectedList((prevList) => {
          const cloneList = [...prevList];
          const list = cloneList.reverse().pop() || [];

          setItemList((prevState) => [...prevState, list]);

          return prevList.slice(1);
        });
      }, countdown);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [selectedList]);

  const onEnter = () => {
    const popItem =
      itemList.filter(
        (item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )[0] || [];

    const selected = [...selectedList, { ...popItem }];

    setItemList((prevState) =>
      prevState.filter((_item) => _item.name !== popItem.name)
    );
    setSelectedList(selected);
  };

  const onClickItem = (value) => {
    setName(value?.target.name);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          {itemList?.map((_item) => (
            <button
              key={_item.name}
              onClick={onClickItem}
              name={_item.name}
              className="btn btn-primary my-1"
            >
              {_item.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col w-full mx-6">
          <div className="flex">
            <div className="flex join-vertical w-full">
              <input
                className="input w-full input-bordered join-item"
                placeholder="Name"
                onChange={(event) => setName(event.target?.value.trim())}
                value={name}
              />
            </div>
            <div className="indicator mx-2">
              <button className="btn w-[200px] join-item" onClick={onEnter}>
                Enter
              </button>
            </div>
          </div>

          <div className="flex flex-row w-full mt-1">
            <div className="flex flex-col w-full mt-1 mx-2">
              <button className="btn w-full btn-error no-animation">
                Fruit
              </button>
              <div className="p-2 mt-2 h-[500px] flex flex-col w-full border rounded-md border-orange-600">
                {selectedList
                  ?.filter((_value) => _value.type === "Fruit")
                  .map((_item) => (
                    <button
                      key={_item.name}
                      className="btn my-1 btn-outline btn-error w-full"
                    >
                      {_item.name}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex flex-col w-full mt-1 mx-2">
              <button className="btn w-full btn-success no-animation">
                Vegetable
              </button>
              <div className="p-2 mt-2 h-[500px] flex flex-col w-full border rounded-md border-lime-600">
                {selectedList
                  ?.filter((_value) => _value.type === "Vegetable")
                  .map((_item) => (
                    <button
                      key={_item.name}
                      className="btn my-1 btn-outline btn-success w-full"
                    >
                      {_item.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
