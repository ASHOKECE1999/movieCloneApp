import './index.css'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

const Header = () => (
  <nav className="myNav">
    <ol className="myDivForDis">
      <Link to="/">
        <li>
          <img
            src="https://res.cloudinary.com/dhowpxwxx/image/upload/v1676736217/Group_7399_ljj9pz.png"
            style={{backgroundColor: 'black', width: '100px', color: 'white'}}
            alt="website logo"
          />
        </li>
      </Link>

      <Link to="/">
        <li>Home</li>
      </Link>

      <Link to="/popular">
        <li>Popular</li>
      </Link>
    </ol>
    <div className="myDivForDis">
      <Link to="/search">
        <AiOutlineSearch />
      </Link>
      <Link to="/profile">
        <img
          src="https://res.cloudinary.com/dhowpxwxx/image/upload/v1678424318/Project/Mask_Group_g2gdar.png"
          alt="profile"
        />
      </Link>
    </div>
  </nav>
)
export default Header
