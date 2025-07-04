import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import LowHeader from "./LowHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { useContext } from "react";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const { state, dispatch } = useContext(DataContext);
  const user = state?.user;
  const basket = state?.basket || [];

  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* Logo Section */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className={classes.search}>
            <select>
              <option value="">All</option>
              <option value="">EM</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>

          {/* Navigation Section */}
          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="language flag"
              />
            </Link>

            {user ? (
              <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/Auth">
                <div>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
            )}

            <Link to="/orders">
              <p>Returns & Orders</p>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <div
                className={classes.cartIconWrapper}
                style={{ position: "relative", display: "inline-block" }}
              >
                <BiCart size={35} />
                <span className={classes.cartCount}>{totalItem}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <LowHeader />
    </section>
  );
};

export default Header;
