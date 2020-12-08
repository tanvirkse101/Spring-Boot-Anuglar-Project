package com.example.restservice.models.report;

class Medicine {
    private String drugname;
    private Double unit;
    private Double dosage;

    public Medicine(String drugname, Double unit, Double dosage) {
        this.drugname = drugname;
        this.unit = unit;
        this.dosage = dosage;
    }

    public Medicine() {

    }

    public String getDrugname() {
        return drugname;
    }

    public void setDrugname(String drugname) {
        this.drugname = drugname;
    }

    public Double getUnit() {
        return unit;
    }

    public void setUnit(Double unit) {
        this.unit = unit;
    }

    public Double getDosage() {
        return dosage;
    }

    public void setDosage(Double dosage) {
        this.dosage = dosage;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "drugname='" + drugname + '\'' +
                ", unit=" + unit +
                ", dosage=" + dosage +
                '}';
    }
}