
import { OSINTProfile } from '@/types/osint';

interface OSINTUpdate {
  candidate_id: string;
  changes: string[];
  risk_level: 'low' | 'medium' | 'high';
  timestamp: string;
}

export class OSINTUpdateService {
  async checkForUpdates(candidateId: string): Promise<void> {
    try {
      const mockUpdates = this.generateMockUpdate(candidateId);
      
      if (mockUpdates.changes.length > 0) {
        const updatedProfile = await this.refreshOSINTProfile(candidateId);
        
        // Notify about the update
        const { osintNotificationService } = await import('./osintNotificationService');
        osintNotificationService.notifyUpdate(mockUpdates);
        
        console.log(`OSINT update for candidate ${candidateId}:`, mockUpdates);
      }
    } catch (error) {
      console.error(`Error updating OSINT for candidate ${candidateId}:`, error);
    }
  }

  private generateMockUpdate(candidateId: string): OSINTUpdate {
    const possibleChanges = [
      'Updated LinkedIn profile with new position',
      'New GitHub commits detected',
      'Published new article on Medium',
      'Changed job status to "Open to opportunities"',
      'Added new skills to professional profiles',
      'Increased activity on technical forums'
    ];

    const changes = Math.random() > 0.7 ? 
      [possibleChanges[Math.floor(Math.random() * possibleChanges.length)]] : 
      [];

    return {
      candidate_id: candidateId,
      changes,
      risk_level: Math.random() > 0.8 ? 'medium' : 'low',
      timestamp: new Date().toISOString()
    };
  }

  private async refreshOSINTProfile(candidateId: string): Promise<OSINTProfile> {
    // Mock updated OSINT data that matches the osint.ts type
    const updatedProfile: OSINTProfile = {
      candidate_id: candidateId,
      overall_score: Math.random() * 2 + 8,
      influence_score: Math.random() * 2 + 7,
      technical_depth: Math.random() * 2 + 8,
      community_engagement: Math.random() * 2 + 7,
      learning_velocity: Math.random() * 2 + 8,
      last_updated: new Date().toISOString(),
      availability_signals: []
    };

    console.log(`Updated OSINT profile for candidate ${candidateId}`);
    
    return updatedProfile;
  }

  async batchUpdateCandidates(candidateIds: string[]): Promise<OSINTUpdate[]> {
    const updates: OSINTUpdate[] = [];
    
    for (const candidateId of candidateIds) {
      try {
        const update = this.generateMockUpdate(candidateId);
        if (update.changes.length > 0) {
          await this.refreshOSINTProfile(candidateId);
          updates.push(update);
        }
      } catch (error) {
        console.error(`Error in batch update for candidate ${candidateId}:`, error);
      }
    }
    
    return updates;
  }
}

export const osintUpdateService = new OSINTUpdateService();
export type { OSINTUpdate };
