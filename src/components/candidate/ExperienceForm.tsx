
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { useCandidateExperiences, CandidateExperience } from '@/hooks/useCandidateExperiences';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ExperienceForm = () => {
  const { experiences, loading, createExperience, updateExperience, deleteExperience } = useCandidateExperiences();
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<CandidateExperience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    location: '',
    achievements: [] as string[],
  });

  const resetForm = () => {
    setFormData({
      company: '',
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      is_current: false,
      location: '',
      achievements: [],
    });
    setEditingExperience(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingExperience) {
      await updateExperience(editingExperience.id, formData);
    } else {
      await createExperience(formData);
    }
    
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (experience: CandidateExperience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      title: experience.title,
      description: experience.description || '',
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      is_current: experience.is_current,
      location: experience.location || '',
      achievements: experience.achievements || [],
    });
    setIsOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Work Experience
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience ? 'Edit Experience' : 'Add Work Experience'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      disabled={formData.is_current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_current"
                    checked={formData.is_current}
                    onCheckedChange={(checked) => 
                      setFormData({ 
                        ...formData, 
                        is_current: checked as boolean,
                        end_date: checked ? '' : formData.end_date
                      })
                    }
                  />
                  <Label htmlFor="is_current">I currently work here</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingExperience ? 'Update' : 'Add'} Experience
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {experiences.map((experience) => (
              <div key={experience.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{experience.title}</h3>
                    <p className="text-gray-600">{experience.company}</p>
                    {experience.location && (
                      <p className="text-sm text-gray-500">{experience.location}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {formatDate(experience.start_date)} - {
                        experience.is_current ? 'Present' : 
                        experience.end_date ? formatDate(experience.end_date) : 'N/A'
                      }
                    </p>
                    {experience.description && (
                      <p className="mt-2 text-gray-700">{experience.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(experience)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteExperience(experience.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
