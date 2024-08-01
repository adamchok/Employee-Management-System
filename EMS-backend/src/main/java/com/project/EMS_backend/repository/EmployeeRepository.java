package com.project.EMS_backend.repository;

import com.project.EMS_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // ALL CRUD DATABASE METHOD
}
