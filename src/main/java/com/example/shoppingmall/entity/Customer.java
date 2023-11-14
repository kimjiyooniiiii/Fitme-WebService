package com.example.shoppingmall.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
@Entity(name="customer")
@AllArgsConstructor
public class Customer {

    @Id
    private String customerId;

    private String password;

    private String name;

    private String phone;

    private String address;


}
