import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { toast } from "sonner";

const AddEmployeeComponent = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const { id } = useParams(); // Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path

	const navigate = useNavigate();

	const saveOrUpdateEmployee = (e) => {
		e.preventDefault();
		const employee = { firstName, lastName, email };

		if (id) {
			EmployeeService.updateEmployee(id, employee)
				.then((response) => {
					console.log(response.data);
					toast.success("Employee updated successfully", {
						duration: 2000,
					});
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
					toast.success("Error updating employee");
				});
		} else {
			EmployeeService.createEmployee(employee)
				.then((response) => {
					console.log(response.data);
					toast.success("Employee created successfully", {
						duration: 2000,
					});
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
					toast.success("Error creating employee");
				});
		}
	};

	useEffect(() => {
		if (id) {
			EmployeeService.getEmployeeById(id)
				.then((response) => {
					setFirstName(response.data.firstName);
					setLastName(response.data.lastName);
					setEmail(response.data.email);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("ID Error");
		}
	}, [id]);

	const title = () => {
		if (id) {
			return (
				<h2 className="text-center" style={{ paddingTop: "10px" }}>
					Update Employee Form
				</h2>
			);
		} else {
			return (
				<h2 className="text-center" style={{ paddingTop: "10px" }}>
					Add Employee Form
				</h2>
			);
		}
	};

	return (
		<div>
			<br /> <br />
			<div className="container">
				<div className="row justify-content-center">
					<div className="card col-md-6">
						{title()}
						<div className="card-body">
							<form>
								<div className="form-group mb-2">
									<label className="form-label">
										First Name:
									</label>
									<input
										type="text"
										placeholder="Enter first name"
										name="firstName"
										className="form-control"
										value={firstName}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									></input>
								</div>

								<div className="form-group mb-2">
									<label className="form-label">
										Last Name:
									</label>
									<input
										type="text"
										placeholder="Enter last name"
										name="lastName"
										className="form-control"
										value={lastName}
										onChange={(e) =>
											setLastName(e.target.value)
										}
									></input>
								</div>

								<div className="form-group mb-2">
									<label className="form-label">Email:</label>
									<input
										type="text"
										placeholder="Enter email"
										name="email"
										className="form-control"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									></input>
								</div>

								<button
									className="btn btn-success"
									onClick={(e) => saveOrUpdateEmployee(e)}
									style={{
										marginTop: "7px",
									}}
								>
									Submit
								</button>

								<Link
									to="/"
									className="btn btn-danger"
									style={{
										marginLeft: "7px",
										marginTop: "7px",
									}}
								>
									Cancel
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddEmployeeComponent;
