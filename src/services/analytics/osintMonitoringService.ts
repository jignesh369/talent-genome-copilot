
export class OSINTMonitoringService {
  private monitoringCandidates: Set<string> = new Set();
  private updateInterval: number = 6 * 60 * 60 * 1000; // 6 hours
  private intervalId: NodeJS.Timeout | null = null;

  startMonitoring(candidateIds: string[]): void {
    candidateIds.forEach(id => this.monitoringCandidates.add(id));
    console.log(`Started OSINT monitoring for ${candidateIds.length} candidates`);
    
    if (!this.intervalId) {
      this.scheduleUpdates();
    }
  }

  stopMonitoring(candidateId: string): void {
    this.monitoringCandidates.delete(candidateId);
    
    if (this.monitoringCandidates.size === 0 && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stopAllMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.monitoringCandidates.clear();
  }

  getMonitoringStatus(): { total: number; active: Array<string> } {
    return {
      total: this.monitoringCandidates.size,
      active: Array.from(this.monitoringCandidates)
    };
  }

  getMonitoredCandidates(): string[] {
    return Array.from(this.monitoringCandidates);
  }

  private scheduleUpdates(): void {
    this.intervalId = setInterval(async () => {
      const { osintUpdateService } = await import('./osintUpdateService');
      
      for (const candidateId of this.monitoringCandidates) {
        await osintUpdateService.checkForUpdates(candidateId);
      }
    }, this.updateInterval);
  }

  setUpdateInterval(hours: number): void {
    this.updateInterval = hours * 60 * 60 * 1000;
    
    if (this.intervalId) {
      this.stopAllMonitoring();
      if (this.monitoringCandidates.size > 0) {
        this.scheduleUpdates();
      }
    }
  }
}

export const osintMonitoringService = new OSINTMonitoringService();
