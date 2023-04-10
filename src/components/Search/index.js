import {Component} from 'react'
import Cookies from 'js-cookie'
import TrendingCard from '../TrendingCard'

class Search extends Component {
  state = {searchText: '', responseArray: []}

  componentDidMount() {
    this.getData()
  }

  searchTextSetter = event => {
    this.setState({searchText: event.target.value})
  }

  getData = async () => {
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
      options,
    )
    const data = await response.json()
    const arrayResponse = data.results.map(eachItem => ({
      id: eachItem.id,
      backdropPath: eachItem.backdrop_path,
      overview: eachItem.overview,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
    }))
    this.setState({responseArray: arrayResponse})
    console.log(arrayResponse)
  }

  filterFunction = () => {
    this.getData()
  }

  render() {
    const {searchText, responseArray} = this.state

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <input
            type="text"
            onChange={this.searchTextSetter}
            value={searchText}
            style={{width: '50%'}}
          />
          <button type="button" onClick={this.filterFunction}>
            Search
          </button>
        </div>
        <div>
          <ul>
            {responseArray.map(eachItem => (
              <TrendingCard eachItem={eachItem} key={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Search
