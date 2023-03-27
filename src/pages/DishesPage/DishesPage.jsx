import React, { useEffect } from "react";
import style from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDishByName,
  selectIsDishLoading,
} from "../../store/entities/dish/selectors";
import { loadAllDishesIfNotExist } from "../../store/entities/dish/thunks/loadAllDishesIfNotExist";
import { Dish } from "../../components/Dish/Dish";
import { useSearchParams, Link } from "react-router-dom";
import { loadRestaurantIfNotExist } from "../../store/entities/restaurant/thunks/loadRestaurantsIfNotExist";

export const DishesPage = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams({ search: "" });

  const isLoading = useSelector(selectIsDishLoading);
  useEffect(() => {
    dispatch(loadAllDishesIfNotExist());
    dispatch(loadRestaurantIfNotExist());
  }, []);

  const dishes = useSelector((state) =>
    selectDishByName(state, {
      searchName: searchParam.get("search") || "",
    })
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.root}>
      <input
        value={searchParam.get("search") || ""}
        onChange={({ target }) => setSearchParam({ search: target.value })}
      />
      <h3>Dishes:</h3>
        { dishes }
      {dishes.map(({ id }) => (
        <Link to={id}>
            <Dish dishId={id} />
        </Link>
      ))}
    </div>
  );
};