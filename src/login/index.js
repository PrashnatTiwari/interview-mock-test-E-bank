import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userIdInput: '',
    userPinInput: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeIdInput = event => {
    this.setState({
      userIdInput: event.target.value,
    })
  }

  onChangePinInput = event => {
    this.setState({
      userPinInput: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitLoginButton = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const {userIdInput, userPinInput} = this.state
    const userDetails = {
      user_id: userIdInput,
      pin: userPinInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginContainer = () => {
    const {showErrorMsg, errorMsg, userIdInput, userPinInput} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="big-image"
          />
          <form
            className="form-card-container"
            onSubmit={this.onSubmitLoginButton}
          >
            <h1>Welcome Back</h1>
            <label htmlFor="userId" className="label">
              User Id
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter User Id"
              className="input"
              onChange={this.onChangeIdInput}
              value={userIdInput}
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              placeholder="Enter Pin"
              id="pin"
              className="input"
              onChange={this.onChangePinInput}
              value={userPinInput}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <>{this.renderLoginContainer()}</>
  }
}

export default Login
