export class Medicine {
  drugname: string;
  unit: number;
  dosage: number;

  constructor(drugname: string, unit: number, dosage: number) {
    this.drugname = drugname;
    this.unit = unit;
    this.dosage = dosage;
  }
}
