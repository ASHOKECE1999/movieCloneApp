import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails/index'
import Search from './components/Search/index'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute/index'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
        <ProtectedRoute exact path="/search" component={Search} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
