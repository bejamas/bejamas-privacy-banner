/**
 * Simple event bus for component communication
 */
export type EventCallback = (data: any) => void;
export type Unsubscribe = () => void;

export enum Events {
  CONSENT_UPDATED = 'CONSENT_UPDATED',
  CONSENT_ALL_ACCEPTED = 'CONSENT_ALL_ACCEPTED',
  CONSENT_ALL_REJECTED = 'CONSENT_ALL_REJECTED',
}

export class EventBus {
  private events: Record<string, EventCallback[]> = {};

  subscribe(event: string, callback: EventCallback): Unsubscribe {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event: string, data?: any): void {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }
}
