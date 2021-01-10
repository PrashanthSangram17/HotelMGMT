import UserDetails from "./UserDetails";
import "./Projindex.css";
import Welcome from "./Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home/Home";
import Availability from "./Availability";
import Room from "./Room";
import Footer from "./Footer";
import Feedback from "./Feedback";

function App() {
	return (
		<div className="App">
			<Router>
				<Welcome />

				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" component={About} />
					<Route path="/userdetails" component={UserDetails} />
					<Route path="/availability" component={Availability} />
					<Route path="/room" component={Room} />
					<Route path="/feedback" component={Feedback} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
