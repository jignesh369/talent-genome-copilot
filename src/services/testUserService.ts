
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface TestUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: AppRole;
  organizationName: string;
  organizationId: string;
  title?: string;
  department?: string;
}

const TEST_USERS: TestUser[] = [
  // Startup Admin
  {
    email: 'admin@hireai.com',
    password: 'HireAI2024!',
    firstName: 'Platform',
    lastName: 'Admin',
    role: 'startup_admin',
    organizationName: 'HireAI Platform',
    organizationId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Platform Administrator',
    department: 'Operations'
  },
  
  // Customer Admins
  {
    email: 'admin@techcorp.com',
    password: 'TechCorp2024!',
    firstName: 'John',
    lastName: 'Smith',
    role: 'customer_admin',
    organizationName: 'TechCorp Solutions',
    organizationId: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Chief Technology Officer',
    department: 'Leadership'
  },
  {
    email: 'admin@innovate.com',
    password: 'Innovate2024!',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'customer_admin',
    organizationName: 'Innovate Labs',
    organizationId: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Head of People',
    department: 'Human Resources'
  },
  
  // Recruiters
  {
    email: 'recruiter@techcorp.com',
    password: 'Recruiter2024!',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'recruiter',
    organizationName: 'TechCorp Solutions',
    organizationId: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Senior Technical Recruiter',
    department: 'Talent Acquisition'
  },
  {
    email: 'sarah.recruiter@innovate.com',
    password: 'SarahR2024!',
    firstName: 'Sarah',
    lastName: 'Davis',
    role: 'recruiter',
    organizationName: 'Innovate Labs',
    organizationId: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Lead Recruiter',
    department: 'Talent Acquisition'
  },
  
  // Hiring Managers
  {
    email: 'hiring@techcorp.com',
    password: 'Hiring2024!',
    firstName: 'David',
    lastName: 'Brown',
    role: 'hiring_manager',
    organizationName: 'TechCorp Solutions',
    organizationId: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Engineering Manager',
    department: 'Engineering'
  },
  {
    email: 'manager@innovate.com',
    password: 'Manager2024!',
    firstName: 'Lisa',
    lastName: 'Chen',
    role: 'hiring_manager',
    organizationName: 'Innovate Labs',
    organizationId: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Product Manager',
    department: 'Product'
  },
  
  // Candidates
  {
    email: 'candidate1@gmail.com',
    password: 'Candidate2024!',
    firstName: 'Alex',
    lastName: 'Thompson',
    role: 'candidate',
    organizationName: 'Independent',
    organizationId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Senior Software Engineer',
    department: 'Engineering'
  },
  {
    email: 'candidate2@gmail.com',
    password: 'Candidate2024!',
    firstName: 'Jessica',
    lastName: 'Martinez',
    role: 'candidate',
    organizationName: 'Independent',
    organizationId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Product Manager',
    department: 'Product'
  },
  {
    email: 'candidate3@gmail.com',
    password: 'Candidate2024!',
    firstName: 'Michael',
    lastName: 'Garcia',
    role: 'candidate',
    organizationName: 'Independent',
    organizationId: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Data Scientist',
    department: 'Analytics'
  }
];

export class TestUserService {
  static async createAllTestUsers() {
    console.log('Creating test users...');
    
    for (const testUser of TEST_USERS) {
      try {
        await this.createTestUser(testUser);
        console.log(`✅ Created test user: ${testUser.email}`);
      } catch (error) {
        console.error(`❌ Failed to create test user ${testUser.email}:`, error);
      }
    }
    
    console.log('Test user creation completed!');
  }

  static async createTestUser(testUser: TestUser) {
    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          first_name: testUser.firstName,
          last_name: testUser.lastName,
          role: testUser.role,
          organization_name: testUser.organizationName
        }
      }
    });

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('User creation failed - no user ID returned');
    }

    // Update the profile with additional information
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        organization_id: testUser.organizationId,
        title: testUser.title,
        department: testUser.department
      })
      .eq('id', userId);

    if (profileError) {
      console.warn(`Profile update error for ${testUser.email}:`, profileError.message);
    }

    // Create user role assignment
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: testUser.role,
        organization_id: testUser.organizationId
      });

    if (roleError) {
      console.warn(`Role assignment error for ${testUser.email}:`, roleError.message);
    }

    // Create organization membership
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        user_id: userId,
        organization_id: testUser.organizationId,
        status: 'active'
      });

    if (memberError) {
      console.warn(`Membership error for ${testUser.email}:`, memberError.message);
    }

    return authData.user;
  }

  static getTestCredentials() {
    return TEST_USERS.map(user => ({
      email: user.email,
      password: user.password,
      role: user.role,
      organization: user.organizationName
    }));
  }
}
