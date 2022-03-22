import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import LayoutRoute from "./LayoutRoute";
// import LayoutTwo from "./LayoutTwo";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import UploadScreen from "./screens/UploadScreen.js";
import AboutScreen from '../src/screens/AboutScreen.js';
import MainScreen from './screens/MainScreen';
import Profile from './screens/Profile'
import { Route } from "react-router-dom";
import LoginMUI from "./LoginMUI";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainScreen} exact={true} />
        {/* <LayoutRoute />1 */}
        <LayoutRoute path="/HomeScreen" component={HomeScreen} exact={true} />
        {/* <Route path="/LoginScreen" component={LoginScreen} exact={true} /> */}
        <LayoutRoute path="/LoginScreen" component={LoginMUI} exact={true} />
        <Route path="/RegistrationScreen" component={RegistrationScreen} exact={true} />
        <LayoutRoute path="/UploadScreen" component={UploadScreen} exact={true} />
        <LayoutRoute path="/AboutScreen" component={AboutScreen} exact={true} />
        <LayoutRoute path="/Profile" component={Profile} exact={true} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
