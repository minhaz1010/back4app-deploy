/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Root {
  data: Data;
  event_attributes: EventAttributes;
  object: string;
  timestamp: number;
  type: string;
}

export interface IClerkProps {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: any[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: any;
  primary_web3_wallet_id: any;
  private_metadata: PrivateMetadata;
  profile_image_url: string;
  public_metadata: PublicMetadata;
  two_factor_enabled: boolean;
  unsafe_metadata: UnsafeMetadata;
  updated_at: number;
  username: any;
  web3_wallets: any[];
}

export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: Verification;
}

export interface Verification {
  status: string;
  strategy: string;
}

export interface PrivateMetadata {}

export interface PublicMetadata {}

export interface UnsafeMetadata {}

export interface EventAttributes {
  http_request: HttpRequest;
}

export interface HttpRequest {
  client_ip: string;
  user_agent: string;
}
