import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import AddEmployeeComponent from "./components/AddEmployeeComponent";
import { Toaster } from "sonner";

function App() {
	return (
		<div>
			<Toaster richColors dur />
			<Router>
				<HeaderComponent />
				<div className="container">
					<Routes>
						<Route
							path="/"
							element={<ListEmployeeComponent />}
						></Route>
						<Route
							path="/add-employee"
							element={<AddEmployeeComponent />}
						></Route>
						<Route
							path="/edit/employee/:id"
							element={<AddEmployeeComponent />}
						></Route>
					</Routes>
				</div>
				<FooterComponent />
			</Router>
		</div>
	);
}

export default App;
