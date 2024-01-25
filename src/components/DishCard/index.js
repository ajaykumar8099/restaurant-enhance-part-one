import './index.css'

const DishCard = props => {
  const {dishDetails, cartItemNo, increaseCart, decreaseCart} = props
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    addonCat,
  } = dishDetails
  console.log(typeof addonCat)
  const len = addonCat.length

  const onCilckIncrease = () => {
    increaseCart()
  }

  const onCilckDecrease = () => {
    decreaseCart()
  }

  return (
    <li className="card-item">
      <div>
        <h1>{dishName}</h1>
        <p className="dishCurrency">
          {dishCurrency} {dishPrice}
        </p>
        <p>{dishDescription}</p>
        {dishAvailability ? (
          <div>
            <button
              type="button"
              onClick={onCilckDecrease}
              className="minus-btn"
            >
              -
            </button>
            <span className="span">{cartItemNo}</span>
            <button
              type="button"
              onClick={onCilckIncrease}
              className="plus-btn"
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-">Not available</p>
        )}

        {len >= 1 && <p className="custom">Customizations available</p>}
      </div>
      <div>
        <p className="not-">{`${dishCalories} calories`}</p>
      </div>
      <div>
        <img src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}
export default DishCard
