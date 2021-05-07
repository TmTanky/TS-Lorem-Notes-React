import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Components
import {Header} from './components/header/header'

// Pages
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';

// CSS
import './App.css';

const App: FC = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
      </BrowserRouter>
    </div>
  )

}

export default App;
