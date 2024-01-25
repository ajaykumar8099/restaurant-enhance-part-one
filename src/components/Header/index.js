import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const {heading, cartItems} = props
  const deleteBtn = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">{heading}</Link>
      <Link to="/cart">Cart</Link>
      <button type="button" onClick={deleteBtn}>
        Logout
      </button>
      <div className="header-container">
        <p>My Orders </p>
        <p>{cartItems}</p>
      </div>
    </nav>
  )
}
export default withRouter(Header)
