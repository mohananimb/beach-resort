import React from "react";
import { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "../components/Title";

//get unioque values

const getUniue = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    price
  } = context;

  //get unique types

  let types = getUniue(rooms, "type");
  types = ["all", ...types];

  //map to JSX

  types = types.map((item, i) => {
    return (
      <option value={item} key={i}>
        {item}
      </option>
    );
  });

  let people = getUniue(rooms, "capacity");
  people = people.map((item, i) => {
    return (
      <option value={item} key={i}>
        {item}
      </option>
    );
  });

  return (
    //stype scroolbar
    <div>
      <section className="filter-container">
        <Title title="search rooms" />
        <form className="filter-form">
          <div className="form-group">
            <label htmlFor="type">room type</label>
            <select
              className="form-control"
              name="type"
              id="type"
              value={type}
              onChange={handleChange}
            >
              {types}
            </select>
          </div>

          {
            //  person scrollbar
          }
          <div className="form-group">
            <label htmlFor="capacity">Guest</label>
            <select
              className="form-control"
              name="capacity"
              id="capacity"
              value={capacity}
              onChange={handleChange}
            >
              {people}
            </select>
          </div>
          {/*room price*/}

          <div className="form-group">
            <label htmlFor="price">room price ${price}</label>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              id="price"
              value={price}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* by size */}

          <div className="form-group">
            <label htmlFor="size">room size</label>
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              className="size-input"
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              className="size-input"
              onChange={handleChange}
            />
            </div>

            {/* checkbox*/}

            <div className="form-group">
              <div className="single-extra">
                <input
                  type="checkbox"
                  checked={breakfast}
                  name="breakfast"
                  id="breakfast"
                  onChange={handleChange}
                />
                <label htmlFor="breakfast">breakfast</label>
              </div>
              <div className="single-extra">
              <input
                type="checkbox"
                checked={pets}
                name="pets"
                id="pets"
                onChange={handleChange}
              />
              <label htmlFor="pets">pets</label>
            </div>

            </div>
        </form>
      </section>
    </div>
  );
}
