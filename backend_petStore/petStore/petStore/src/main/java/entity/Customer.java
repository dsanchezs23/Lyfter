package entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Customer extends User {
    @NotBlank
    private String shippingAddress;
    private List<String> orderHistory;
}
