export interface OrderStatusChangedEvent {
  orderId: string;
  fromStatus: string;
  toStatus: string;
  timestamp: Date;
}
