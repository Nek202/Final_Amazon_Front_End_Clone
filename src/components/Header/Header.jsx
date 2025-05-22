
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css"; // Assuming you're using CSS Modules
import { SlLocationPin } from "react-icons/sl";
import LowHeader from "./LowHeader";


const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header__container}>
          {/* Logo Section */}
          <div className={classes.logo__container}>
            <a href="#">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>

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
            <select name="" id="">
              <option value="">All</option>
              <option value="">EM</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          {/* Navigation Section */}
          <div className={classes.order__container}>
            <a href="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="language flag"
              />
            </a>

            <a href="">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </a>

            <a href="">
              <p>Returns</p>
              <span>& Orders</span>
            </a>

            <a href="" className={classes.cart}>
              <BiCart size={35} />
              <span>&</span>
            </a>
          </div>
        </div>
      </section>
      <LowHeader/>
    </>
  );
};

export default Header;
