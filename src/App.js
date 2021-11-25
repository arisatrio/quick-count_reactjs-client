import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./components/layout/Main";

import TotalDPT from "./pages/TotalDPT";
import DataTPS from "./pages/DataTPS";
import DataSaksi from "./pages/DataSaksi";

import LoginSaksi from "./pages-saksi/LoginSaksi";
import HomeSaksi from "./pages-saksi/HomeSaksi";

import Dashboard from "./pages-public/Dashboard";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
		  	{/* SAKSI */}
			<Route path="/login-saksi" exact component={LoginSaksi}  />
			<Route path="/home-saksi" exact component={HomeSaksi}  />
			{/* PUBLIC DASHBOARD */}
			<Route path="/" exact component={Dashboard}  />

			{/* ADMIN */}
			<Main>
				<Route exact path="/dashboard" component={Home} />
				<Route exact path="/total-dpt" component={TotalDPT} />
				<Route exact path="/data-tps" component={DataTPS} />
				<Route exact path="/data-saksi" component={DataSaksi} />
			</Main>
      </Switch>
    </div>
  );
}

export default App;
