import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsReviewLoading } from '../../store/entities/review/selectors'
import { loadReviewsIfNotExist } from '../../store/entities/review/thunks/loadReviewsIfNotExist'
import { selectRestaurantReviewsById } from '../../store/entities/restaurant/selectors'
import { Review } from '../Review/Review'
import styles from './styles.module.css'

export const Reviews = ({ restaurantId }) => {
  const dispatch = useDispatch()
  const reviews = useSelector((state) =>
    selectRestaurantReviewsById(state, { restaurantId })
  )

  const isLoading = useSelector(selectIsReviewLoading)
  useEffect(() => {
    dispatch(loadReviewsIfNotExist(restaurantId))
  }, [restaurantId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Reviews</h3>
      <div className={styles.reviews}>
        {reviews.map((id) => (
          <Review className={styles.review} reviewId={id} />
        ))}
      </div>
    </div>
  )
}
