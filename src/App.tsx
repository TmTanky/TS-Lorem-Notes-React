import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import {Header} from './components/header/header'

// Pages
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HomePage } from './pages/home/home';

// Interfaces
import { Istate } from './interfaces/state';

// CSS
import './App.css';

const App: FC = () => {

  const isLoggedIn = useSelector<Istate>(state => state.isLoggedIn)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" render={()=> isLoggedIn ? <Redirect to="/mynotes"/> : <LoginPage/> } />
            <Route path="/register" render={()=> isLoggedIn ? <Redirect to="/mynotes"/> : <RegisterPage/> } />
            <Route path="/mynotes" render={()=> isLoggedIn ? <HomePage/> : <Redirect to="/"/> } />
          </Switch>
      </BrowserRouter>
    </div>
  )

}

export default App;
