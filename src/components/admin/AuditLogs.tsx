
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  User,
  Settings,
  Database,
  Shield,
  Calendar
} from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@company.com',
      action: 'user_created',
      resource: 'User: john.doe@techcorp.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      details: 'Created new user account with recruiter role'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:12',
      user: 'admin@company.com',
      action: 'organization_updated',
      resource: 'Organization: TechCorp Inc.',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      details: 'Updated organization billing plan from starter to professional'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      user: 'sarah.admin@company.com',
      action: 'billing_updated',
      resource: 'Organization: StartupXYZ',
      ipAddress: '10.0.0.25',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      details: 'Payment method updated successfully'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:33',
      user: 'system',
      action: 'login_failed',
      resource: 'User: unknown@domain.com',
      ipAddress: '203.0.113.195',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      status: 'failure',
      details: 'Failed login attempt - invalid credentials'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:18',
      user: 'admin@company.com',
      action: 'system_config_changed',
      resource: 'Feature Flag: advanced_analytics',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      details: 'Enabled advanced analytics feature for all organizations'
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:05:02',
      user: 'admin@company.com',
      action: 'data_export',
      resource: 'User Data Export',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      details: 'Exported user data for compliance audit'
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'user_created':
      case 'user_updated':
      case 'user_deleted':
        return <User className="w-4 h-4" />;
      case 'organization_updated':
      case 'organization_created':
        return <Settings className="w-4 h-4" />;
      case 'billing_updated':
        return <Database className="w-4 h-4" />;
      case 'login_failed':
      case 'login_success':
        return <Shield className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'user_created':
      case 'organization_created':
        return 'bg-green-100 text-green-800';
      case 'user_updated':
      case 'organization_updated':
      case 'billing_updated':
        return 'bg-blue-100 text-blue-800';
      case 'user_deleted':
        return 'bg-red-100 text-red-800';
      case 'login_failed':
        return 'bg-orange-100 text-orange-800';
      case 'login_success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failure': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.includes(filterAction);
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
  };

  const handleViewDetails = (logId: string) => {
    console.log('Viewing details for log:', logId);
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-sm text-gray-600">
            Track all administrative actions and system events
          </p>
        </div>
        <Button variant="outline" onClick={handleExportLogs}>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="user">User Actions</SelectItem>
                  <SelectItem value="organization">Organization Actions</SelectItem>
                  <SelectItem value="billing">Billing Actions</SelectItem>
                  <SelectItem value="login">Login Actions</SelectItem>
                  <SelectItem value="system">System Actions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <span className="text-sm text-gray-600">{log.timestamp}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <Badge className={getActionColor(log.action)}>
                        {log.action.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{log.resource}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{log.ipAddress}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(log.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
