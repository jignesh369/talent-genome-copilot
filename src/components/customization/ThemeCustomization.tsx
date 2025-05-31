
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Palette, 
  Layout, 
  Type, 
  Moon, 
  Sun,
  Monitor,
  Save,
  RotateCcw,
  Eye
} from 'lucide-react';

interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  accentColor: string;
  fontSize: number;
  borderRadius: number;
  compactMode: boolean;
  sidebarCollapsed: boolean;
}

interface LayoutSettings {
  dashboardLayout: 'grid' | 'list' | 'cards';
  chartStyle: 'modern' | 'classic' | 'minimal';
  tableStyle: 'compact' | 'comfortable' | 'spacious';
  animationsEnabled: boolean;
}

const ThemeCustomization: React.FC = () => {
  const { toast } = useToast();
  
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    mode: 'light',
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    fontSize: 14,
    borderRadius: 8,
    compactMode: false,
    sidebarCollapsed: false
  });

  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    dashboardLayout: 'grid',
    chartStyle: 'modern',
    tableStyle: 'comfortable',
    animationsEnabled: true
  });

  const colorPresets = [
    { name: 'Blue', primary: '#3b82f6', accent: '#10b981' },
    { name: 'Purple', primary: '#8b5cf6', accent: '#f59e0b' },
    { name: 'Green', primary: '#10b981', accent: '#3b82f6' },
    { name: 'Red', primary: '#ef4444', accent: '#8b5cf6' },
    { name: 'Orange', primary: '#f97316', accent: '#06b6d4' },
    { name: 'Pink', primary: '#ec4899', accent: '#84cc16' }
  ];

  const handleThemeChange = (key: keyof ThemeSettings, value: any) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLayoutChange = (key: keyof LayoutSettings, value: any) => {
    setLayoutSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyPreset = (preset: typeof colorPresets[0]) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      accentColor: preset.accent
    }));
    
    toast({
      title: "Theme Applied",
      description: `Applied ${preset.name} color scheme.`,
    });
  };

  const handleSaveSettings = () => {
    // Save to localStorage or backend
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
    localStorage.setItem('layoutSettings', JSON.stringify(layoutSettings));
    
    toast({
      title: "Settings Saved",
      description: "Your customization preferences have been saved.",
    });
  };

  const handleResetToDefaults = () => {
    setThemeSettings({
      mode: 'light',
      primaryColor: '#3b82f6',
      accentColor: '#10b981',
      fontSize: 14,
      borderRadius: 8,
      compactMode: false,
      sidebarCollapsed: false
    });
    
    setLayoutSettings({
      dashboardLayout: 'grid',
      chartStyle: 'modern',
      tableStyle: 'comfortable',
      animationsEnabled: true
    });
    
    toast({
      title: "Reset Complete",
      description: "All settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Theme & Customization</h2>
          <p className="text-gray-600">Personalize your platform experience</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Color Scheme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Theme Mode</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {[
                    { value: 'light', icon: Sun, label: 'Light' },
                    { value: 'dark', icon: Moon, label: 'Dark' },
                    { value: 'auto', icon: Monitor, label: 'Auto' }
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => handleThemeChange('mode', mode.value)}
                      className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        themeSettings.mode === mode.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <mode.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Color Presets</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <input
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="w-12 h-10 border rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeSettings.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <input
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-12 h-10 border rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeSettings.accentColor}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Border Radius</Label>
                <div className="mt-3">
                  <Slider
                    value={[themeSettings.borderRadius]}
                    onValueChange={(value) => handleThemeChange('borderRadius', value[0])}
                    max={20}
                    step={2}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0px</span>
                    <span>{themeSettings.borderRadius}px</span>
                    <span>20px</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="h-5 w-5 mr-2" />
                Layout Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Dashboard Layout</Label>
                  <Select 
                    value={layoutSettings.dashboardLayout} 
                    onValueChange={(value) => handleLayoutChange('dashboardLayout', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="cards">Card View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Chart Style</Label>
                  <Select 
                    value={layoutSettings.chartStyle} 
                    onValueChange={(value) => handleLayoutChange('chartStyle', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Table Style</Label>
                <Select 
                  value={layoutSettings.tableStyle} 
                  onValueChange={(value) => handleLayoutChange('tableStyle', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-600">Reduce spacing and padding</p>
                  </div>
                  <Switch
                    checked={themeSettings.compactMode}
                    onCheckedChange={(checked) => handleThemeChange('compactMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Animations</Label>
                    <p className="text-sm text-gray-600">Enable smooth transitions</p>
                  </div>
                  <Switch
                    checked={layoutSettings.animationsEnabled}
                    onCheckedChange={(checked) => handleLayoutChange('animationsEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sidebar Collapsed</Label>
                    <p className="text-sm text-gray-600">Start with collapsed sidebar</p>
                  </div>
                  <Switch
                    checked={themeSettings.sidebarCollapsed}
                    onCheckedChange={(checked) => handleThemeChange('sidebarCollapsed', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Typography Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Base Font Size</Label>
                <div className="mt-3">
                  <Slider
                    value={[themeSettings.fontSize]}
                    onValueChange={(value) => handleThemeChange('fontSize', value[0])}
                    min={12}
                    max={18}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>12px</span>
                    <span>{themeSettings.fontSize}px</span>
                    <span>18px</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Preview</h4>
                <div style={{ fontSize: themeSettings.fontSize }}>
                  <h3 className="text-lg font-bold mb-2">Sample Heading</h3>
                  <p className="text-gray-600 mb-2">
                    This is how your text will appear with the current font size setting.
                  </p>
                  <p className="text-sm text-gray-500">
                    Small text for labels and captions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="p-6 border rounded-lg"
                style={{
                  fontSize: themeSettings.fontSize,
                  borderRadius: themeSettings.borderRadius
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Sample Dashboard</h3>
                    <button 
                      className="px-4 py-2 rounded text-white"
                      style={{ 
                        backgroundColor: themeSettings.primaryColor,
                        borderRadius: themeSettings.borderRadius
                      }}
                    >
                      Primary Button
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="p-4 border"
                        style={{ borderRadius: themeSettings.borderRadius }}
                      >
                        <div 
                          className="w-8 h-8 rounded mb-3"
                          style={{ backgroundColor: themeSettings.accentColor }}
                        />
                        <h4 className="font-semibold">Card {i}</h4>
                        <p className="text-gray-600 text-sm">Sample content</p>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="p-4 border"
                    style={{ borderRadius: themeSettings.borderRadius }}
                  >
                    <h4 className="font-semibold mb-2">Sample Chart Area</h4>
                    <div 
                      className="h-20 rounded"
                      style={{ 
                        backgroundColor: `${themeSettings.primaryColor}20`,
                        borderRadius: themeSettings.borderRadius
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeCustomization;
