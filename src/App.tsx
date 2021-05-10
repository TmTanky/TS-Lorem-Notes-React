import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import {Header} from './components/header/header'
import {Footer} from './components/footer/footer'

// Pages
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { HomePage } from './pages/home/home';
import { PincodeEnter } from './pages/enterPincode/EnterPincode';
import { SecretHome } from './pages/secret/secret'

// Interfaces
import { Istate } from './interfaces/state';

// CSS
import './App.css';

const App: FC = () => {

  const isLoggedIn = useSelector<Istate>(state => state.isLoggedIn)
  const isSecret = useSelector<Istate>(state => state.secret)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" render={()=> isLoggedIn ? <Redirect to="/mynotes"/> : <LoginPage/> } />
            <Route path="/register" render={()=> isLoggedIn ? <Redirect to="/mynotes"/> : <RegisterPage/> } />
            <Route path="/mynotes" render={()=> isLoggedIn ? <HomePage/> : <Redirect to="/"/> } />
            <Route path="/enterpincode" render={() => isSecret === 'Pending' && isLoggedIn ? <PincodeEnter/> : <Redirect to="/mynotes" /> } />
            <Route path="/secret" render={() => isSecret && isLoggedIn ? <SecretHome/> : <Redirect to="/mynotes" /> } />
          </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  )

}

export default App;
