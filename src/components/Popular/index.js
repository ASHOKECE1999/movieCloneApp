import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header/index'
import GetTheFile from '../GetTheFile/index'
import './index.css'

class Popuar extends Component {
  state = {popualData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'

    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const Data = await response.json()
    const ourList = Data.results
    const storedOne = ourList.map(eachItem => ({
      id: eachItem.id,
      backdropPath: eachItem.backdrop_path,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
    }))
    this.setState({popualData: storedOne})
  }

  render() {
    const {popualData} = this.state

    return (
      <div className="mainDiv">
        <Header />
        <ol className="myListHandle">
          {popualData.map(eachItem => (
            <GetTheFile eachItem={eachItem} />
          ))}
        </ol>
      </div>
    )
  }
}
export default Popuar
