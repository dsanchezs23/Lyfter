package com.api.petStore.repository;

import com.api.petStore.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Employee findById (String id);
}
