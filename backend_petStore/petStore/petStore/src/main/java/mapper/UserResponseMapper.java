package mapper;

import dto.response.CustomerResponseDTO;
import dto.response.EmployeeResponseDTO;
import dto.response.ManagerResponseDTO;
import entity.Customer;
import entity.Employee;
import entity.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserResponseMapper {
    ManagerResponseDTO toManagerResponseDTO(Manager manager);
    EmployeeResponseDTO toEmployeeResponseDTO(Employee employee);
    CustomerResponseDTO toCustomerResponseDTO(Customer customer);
}
