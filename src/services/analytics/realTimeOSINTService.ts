
import { OSINTProfile } from '@/types/osint';
import { osintMonitoringService } from './osintMonitoringService';
import { osintUpdateService, OSINTUpdate } from './osintUpdateService';
import { osintNotificationService } from './osintNotificationService';

class RealTimeOSINTService {
  startMonitoring(candidateIds: string[]): void {
    osintMonitoringService.startMonitoring(candidateIds);
  }

  stopMonitoring(candidateId: string): void {
    osintMonitoringService.stopMonitoring(candidateId);
  }

  onUpdate(callback: (update: OSINTUpdate) => void): void {
    osintNotificationService.onUpdate(callback);
  }

  removeUpdateCallback(callback: (update: OSINTUpdate) => void): void {
    osintNotificationService.removeUpdateCallback(callback);
  }

  getMonitoringStatus(): { total: number; active: Array<string> } {
    return osintMonitoringService.getMonitoringStatus();
  }

  async checkForUpdates(candidateId: string): Promise<void> {
    return osintUpdateService.checkForUpdates(candidateId);
  }

  async batchUpdateCandidates(candidateIds: string[]): Promise<OSINTUpdate[]> {
    return osintUpdateService.batchUpdateCandidates(candidateIds);
  }

  setUpdateInterval(hours: number): void {
    osintMonitoringService.setUpdateInterval(hours);
  }

  // Utility methods
  clearAllCallbacks(): void {
    osintNotificationService.clearAllCallbacks();
  }

  stopAllMonitoring(): void {
    osintMonitoringService.stopAllMonitoring();
  }

  getServiceStats(): {
    monitoring: { total: number; active: string[] };
    callbacks: number;
  } {
    return {
      monitoring: this.getMonitoringStatus(),
      callbacks: osintNotificationService.getCallbackCount()
    };
  }
}

export const realTimeOSINTService = new RealTimeOSINTService();
