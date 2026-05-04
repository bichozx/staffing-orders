export class OrderStatusChangedEvent {
  orderId!: string;
  fromStatus!: string;
  toStatus!: string;
  timestamp!: Date;
  metadata?: Record<string, any>;
}
