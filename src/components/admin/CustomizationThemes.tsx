
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Palette, 
  Monitor, 
  Moon, 
  Sun, 
  Layout, 
  Image,
  Type,
  Brush,
  Download,
  Upload
} from 'lucide-react';

const CustomizationThemes = () => {
  const { toast } = useToast();
  const [themeConfig, setThemeConfig] = useState({
    theme: 'light',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#8B5CF6',
    layout: 'default',
    typography: 'inter',
    customLogo: null,
    dashboardLayout: 'grid',
    sidebarStyle: 'expanded'
  });

  const [presets, setPresets] = useState([
    { id: 'corporate', name: 'Corporate Blue', colors: ['#1E40AF', '#10B981', '#6366F1'], active: false },
    { id: 'modern', name: 'Modern Purple', colors: ['#8B5CF6', '#EC4899', '#F59E0B'], active: false },
    { id: 'nature', name: 'Nature Green', colors: ['#059669', '#0D9488', '#84CC16'], active: true },
    { id: 'sunset', name: 'Sunset Orange', colors: ['#EA580C', '#DC2626', '#F59E0B'], active: false }
  ]);

  const handleThemeChange = (field: string, value: string) => {
    setThemeConfig(prev => ({
      ...prev,
      [field]: value
    }));
    
    toast({
      title: "Theme Updated",
      description: "Your customization has been applied.",
    });
  };

  const handlePresetSelect = (presetId: string) => {
    setPresets(prev =>
      prev.map(preset => ({
        ...preset,
        active: preset.id === presetId
      }))
    );
    
    toast({
      title: "Preset Applied",
      description: "Theme preset has been applied successfully.",
    });
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo Upload",
      description: "Logo upload functionality will be implemented.",
    });
  };

  const handleExportTheme = () => {
    toast({
      title: "Theme Exported",
      description: "Theme configuration has been exported.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Customization & Themes</h3>
          <p className="text-sm text-gray-600">Personalize your platform's appearance and branding</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportTheme}>
            <Download className="w-4 h-4 mr-2" />
            Export Theme
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Import Theme
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Theme Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base Theme */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Base Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={themeConfig.theme === 'light' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('theme', 'light')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </Button>
                <Button
                  variant={themeConfig.theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('theme', 'dark')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                </Button>
                <Button
                  variant={themeConfig.theme === 'auto' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('theme', 'auto')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Auto</span>
                </Button>
              </div>
            </div>

            {/* Color Customization */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Colors</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Primary</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: themeConfig.primaryColor }}
                    />
                    <Input 
                      value={themeConfig.primaryColor} 
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Secondary</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: themeConfig.secondaryColor }}
                    />
                    <Input 
                      value={themeConfig.secondaryColor} 
                      onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Accent</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: themeConfig.accentColor }}
                    />
                    <Input 
                      value={themeConfig.accentColor} 
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Options */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Layout Style</label>
              <Select value={themeConfig.layout} onValueChange={(value) => handleThemeChange('layout', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Typography */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Typography</label>
              <Select value={themeConfig.typography} onValueChange={(value) => handleThemeChange('typography', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Theme Presets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brush className="w-5 h-5 mr-2" />
              Theme Presets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    preset.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePresetSelect(preset.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{preset.name}</span>
                    {preset.active && <Badge variant="default" className="text-xs">Active</Badge>}
                  </div>
                  <div className="flex space-x-1">
                    {preset.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Branding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">Upload your company logo</p>
                <Button variant="outline" onClick={handleLogoUpload}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Dashboard Layout</label>
                <Select value={themeConfig.dashboardLayout} onValueChange={(value) => handleThemeChange('dashboardLayout', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid Layout</SelectItem>
                    <SelectItem value="list">List Layout</SelectItem>
                    <SelectItem value="cards">Card Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sidebar Style</label>
                <Select value={themeConfig.sidebarStyle} onValueChange={(value) => handleThemeChange('sidebarStyle', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expanded">Always Expanded</SelectItem>
                    <SelectItem value="collapsed">Auto Collapse</SelectItem>
                    <SelectItem value="floating">Floating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layout className="w-5 h-5 mr-2" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-6 min-h-32 flex items-center justify-center">
            <p className="text-gray-600">Theme preview will be shown here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationThemes;
