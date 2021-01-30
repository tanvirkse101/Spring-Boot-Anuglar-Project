// private String id;
// private String patientid;
// private String doctorid;
// @CreatedDate
// private Date createddate;
// private String paymentmethod;
// private List<Test> tests;

import { Test } from './test';

export class Invoice {
  id: string;
  patientid: string;
  doctorid: string;
  paymentmethod: string;
  createddate: Date;
  tests: Test[];
}
