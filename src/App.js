import {Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './login'

import Home from './Home'

import NotFound from './NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
