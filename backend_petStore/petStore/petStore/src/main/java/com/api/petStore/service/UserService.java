package com.api.petStore.service;

import com.api.petStore.dto.request.CustomerRequestDTO;
import com.api.petStore.dto.response.UserResponseDTO;
import com.api.petStore.entity.Customer;
import com.api.petStore.entity.Employee;
import com.api.petStore.entity.Manager;
import com.api.petStore.entity.User;
import com.api.petStore.enums.Role;
import com.api.petStore.exception.InvalidCredentialsException;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.UserMapper;
import com.api.petStore.mapper.UserResponseMapper;
import org.springframework.stereotype.Service;
import com.api.petStore.repository.CustomerRepository;
import com.api.petStore.repository.EmployeeRepository;
import com.api.petStore.repository.ManagerRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final ManagerRepository managerRepository;
    private final UserMapper userMapper;
    private final UserResponseMapper userResponseMapper;

    public UserResponseDTO createUser(CustomerRequestDTO userRequestDTO, Role role) {
        if (role == Role.MANAGER) {
            Manager manager = userMapper.toManager(userRequestDTO);
            manager.setId(UUID.randomUUID().toString());
            manager.setRole(Role.MANAGER);
            return userResponseMapper.toManagerResponseDTO(managerRepository.save(manager));
        }
        if (role == Role.EMPLOYEE) {
            Employee employee = userMapper.toEmployee(userRequestDTO);
            employee.setId(UUID.randomUUID().toString());
            employee.setRole(Role.EMPLOYEE);
            return userResponseMapper.toEmployeeResponseDTO(employeeRepository.save(employee));
        }
        Customer customer = userMapper.toCustomer(userRequestDTO);
        customer.setId(UUID.randomUUID().toString());
        customer.setRole(Role.CUSTOMER);
        return userResponseMapper.toCustomerResponseDTO(customerRepository.save(customer));
    }

    public UserResponseDTO getUserById(String id, Role role) {
        if (role == Role.MANAGER) {
            Manager manager = managerRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Manager not found: " + id));
            return userResponseMapper.toManagerResponseDTO(manager);
        }
        if (role == Role.EMPLOYEE) {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Employee not found: " + id));
            return userResponseMapper.toEmployeeResponseDTO(employee);
        }
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Customer not found: " + id));
        return userResponseMapper.toCustomerResponseDTO(customer);
    }

    public List<UserResponseDTO> getAllUsers(Role role) {
        if (role == Role.MANAGER) {
            return managerRepository.findAll().stream()
                    .map(userResponseMapper::toManagerResponseDTO)
                    .collect(Collectors.toList());
        }
        if (role == Role.EMPLOYEE) {
            return employeeRepository.findAll().stream()
                    .map(userResponseMapper::toEmployeeResponseDTO)
                    .collect(Collectors.toList());
        }
        return customerRepository.findAll().stream()
                .map(userResponseMapper::toCustomerResponseDTO)
                .collect(Collectors.toList());
    }

    public UserResponseDTO login(String email, String password) {
        var manager = managerRepository.findByEmail(email);
        if (manager.isPresent()) {
            return authenticate(manager.get(), password, userResponseMapper::toManagerResponseDTO);
        }
        var employee = employeeRepository.findByEmail(email);
        if (employee.isPresent()) {
            return authenticate(employee.get(), password, userResponseMapper::toEmployeeResponseDTO);
        }
        var customer = customerRepository.findByEmail(email);
        if (customer.isPresent()) {
            return authenticate(customer.get(), password, userResponseMapper::toCustomerResponseDTO);
        }
        throw new InvalidCredentialsException("Credenciales incorrectas.");
    }

    private <T extends User, R extends UserResponseDTO> R authenticate(T user, String password, java.util.function.Function<T, R> mapper) {
        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Credenciales incorrectas.");
        }
        return mapper.apply(user);
    }
}
