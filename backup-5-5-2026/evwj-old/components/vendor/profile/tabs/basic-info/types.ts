export interface ServiceArea {
  id: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  stateName: string;
  cityName: string;
  miles: number;
}

export interface BasicInfoFormData {
  businessName: string;
  category: string[];
  description: string;
  phone: string;
  email: string;
  website: string;
  businessStreet: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  yearEstablished: string;
  teamSize: string;
  serviceAreas: ServiceArea[];
}

