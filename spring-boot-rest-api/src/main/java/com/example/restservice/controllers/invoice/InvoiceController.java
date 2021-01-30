package com.example.restservice.controllers.invoice;

import com.example.restservice.models.invoice.Invoice;
import com.example.restservice.repository.InvoiceRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class InvoiceController {
    @Autowired
    InvoiceRepositroy invoiceRepositroy;

    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        try {
            List<Invoice> invoices = new ArrayList<Invoice>();
            invoiceRepositroy.findAll().forEach(invoices::add);

            if (invoices.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(invoices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable("id") String id) {
        Optional<Invoice> invoiceData = invoiceRepositroy.findById(id);

        if (invoiceData.isPresent()) {
            return new ResponseEntity<>(invoiceData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/invoices/patient/{patientid}")
    public ResponseEntity<Invoice> getInvoiceByPatientId(@PathVariable("patientid") String patientid) {
        Optional<Invoice> invoiceData = invoiceRepositroy.findByPatientid(patientid);

        if (invoiceData.isPresent()) {
            return new ResponseEntity<>(invoiceData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        try {
            Invoice _invoice = invoiceRepositroy.save(new Invoice(
                    invoice.getId(),
                    invoice.getDoctorid(),
                    invoice.getPatientid(),
                    invoice.getCreateddate(),
                    invoice.getPaymentmethod(),
                    invoice.getTests()
            ));
            return new ResponseEntity<>(_invoice, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<Invoice> updateTest(@PathVariable("id") String id, @RequestBody Invoice invoice) {
        Optional<Invoice> invoiceData = invoiceRepositroy.findById(id);

        if (invoiceData.isPresent()) {
            Invoice _invoice = invoiceData.get();
            _invoice.setPatientid(invoice.getPatientid());
            _invoice.setDoctorid(invoice.getDoctorid());
            _invoice.setPaymentmethod(invoice.getPaymentmethod());
            _invoice.setTests(invoice.getTests());

            return new ResponseEntity<>(invoiceRepositroy.save(_invoice), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/invoice/{id}")
    public ResponseEntity<HttpStatus> deleteInvoice(@PathVariable("id") String id) {
        try {
            invoiceRepositroy.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
