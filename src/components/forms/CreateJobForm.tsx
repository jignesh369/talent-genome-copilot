
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface CreateJobFormProps {
  onSubmit: (jobData: any) => void;
  onCancel: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    salary: { min: '', max: '', currency: 'USD' },
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    remote: false,
    urgent: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSalaryChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      salary: { ...prev.salary, [field]: value }
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'responsibilities' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderArrayField = (field: 'requirements' | 'responsibilities' | 'benefits', label: string, placeholder: string) => (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      {formData[field].map((item: string, index: number) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <Input
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          {formData[field].length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem(field, index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addArrayItem(field)}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            placeholder="e.g. Engineering"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div>
          <Label htmlFor="jobType">Job Type</Label>
          <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="intern">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salaryMin">Min Salary</Label>
          <Input
            id="salaryMin"
            type="number"
            value={formData.salary.min}
            onChange={(e) => handleSalaryChange('min', e.target.value)}
            placeholder="50000"
          />
        </div>
        <div>
          <Label htmlFor="salaryMax">Max Salary</Label>
          <Input
            id="salaryMax"
            type="number"
            value={formData.salary.max}
            onChange={(e) => handleSalaryChange('max', e.target.value)}
            placeholder="80000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe the role, team, and what success looks like..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-4">
        {renderArrayField('requirements', 'Requirements', 'e.g. 3+ years of React experience')}
        {renderArrayField('responsibilities', 'Responsibilities', 'e.g. Lead frontend development initiatives')}
        {renderArrayField('benefits', 'Benefits', 'e.g. Health insurance, 401k matching')}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={formData.remote}
            onCheckedChange={(checked) => handleInputChange('remote', checked)}
          />
          <Label htmlFor="remote">Remote work available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={formData.urgent}
            onCheckedChange={(checked) => handleInputChange('urgent', checked)}
          />
          <Label htmlFor="urgent">Urgent hire</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Job
        </Button>
      </div>
    </form>
  );
};

export default CreateJobForm;
