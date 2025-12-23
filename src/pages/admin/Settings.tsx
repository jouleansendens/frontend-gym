import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { useContent } from '../../context/ContentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  Save, 
  MapPin, 
  Share2, 
  Mail, 
  Phone, 
  User, 
  Lock, 
  ShieldCheck,
  Settings as SettingsIcon 
} from 'lucide-react';

export default function Settings() {
  const { content, updateContent } = useContent();
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  
  // Website Settings State
  const [formData, setFormData] = useState({
    wa_phone: '',
    wa_template: '',
    email: '',
    display_phone: '',
    address: '',
    instagram: '',
    facebook: '',
    youtube: ''
  });

  // Account Settings State (Username & Password)
  const [accountData, setAccountData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setFormData({
      wa_phone: content["contact.phone"] || "",
      wa_template: content["contact.wa_template"] || "",
      email: content["contact.email"] || "",
      display_phone: content["contact.display_phone"] || "",
      address: content["contact.address"] || "",
      instagram: content["social.instagram"] || "",
      facebook: content["social.facebook"] || "",
      youtube: content["social.youtube"] || "",
    });
  }, [content]);

  // Handler for Website Content
  const handleSaveContent = () => {
    updateContent("contact.phone", formData.wa_phone);
    updateContent("contact.wa_template", formData.wa_template);
    updateContent("contact.email", formData.email);
    updateContent("contact.display_phone", formData.display_phone);
    updateContent("contact.address", formData.address);
    updateContent("social.instagram", formData.instagram);
    updateContent("social.facebook", formData.facebook);
    updateContent("social.youtube", formData.youtube);
    
    toast.success("Website settings saved successfully!");
  };

  // Handler for Admin Account (API Call)
const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accountData.newPassword && accountData.newPassword !== accountData.confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    if (!accountData.currentPassword) {
      return toast.error("Current password is required!");
    }

    setIsAccountLoading(true);
    try {
      const response = await fetch('https://trainwithbraden.com/api/admin/update-profile', {
        method: 'PUT', // ✅ Ubah dari POST ke PUT
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1, // ✅ Tambahkan user_id (sesuaikan dengan sistem auth Anda)
          name: accountData.username || undefined,
          current_password: accountData.currentPassword,
          new_password: accountData.newPassword || undefined,
          new_password_confirmation: accountData.confirmPassword || undefined
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account credentials updated successfully!");
        setAccountData({ username: '', currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(data.message || "Failed to update account");
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Server connection error");
    } finally {
      setIsAccountLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <SettingsIcon className="text-orange-500 w-8 h-8" /> Website Settings
            </h2>
            <p className="text-white/60">Manage your contact details, integrations, and account security.</p>
          </div>
          <Button onClick={handleSaveContent} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            <Save className="w-4 h-4 mr-2" /> Save All Changes
          </Button>
        </div>

        <div className="grid gap-8">
          
          {/* --- CARD 1: ACCOUNT SETTINGS (NEW) --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle>Account Credentials</CardTitle>
                  <CardDescription className="text-white/50">
                    Update your admin username and security password.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountUpdate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><User className="w-3 h-3"/> New Username</Label>
                    <Input 
                      value={accountData.username}
                      onChange={(e) => setAccountData({...accountData, username: e.target.value})}
                      placeholder="Admin"
                      className="bg-black/40 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-orange-500"><Lock className="w-3 h-3"/> Current Password</Label>
                    <Input 
                      type="password"
                      value={accountData.currentPassword}
                      onChange={(e) => setAccountData({...accountData, currentPassword: e.target.value})}
                      placeholder="••••••••"
                      className="bg-black/40 border-orange-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Lock className="w-3 h-3"/> New Password</Label>
                    <Input 
                      type="password"
                      value={accountData.newPassword}
                      onChange={(e) => setAccountData({...accountData, newPassword: e.target.value})}
                      placeholder="Min. 8 characters"
                      className="bg-black/40 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Lock className="w-3 h-3"/> Confirm Password</Label>
                    <Input 
                      type="password"
                      value={accountData.confirmPassword}
                      onChange={(e) => setAccountData({...accountData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      className="bg-black/40 border-white/20"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    type="submit" 
                    disabled={isAccountLoading}
                    className="bg-white hover:bg-zinc-200 text-black font-bold"
                  >
                    {isAccountLoading ? "Updating..." : "Update Credentials"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* --- CARD 2: WHATSAPP CONFIGURATION --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>WhatsApp Logic</CardTitle>
                  <CardDescription className="text-white/50">
                    Controls where the "Choose Plan" buttons redirect to.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>WhatsApp Number (System)</Label>
                  <Input 
                    value={formData.wa_phone}
                    onChange={(e) => setFormData({...formData, wa_phone: e.target.value})}
                    placeholder="62812345678"
                    className="bg-black/40 border-white/20"
                  />
                  <p className="text-xs text-white/40">Format: Country code without + (e.g., 62...)</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Auto-Message Template</Label>
                <Textarea 
                  value={formData.wa_template}
                  onChange={(e) => setFormData({...formData, wa_template: e.target.value})}
                  className="bg-black/40 border-white/20 min-h-[80px]"
                />
                <p className="text-xs text-white/40">Use <code>{`{name}`}</code>, <code>{`{price}`}</code> for dynamic values.</p>
              </div>
            </CardContent>
          </Card>

          {/* --- CARD 3: CONTACT INFORMATION --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription className="text-white/50">
                    Displayed in the "Get In Touch" section and Footer.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Mail className="w-3 h-3"/> Email Address</Label>
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@example.com"
                    className="bg-black/40 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="w-3 h-3"/> Display Phone</Label>
                  <Input 
                    value={formData.display_phone}
                    onChange={(e) => setFormData({...formData, display_phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className="bg-black/40 border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="w-3 h-3"/> Physical Address</Label>
                <Textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="123 Street Name, City, Country"
                  className="bg-black/40 border-white/20 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* --- CARD 4: SOCIAL MEDIA --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Share2 className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription className="text-white/50">
                    Leave empty to hide the icon.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Instagram URL</Label>
                  <Input 
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    placeholder="https://instagram.com/username"
                    className="bg-black/40 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facebook URL</Label>
                  <Input 
                    value={formData.facebook}
                    onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    placeholder="https://facebook.com/username"
                    className="bg-black/40 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>YouTube URL</Label>
                  <Input 
                    value={formData.youtube}
                    onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                    placeholder="https://youtube.com/c/channel"
                    className="bg-black/40 border-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}