import logo from "../assets/images/logo.svg";
import search from "../assets/images/search.svg";
import classes from "./Menu.module.scss";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const Menu = () => {
  /**
   * Default list of menu items.
   */
  const defaultList = [
    "HOME",
    "ELECTRONICS",
    "BOOKS",
    "MUSIC",
    "MOVIES",
    "CLOTHING",
    "GAMES",
    "Furniture",
    "Travel",
    "Botanical",
    "Category name",
  ];

  /**
   * State for visible menu items.
   */
  const [visibleMenuItems, setVisibleMenuItems] = useState(defaultList);

  /**
   * State for additional menu items hidden in the "More" dropdown.
   */
  const [moreMenuItems, setMoreMenuItems] = useState([]);

  /**
   * Ref to the menu items container.
   */
  const menuItemsRef = useRef();

  /**
   * State for controlling the visibility of the "More" dropdown.
   */
  const [showDropdown, setShowDropdown] = useState(false);

  /**
   * Effect to set menu items once after the first render
   */
  useEffect(() => {
    setMenuItems();
  }, []);

  /**
   * Effect to handle resizing and updating the visible and hidden menu items.
   */
  useLayoutEffect(() => {
    setMenuItems();
    window.addEventListener("resize", setMenuItems);
    return () => {
      window.removeEventListener("resize", setMenuItems);
    };
  }, [moreMenuItems]);

  /**
   * Click event listener to close the more dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.id && e.target.id !== "more") {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  /**
   * Function to set visible and hidden menu items based on container width.
   */
  const setMenuItems = () => {
    if (menuItemsRef.current.clientWidth < menuItemsRef.current.scrollWidth) {
      setVisibleMenuItems((current) => {
        let temp = [...current];
        setMoreMenuItems([temp.pop(), ...moreMenuItems]);
        return temp;
      });
    }
  };

  /**
   * Handler for the search form submission.
   */
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  /**
   * Render the Menu component.
   * @returns The JSX element representing the Menu component.
   */
  return (
    <div className={classes.MenuWrapper}>
      <a href="">
        <img src={logo} alt="logo" />
      </a>
      <div ref={menuItemsRef} className={classes.MenuItems}>
        {visibleMenuItems.map((item, index) => {
          return (
            <span key={index} className={classes.Item}>
              {item}
            </span>
          );
        })}
        <span
          className={[classes.Item, classes.MoreItem].join(" ")}
          id="more"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          More
        </span>
      </div>
      {showDropdown && (
        <div className={classes.Dropdown}>
          {moreMenuItems.map((item, index) => {
            return (
              <div
                key={index}
                className={classes.DropDownItem}
                onClick={() => setShowDropdown(false)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
      <form action="submit" onSubmit={searchSubmitHandler}>
        <img className={classes.SearchIcon} src={search} alt="search" />
        <input
          className={classes.Input}
          type="text"
          placeholder="Search something"
        />
      </form>
    </div>
  );
};
