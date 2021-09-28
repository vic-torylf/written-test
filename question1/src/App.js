import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} ></Route>
          <Route path="/login" exact component={Login} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
