package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String category;
    @NotBlank
    private String image;
    @NotBlank
    private String price;
    @NotBlank
    private String discount;
    @NotBlank
    private String stockQuantity;
    @NotBlank
    private Date createdAt;
    @NotBlank
    private Date updatedAt;
}
