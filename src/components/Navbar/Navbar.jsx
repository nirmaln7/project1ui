import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/star.png";
import idButton from "../../assets/idButton.png";
import memo from "../../assets/memo.png";
import order from "../../assets/order.png";
import lock from "../../assets/lock.png";

import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => {
            setSuggestions(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySuggestions);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      selectedItem(-1);
    }
  };

  return (
    <nav className="navbar align_center">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form
          action=""
          className="navbar_form align_center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search Products"
            className="navbar_search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search_button">Search</button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((s, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={s._id}
                >
                  <Link
                    to={`/products?search=${s.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
