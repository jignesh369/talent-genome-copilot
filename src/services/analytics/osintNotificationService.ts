
import { OSINTUpdate } from './osintUpdateService';

export class OSINTNotificationService {
  private updateCallbacks: Array<(update: OSINTUpdate) => void> = [];

  onUpdate(callback: (update: OSINTUpdate) => void): void {
    this.updateCallbacks.push(callback);
  }

  removeUpdateCallback(callback: (update: OSINTUpdate) => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index > -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  notifyUpdate(update: OSINTUpdate): void {
    console.log(`🚨 OSINT Update [${update.risk_level.toUpperCase()}]: ${update.changes.join(', ')}`);
    this.updateCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('Error in OSINT update callback:', error);
      }
    });
  }

  clearAllCallbacks(): void {
    this.updateCallbacks = [];
  }

  getCallbackCount(): number {
    return this.updateCallbacks.length;
  }

  // Batch notification for multiple updates
  notifyBatchUpdates(updates: OSINTUpdate[]): void {
    updates.forEach(update => this.notifyUpdate(update));
  }

  // Filter and notify only high-risk updates
  notifyHighRiskUpdates(updates: OSINTUpdate[]): void {
    const highRiskUpdates = updates.filter(update => 
      update.risk_level === 'high' || update.risk_level === 'medium'
    );
    
    if (highRiskUpdates.length > 0) {
      console.log(`🔥 High-risk OSINT updates detected for ${highRiskUpdates.length} candidates`);
      highRiskUpdates.forEach(update => this.notifyUpdate(update));
    }
  }
}

export const osintNotificationService = new OSINTNotificationService();
