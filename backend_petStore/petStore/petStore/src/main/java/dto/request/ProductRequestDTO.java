package dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductRequestDTO {
    @NotBlank(message = "Id field must be provided")
    private String id;
    @NotBlank(message = "Name field must be provided")
    private String name;
    @NotBlank(message = "Description field must be provided")
    private String description;
    @NotBlank(message="Category field must be provided")
    private String category;
    @NotBlank(message="Image field must be provided")
    private String image;
    @NotBlank(message="Price field must be provided")
    private String price;
    @NotBlank(message="Discount field must be provided")
    private String discount;
    @NotBlank(message="Stock quantity field must be provided")
    private String stockQuantity;
}
