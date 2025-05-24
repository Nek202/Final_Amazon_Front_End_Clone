import React from "react";
import { categoryInfos } from "./categoryFullinfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";

function CategoryEffects() {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default CategoryEffects;
