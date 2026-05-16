package mapper;

import dto.request.CustomerRequestDTO;
import dto.request.EmployeeRequestDTO;
import dto.request.ManagerRequestDTO;
import entity.Customer;
import entity.Employee;
import entity.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    Manager toManager(ManagerRequestDTO dto);
    Employee toEmployee(EmployeeRequestDTO dto);
    Customer toCustomer(CustomerRequestDTO dto);
}