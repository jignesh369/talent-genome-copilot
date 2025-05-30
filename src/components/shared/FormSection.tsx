
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  loading?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  children,
  onSave,
  saveLabel = "Save",
  loading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        {onSave && (
          <div className="flex justify-end">
            <Button onClick={onSave} disabled={loading}>
              {saveLabel}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormSection;
