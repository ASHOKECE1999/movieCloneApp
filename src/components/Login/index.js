import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    userPassword: '',
    userName: '',
    errorMsgDisplay: false,
    errorMessage: '',
  }

  takeTheUserInput = event => {
    this.setState({userName: event.target.value})
  }

  takeTheUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  renderOnFailure = errorMsg => {
    this.setState({errorMsgDisplay: true, errorMessage: errorMsg})
  }

  renderOnSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwtToken', jwtToken, {expires: 20, path: '/'})
    history.replace('/')
    console.log(jwtToken)
    this.setState({errorMsgDisplay: false})
  }

  fetchData = async event => {
    event.preventDefault()
    const {userName, userPassword} = this.state
    console.log(userName)
    console.log(userPassword)
    const userDetails = {
      username: userName,
      password: userPassword,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const data = await fetch('https://apis.ccbp.in/login', options)
    const dataGet = await data.json()
    if (data.ok) {
      this.renderOnSuccess(dataGet.jwt_token)
    } else {
      this.renderOnFailure(dataGet.error_msg)
    }
  }

  render() {
    const {errorMsgDisplay, errorMessage} = this.state
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-div">
        <div>
          <img
            src="https://res.cloudinary.com/dhowpxwxx/image/upload/v1678422474/Project/Group_7399_zzdm4n.png"
            alt="logo"
            className="login website logo"
          />
        </div>
        <div className="secondDiv">
          <form onSubmit={this.fetchData} className="myForm">
            <h1 className="myHeading">Login</h1>
            <div className="myCard">
              <label htmlFor="userInput">USERNAME</label>
              <input
                id="userInput"
                onChange={this.takeTheUserInput}
                type="text"
              />
              <label htmlFor="userPassword">PASSWORD</label>
              <input
                id="userPassword"
                onChange={this.takeTheUserPassword}
                type="password"
              />

              <button type="submit">Login</button>
            </div>
            {errorMsgDisplay ? (
              <p style={{color: 'red'}}>{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
