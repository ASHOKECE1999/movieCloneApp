import {Component} from 'react'
import './index.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// eslint-disable-next-line import/order
import Cookies from 'js-cookie'
import Header from '../Header/index'
import TrendingCard from '../TrendingCard/index'
import OriginalsDataCard from '../OriginalsDataCard/index'
import UserDiv from './styledComponents'

const settings = {
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {
    trendingNowData: [],
    originalsData: [],
    color: '',
    heading: '',
    para: '',
  }

  // eslint-disable-next-line react/sort-comp
  getTrendingData = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'

    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const arrayResponse = data.results.map(eachItem => ({
      id: eachItem.id,
      backdropPath: eachItem.backdrop_path,
      overview: eachItem.overview,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
    }))
    console.log(arrayResponse)
    this.setState({trendingNowData: arrayResponse})
  }

  getOriginalData = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'

    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const arrayResponse = data.results.map(eachItem => ({
      id: eachItem.id,
      backdropPath: eachItem.backdrop_path,
      overview: eachItem.overview,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
    }))

    const ourPoster =
      arrayResponse[Math.round(Math.random() * arrayResponse.length)]
    console.log(Math.round(Math.random() * arrayResponse.length))
    this.setState({
      originalsData: arrayResponse,
      color: ourPoster.posterPath,
      heading: ourPoster.title,
      para: ourPoster.overview,
    })
  }

  componentDidMount() {
    this.getTrendingData()
    this.getOriginalData()
  }

  render() {
    const {trendingNowData, originalsData, color, heading, para} = this.state

    return (
      <div className="mainDiv">
        <UserDiv className="card-container" color={color}>
          <Header />
          <h1>{heading}</h1>
          <p>{para}</p>
          <button type="button">Play</button>
        </UserDiv>

        <div style={{height: '50vh'}}>
          <h1>Trending Now</h1>
          <div className="slider-container">
            <Slider {...settings}>
              {trendingNowData.map(eachItem => (
                <TrendingCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </Slider>
          </div>
          <h1>Originals</h1>
          <div className="slider-container">
            <Slider {...settings}>
              {originalsData.map(eachItem => (
                <OriginalsDataCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
