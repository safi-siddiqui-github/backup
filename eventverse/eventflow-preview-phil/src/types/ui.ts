// UI Component types
import { ReactNode, MouseEvent, ChangeEvent, FormEvent } from 'react';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export type InputVariant = 'default' | 'destructive';

export type AlertVariant = 'default' | 'destructive';

// Common event handler types
export type ClickHandler = (event: MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
export type FormSubmitHandler = (event: FormEvent<HTMLFormElement>) => void;
export type ValueChangeHandler<T = string> = (value: T) => void;

// Generic component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
}

// Dialog and Modal props
export interface DialogProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface ModalProps extends DialogProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backdrop?: boolean;
  escapeKeyDown?: boolean;
}

// Form input props
export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: ChangeHandler;
  onValueChange?: ValueChangeHandler;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
}

export interface SelectProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: ValueChangeHandler;
  disabled?: boolean;
  placeholder?: string;
}

export interface TextareaProps extends BaseComponentProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeHandler;
  onValueChange?: ValueChangeHandler;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

// Navigation and menu types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: ClickHandler;
  disabled?: boolean;
  children?: NavItem[];
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

// Table and list types
export interface TableColumn<T = Record<string, unknown>> {
  id: string;
  header: string;
  accessor: keyof T | string;
  cell?: (value: unknown, row: T) => ReactNode;
  sortable?: boolean;
  width?: string | number;
}

export interface ListItem {
  id: string;
  content: ReactNode;
  onClick?: ClickHandler;
  disabled?: boolean;
  selected?: boolean;
}

// Notification and toast types
export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

export interface ToastConfig {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: ClickHandler;
  };
}

// Loading and async states
export interface AsyncState<T = unknown> {
  data?: T;
  loading: boolean;
  error?: string | Error;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Component state types
export type ComponentState = 'idle' | 'loading' | 'success' | 'error';

export interface ComponentError {
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
}