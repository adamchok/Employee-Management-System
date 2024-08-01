package com.project.EMS_backend.controller;

import com.project.EMS_backend.model.Employee;
import com.project.EMS_backend.repository.EmployeeRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    // FETCH ALL EMPLOYEES FETCH API
    @GetMapping
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        employees.sort(Comparator.comparingLong(Employee::getId));
        return employees;
    }

    // CREATE EMPLOYEE REST API
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    // FETCH EMPLOYEE BY ID
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            return ResponseEntity.ok(employeeOpt.get());
        } else {
            throw new ResourceNotFoundException("Employee does not exist with ID "+ id);
        }
    }

    // UPDATE EMPLOYEE DETAILS
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with ID "+ id));

        updateEmployee.setFirstName(employee.getFirstName());
        updateEmployee.setLastName(employee.getLastName());
        updateEmployee.setEmail(employee.getEmail());

        employeeRepository.save(updateEmployee);
        return ResponseEntity.ok(updateEmployee);
    }

    // DELETE EMPLOYEE
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            Employee deleteEmployee = employeeOpt.get();
            employeeRepository.delete(deleteEmployee);
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Employee does not exist with ID " + id);
        }
    }


}
