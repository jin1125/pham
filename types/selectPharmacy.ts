export type SelectPharmacy = {
  access?: string;
  ageRange?: string;
  coId?: string;
  comments?: string;
  drugHistory?: string;
  homeMedical?: string;
  lastmodified?: number;
  mainPrescription?: string;
  nearClinic?: string;
  numberOfPrescription?: string;
  objectID?: string;
  openingDate?: string;
  openingHours?: string;
  otherEquipment?: string;
  pharmacyAddress?: string;
  pharmacyName?: string;
  pharmacyPrefecture?: string;
  regularHoliday?: string;
  staff?: {
    age:string;
    comment:string;
    sex:string;
  }[]
  structure?: string;
  unique?: string;
  __position?: number;
}