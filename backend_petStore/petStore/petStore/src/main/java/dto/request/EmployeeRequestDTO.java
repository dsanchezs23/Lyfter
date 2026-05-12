package dto.request;

import dto.response.UserResponseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeRequestDTO extends UserResponseDTO {
}
