package com.example.restservice.models.tests;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tests")
public class Test {
    @Id
    private String id;
    private String name;
    private String shortname;
    private String samname;
    private Integer price;
    private Integer quantity;

    public Test(String id, String name, String shortname, String samname, Integer price, Integer quantity) {
        this.id = id;
        this.name = name;
        this.shortname = shortname;
        this.samname = samname;
        this.price = price;
        this.quantity = quantity;
    }

    public Test() {

    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

    public String getSamname() {
        return samname;
    }

    public void setSamname(String samname) {
        this.samname = samname;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Test{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", shortname='" + shortname + '\'' +
                ", samname='" + samname + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }
}
