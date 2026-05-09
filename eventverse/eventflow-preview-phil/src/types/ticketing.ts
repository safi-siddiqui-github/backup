export interface GuestTicket {
  id: string;
  ticketNumber: string;
  type: string;
  qrCode: string;
  status: 'valid' | 'transferred' | 'used' | 'refunded';
  purchaseDate: Date;
  price: number;
  seatAssignment?: {
    table?: number;
    seat?: string;
    section?: string;
  };
  transferHistory?: TransferRecord[];
  holder: {
    name: string;
    email: string;
  };
  eventDetails: {
    eventId: string;
    eventName: string;
    date: Date;
    time: string;
    location: string;
    address: string;
  };
}

export interface TransferRecord {
  id: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName?: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  message?: string;
}

export interface TicketReceipt {
  receiptNumber: string;
  purchaseDate: Date;
  tickets: Array<{
    type: string;
    quantity: number;
    pricePerTicket: number;
    subtotal: number;
  }>;
  subtotal: number;
  fees: {
    serviceFee: number;
    processingFee: number;
    tax: number;
  };
  total: number;
  paymentMethod: {
    type: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer';
    last4?: string;
    brand?: string;
  };
  transactionId: string;
  billingAddress?: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface PurchaseHistory {
  purchases: Array<{
    id: string;
    eventName: string;
    eventDate: Date;
    purchaseDate: Date;
    ticketCount: number;
    totalAmount: number;
    status: 'completed' | 'refunded' | 'partially-refunded';
    receiptNumber: string;
  }>;
}
