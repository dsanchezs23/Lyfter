package dto.request;

import dto.response.UserResponseDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomerRequestDTO extends UserResponseDTO {
    @NotBlank(message="Shipping address field must be provided")
    private String shippingAddress;
}
