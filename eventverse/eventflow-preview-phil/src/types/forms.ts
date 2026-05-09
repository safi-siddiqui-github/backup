// Form-related types
export type FormFieldType = 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'file';

export type ValidationRule = 'required' | 'email' | 'phone' | 'min' | 'max' | 'pattern' | 'custom';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: FormFieldOption[];
  validation: FormValidation[];
  conditional?: FormConditional;
}

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormValidation {
  rule: ValidationRule;
  value?: string | number;
  message: string;
}

export interface FormConditional {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string | number | boolean;
}

export interface FormSubmission {
  id: string;
  formId: string;
  submittedBy?: string;
  submittedAt: Date;
  data: Record<string, FormFieldValue>;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export type FormFieldValue = string | number | boolean | Date | string[] | File;

export interface FormConfiguration {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSettings {
  allowAnonymous: boolean;
  requireLogin: boolean;
  multipleSubmissions: boolean;
  confirmationMessage: string;
  redirectUrl?: string;
  emailNotifications: boolean;
  notificationEmails: string[];
}

// Guest form data specifically
export interface GuestFormData {
  name: string;
  email: string;
  phone?: string;
  dietary?: string;
  notes?: string;
  plusOnes: number;
  plusOneNames?: string[];
  customResponses: Record<string, FormFieldValue>;
}

// Expense form data
export interface ExpenseFormData {
  category: string;
  subcategory?: string;
  vendor?: string;
  description: string;
  amount: number;
  date: Date;
  status: 'planned' | 'approved' | 'paid' | 'overdue';
  paymentMethod?: string;
  dueDate?: Date;
  notes?: string;
  receipt?: string;
}