import React from "react";
import classes from "./category.module.css";

function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      <a href={data.link || "#"}>
        <h2>{data.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>Shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
