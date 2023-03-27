import React, { useEffect } from "react";
import style from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDishIfNotExist } from "../../store/entities/dish/thunks/loadDishIfNotExist";
import {
  selectDishById,
  selectIsDishLoading,
} from "../../store/entities/dish/selectors";

export const DishPage = () => {
  const { dishId } = useParams();
  const dispatch = useDispatch();

  const dish = useSelector((state) => selectDishById(state, { dishId }));
  useEffect(() => {
    dispatch(loadDishIfNotExist(dishId));
  }, []);

  const isLoading = useSelector(selectIsDishLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!dish) {
    return null;
  }

  const { name, ingredients = [] } = dish;
  return (
    <div className={style.root}>
      <h2>{name}</h2>
      <div className={style.ingredients}>
        <span>Ingredient</span>
        <ol>
          {ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};