import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function GeneralSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [responseLength, setResponseLength] = useState([50]);
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');

  const handleSaveSettings = () => {
    toast.success('Settings saved', {
      description: 'Your preferences have been updated.',
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <p className="text-sm text-gray-500">
                Receive updates and notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">AI Assistant Preferences</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Response Length</Label>
              <p className="text-sm text-gray-500">
                Control how detailed the AI responses should be
              </p>
              <div className="pt-2">
                <Slider
                  value={responseLength}
                  onValueChange={setResponseLength}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Concise</span>
                  <span>Balanced</span>
                  <span>Detailed</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Appearance</h3>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
}
