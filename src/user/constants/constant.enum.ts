/* eslint-disable prettier/prettier */
export enum PersonRole {
  CUSTOMER = 'customer',
  LAUNDRY_PROVIDER = 'laundry_provider',
  DISPATCH_PERSONNEL = 'dispatch_personnel',
  ADMIN = 'admin',
  CREATOR = 'zeus',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Subscription {
  FREE = 'free',
  BASIC = 'basic',
  PREMUIM = 'premium',
}

export enum OrderStatus {
  PICKED_UP,
  WASHING,
  DRYING,
  IRONING,
  PACKAGING,
  IN_TRANSIT,
  DELIVERED,
}

export enum PaymentMethod {
  CREDIT_CARD,
  BANK_TRANSFER,
  CASH,
}

export enum PaymentGateWay {
  FLUTTER_WAVE,
  PAYSTACK,
  MONIEPOINT,
  OPAY,
}
