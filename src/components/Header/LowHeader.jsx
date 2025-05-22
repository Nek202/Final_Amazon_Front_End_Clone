import React from 'react'
import { IoIosMenu } from "react-icons/io";
import classes from "./Header.module.css"; //
function LowHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <IoIosMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowHeader