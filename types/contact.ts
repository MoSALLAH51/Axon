export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address_en: string;
  address_ar: string;
  google_maps_url: string;
  working_hours_en: string;
  working_hours_ar: string;
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}
