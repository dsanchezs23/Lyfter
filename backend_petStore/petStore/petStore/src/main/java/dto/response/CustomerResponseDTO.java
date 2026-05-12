package dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomerResponseDTO extends UserResponseDTO {
    private String shippingAddress;
    private List<String> orderHistory;
}
