import React, { useState } from "react";
import './categories.scss'

export default function Categories({ selectCategory, categories, activeIndex }) {

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => selectCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
