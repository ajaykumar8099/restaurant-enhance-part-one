import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CustomButton from '../CustomButton'
import DishCard from '../DishCard'

import './index.css'

class Home extends Component {
  state = {
    name: '',
    allData: [],
    activTabId: null,
    isLoading: true,
    cartItems: 0,
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data) // log the data to understand better

    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
      restaurantName: each.restaurant_name,
    }))

    const totalDetails = array[0]
    const {tableMenuList, restaurantName} = totalDetails

    const format = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(each1 => ({
        dishId: each1.dish_id,
        dishName: each1.dish_name,
        dishAvailability: each1.dish_Availability,
        dishCurrency: each1.dish_currency,
        dishType: each1.dish_Type,
        dishCalories: each1.dish_calories,
        dishImage: each1.dish_image,
        dishPrice: each1.dish_price,
        dishDescription: each1.dish_description,
        nexturl: each1.nexturl,
        addonCat: each1.addonCat,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))

    const single = format[0]
    const {categoryDishes} = single
    console.log(format, 'all data')
    console.log(categoryDishes, 'dish item data')
    this.setState({
      allData: format,
      name: restaurantName,
      activTabId: format[0].menuCategoryId,
      isLoading: false,
    })
  }

  onClickBtnChage = id => {
    this.setState({activTabId: id})
  }

  Loader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  increaseCart = () => {
    const {cartItems} = this.state
    console.log('increase clicked')
    if (cartItems >= 1) {
      this.setState(
        prev => ({cartItems: prev.cartItems + 1}),
        () => {
          this.getAllData()
        },
      )
    }
  }

  decreaseCart = () => {
    const {cartItems} = this.state
    console.log('decrease clicked')
    if (cartItems > 1) {
      this.setState(
        prev => ({cartItems: prev.cartItems - 1}),
        () => {
          this.getAllData()
        },
      )
    }
  }

  geteachDishItemData = () => {
    const {name, allData, activTabId, cartItems} = this.state

    // console.log(name, tableItemList, activTabId)

    const eachDishItem = allData.filter(
      each => each.menuCategoryId === activTabId,
    )

    const single = eachDishItem[0]
    const {categoryDishes} = single

    console.log(cartItems, 'component is re-rendered')

    return (
      <div>
        <Header heading={name} cartItems={cartItems} />
        <div className="bg-container">
          <ul>
            {allData.map(each => (
              <CustomButton
                key={each.menuCategoryId}
                btnData={each}
                onClickBtn={this.onClickBtnChage}
                isActive={activTabId === each.menuCategoryId}
              />
            ))}
          </ul>
          <ul>
            {categoryDishes.map(each => (
              <DishCard
                key={each.dishId}
                dishDetails={each}
                cartItemNo={cartItems}
                decreaseCart={this.decreaseCart}
                increaseCart={this.increaseCart}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.Loader() : this.geteachDishItemData()}</div>
  }
}
export default Home
