import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { toast } from "sonner";

const ListEmployeeComponent = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		getAllEmployees();
	}, []);

	const getAllEmployees = () => {
		EmployeeService.getAllEmployees()
			.then((response) => {
				setEmployees(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteEmployee = (id) => {
		EmployeeService.deleteEmployee(id)
			.then((response) => {
				console.log(response.data);
				getAllEmployees();
				toast.success("Employee deleted successfully", {
					duration: 2000,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error deleting employee");
			});
	};

	return (
		<div className="container">
			<h2 className="text-center" style={{ paddingTop: "10px" }}>
				{" "}
				List Employees{" "}
			</h2>
			<Link to="/add-employee" className="btn btn-primary mb-2">
				Add Employee
			</Link>
			<table className="table table-bordered table-striped">
				<thead>
					<tr>
						<th> Employee ID </th>
						<th> First Name </th>
						<th> Last Name </th>
						<th> Email </th>
						<th> Update </th>
						<th> Delete </th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => (
						<tr key={employee.id}>
							<td> {employee.id} </td>
							<td> {employee.firstName} </td>
							<td> {employee.lastName} </td>
							<td> {employee.email} </td>
							<td>
								<Link
									className="btn btn-info"
									to={`/edit/employee/${employee.id}`}
								>
									Update
								</Link>
							</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deleteEmployee(employee.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListEmployeeComponent;
