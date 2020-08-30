import React from "react";
import { ProductConsumer } from "../../context/context";
import styled from "styled-components";

export default function ProductFilter() {
  return (
    <ProductConsumer>
      {(value) => {
        const {
          search,
          company,
          price,
          min,
          max,
          shipping,
          handleChange,
          storeProducts,
        } = value;

        let companies = new Set();
        companies.add("all");
        for (let product in storeProducts) {
          companies.add(storeProducts[product]["company"]);
        }
        companies = [...companies];

        return (
          <div className="row my-5">
            <div className="col-10 mx-auto">
              <FilterWrapper>
                {/* text search */}
                <div>
                  <label htmlFor="search">search products</label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    className="filter-item"
                  />
                </div>
                {/* category company */}
                <div>
                  <label htmlFor="company">company</label>
                  <select
                    id="company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    className="filter-item"
                  >
                    {companies.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* price range */}
                <div>
                  <label htmlFor="price">
                    <p className="mb-2">
                      product price : <span>$ {price}</span>
                    </p>
                  </label>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    className="filter-price"
                  />
                </div>
                {/* free shippping */}
                <div>
                  <label htmlFor="shipping" className="mx-2">
                    free shipping
                  </label>
                  <input
                    type="checkbox"
                    id="shipping"
                    name="shipping"
                    checked={shipping}
                    onChange={handleChange}
                  />
                </div>
              </FilterWrapper>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  label {
    font-weight: bold;
    text-transform: capitalize;
  }
  .filter-item,
  .filter-price {
    display: block;
    width: 100%;
    background: transparent;
    border-radius: 0.5rem;
    border: 2px solid var(--darkGrey);
  }
`;
