import { selectRestaurantReviewsById } from '../../restaurant/selectors'
import { selectReviewIds } from '../selectors'
import { reviewSlice } from '../index'

export const loadReviewsIfNotExist = (restaurantId) => (dispatch, getState) => {
  const state = getState()

  const restaurantReviewsIds = selectRestaurantReviewsById(state, {
    restaurantId,
  })

  const reviewsIds = selectReviewIds(state)

  if (restaurantReviewsIds.every((id) => reviewsIds.includes(id))) {
    return
  }

  dispatch(reviewSlice.actions.startLoading())

  fetch(`http://localhost:3001/api/reviews?restaurantId=${restaurantId}`)
    .then((response) => response.json())
    .then((reviews) => dispatch(reviewSlice.actions.finishLoading(reviews)))
    .catch(() => dispatch(reviewSlice.actions.failLoading()))
}
