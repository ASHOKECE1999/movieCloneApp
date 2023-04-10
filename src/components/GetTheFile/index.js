import {Link} from 'react-router-dom'
import './index.css'

const GetTheFile = props => {
  const {eachItem} = props
  const {posterPath, id, title} = eachItem
  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img src={posterPath} alt={title} className="myImg" />
      </li>
    </Link>
  )
}

export default GetTheFile
