// File Location: src/types/contact.ts (or types/contact.ts)

export type FieldType = 'TEXT' | 'TEXTAREA' | 'EMAIL' | 'NUMBER' | 'SELECT';
export type GridWidth = 'HALF' | 'FULL';

export interface FieldConfig {
  id: string;
  fieldName: string;
  label: string;
  placeholder?: string;
  fieldType: FieldType;
  gridWidth: GridWidth;
  isRequired: boolean;
  sortOrder: number;
  prefixIcon?: string;
  postfixText?: string;
  options?: string[]; // Dropdown selections string array
}

export interface ContactSettings {
  pageMaxWidth: string;
  companyMailId: string;
  notifyCompany: boolean;
  notifyUser: boolean;
  companyMailTemplate: string;
  userThankYouTemplate: string;
  alertSuccessMessage: string;
  mapEmbedUrl: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  slug: string;
  answerJson: any; // EditorJS output blocks array object
  isPinned: boolean;
  isActive: boolean;
}