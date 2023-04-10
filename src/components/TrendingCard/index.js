import {Link} from 'react-router-dom'
import './index.css'

const TrendingCard = props => {
  const {eachItem} = props
  const {backdropPath, overview, id, posterPath, title} = eachItem

  return (
    <Link to={`/movies/${id}`} className="mydiv">
      <img
        className="myImg"
        src={posterPath}
        alt={title}
        // style={{height: '40px', width: '100%'}}
      />
    </Link>
  )
}
export default TrendingCard
