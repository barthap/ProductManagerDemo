export interface ApiEventListener<T> {
  onEvent: (event: T) => void;
}

export abstract class ApiEventManager<T> {
  private listeners: ApiEventListener<T>[] = [];

  public addEventListener(listener: ApiEventListener<T>): number {
    this.listeners.push(listener);
    const listenerId = this.listeners.indexOf(listener);
    console.log('Attached listener ID:', listenerId);
    return listenerId;
  }

  public removeEventListener(listenerId: number) {
    console.log('Detaching listener ID', listenerId, '...');
    delete this.listeners[listenerId];
  }

  protected emitEvent(event: T) {
    console.log('Event emitted:', event);
    this.listeners.forEach((lis) => lis.onEvent(event));
  }

  protected listenerCount() {
    return this.listeners.length;
  }

  public abstract start(): void;
}
