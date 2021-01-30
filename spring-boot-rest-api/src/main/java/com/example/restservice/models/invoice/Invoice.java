package com.example.restservice.models.invoice;

import com.example.restservice.models.tests.Test;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "invoices")
public class Invoice {
    @Id
    private String id;
    private String patientid;
    private String doctorid;
    @CreatedDate
    private Date createddate;
    private String paymentmethod;
    private List<Test> Tests;

    public Invoice(String patientid, String doctorid, Date createddate, String paymentmethod, List<Test> tests) {
        this.patientid = patientid;
        this.doctorid = doctorid;
        this.createddate = createddate;
        this.paymentmethod = paymentmethod;
        Tests = tests;
    }

    public Invoice() {

    }

    public String getId() {
        return id;
    }

    public String getPatientid() {
        return patientid;
    }

    public void setPatientid(String patientid) {
        this.patientid = patientid;
    }

    public String getDoctorid() {
        return doctorid;
    }

    public void setDoctorid(String doctorid) {
        this.doctorid = doctorid;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }

    public String getPaymentmethod() {
        return paymentmethod;
    }

    public void setPaymentmethod(String paymentmethod) {
        this.paymentmethod = paymentmethod;
    }

    public List<Test> getTests() {
        return Tests;
    }

    public void setTests(List<Test> tests) {
        Tests = tests;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "id='" + id + '\'' +
                ", patientid='" + patientid + '\'' +
                ", doctorid='" + doctorid + '\'' +
                ", createddate=" + createddate +
                ", paymentmethod='" + paymentmethod + '\'' +
                ", Tests=" + Tests +
                '}';
    }
}
