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
  Settings as SettingsIcon,
  Video,
  Instagram,
  Facebook,
  Youtube,
  Music2
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
    youtube: '',
    tiktok: ''
  });

  // Social Media Toggle State
  const [socialEnabled, setSocialEnabled] = useState({
    instagram: true,
    facebook: true,
    youtube: true,
    tiktok: true
  });

  // Intro Video State
  const [videoData, setVideoData] = useState({
    video_url: '',
    title: '',
    description: ''
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
      tiktok: content["social.tiktok"] || ""
    });
    setSocialEnabled({
      instagram: content["social.instagram.enabled"] !== "false",
      facebook: content["social.facebook.enabled"] !== "false",
      youtube: content["social.youtube.enabled"] !== "false",
      tiktok: content["social.tiktok.enabled"] !== "false"
    });
    setVideoData({
      video_url: content["intro.video_url"] || "",
      title: content["intro.title"] || "",
      description: content["intro.description"] || ""
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
    updateContent("social.tiktok", formData.tiktok);
    updateContent("social.instagram.enabled", String(socialEnabled.instagram));
    updateContent("social.facebook.enabled", String(socialEnabled.facebook));
    updateContent("social.youtube.enabled", String(socialEnabled.youtube));
    updateContent("social.tiktok.enabled", String(socialEnabled.tiktok));

    toast.success("Website settings saved successfully!");
  };

  // Handler for Video Content
  const handleSaveVideo = () => {
    updateContent("intro.video_url", videoData.video_url);
    updateContent("intro.title", videoData.title);
    updateContent("intro.description", videoData.description);

    toast.success("Intro video settings saved!");
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/update-profile`, {
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
                    <Label className="flex items-center gap-2"><User className="w-3 h-3" /> New Username</Label>
                    <Input
                      value={accountData.username}
                      onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                      placeholder="Admin"
                      className="bg-black/40 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-orange-500"><Lock className="w-3 h-3" /> Current Password</Label>
                    <Input
                      type="password"
                      value={accountData.currentPassword}
                      onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      className="bg-black/40 border-orange-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Lock className="w-3 h-3" /> New Password</Label>
                    <Input
                      type="password"
                      value={accountData.newPassword}
                      onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                      placeholder="Min. 8 characters"
                      className="bg-black/40 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Lock className="w-3 h-3" /> Confirm Password</Label>
                    <Input
                      type="password"
                      value={accountData.confirmPassword}
                      onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
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

          {/* --- CARD: INTRO VIDEO SETTINGS --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <CardTitle>Intro Video Settings</CardTitle>
                  <CardDescription className="text-white/50">
                    Configure the introductory video displayed when users click "Watch Video".
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>YouTube Video URL</Label>
                <Input
                  value={videoData.video_url}
                  onChange={(e) => setVideoData({ ...videoData, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=xxxxx or embed URL"
                  className="bg-black/40 border-white/20"
                />
                <p className="text-xs text-white/40">Supports YouTube watch URLs, embed URLs, or direct video file URLs.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Video Title</Label>
                  <Input
                    value={videoData.title}
                    onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                    placeholder="Welcome to My Fitness Journey"
                    className="bg-black/40 border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Video Description</Label>
                <Textarea
                  value={videoData.description}
                  onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                  placeholder="A brief description about the video..."
                  className="bg-black/40 border-white/20 min-h-[80px]"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveVideo}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Video Settings
                </Button>
              </div>
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
                    onChange={(e) => setFormData({ ...formData, wa_phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, wa_template: e.target.value })}
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
                  <Label className="flex items-center gap-2"><Mail className="w-3 h-3" /> Email Address</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@example.com"
                    className="bg-black/40 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="w-3 h-3" /> Display Phone</Label>
                  <Input
                    value={formData.display_phone}
                    onChange={(e) => setFormData({ ...formData, display_phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="bg-black/40 border-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Physical Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                    Toggle to enable/disable social media icons on the website.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Instagram */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${socialEnabled.instagram ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">Instagram</Label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/username"
                    className="bg-black/40 border-white/20 mt-1"
                    disabled={!socialEnabled.instagram}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialEnabled({ ...socialEnabled, instagram: !socialEnabled.instagram })}
                  className={`relative w-14 h-7 rounded-full transition-all ${socialEnabled.instagram ? 'bg-pink-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${socialEnabled.instagram ? 'left-8' : 'left-1'}`} />
                </button>
              </div>

              {/* Facebook */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${socialEnabled.facebook ? 'bg-blue-500/10 border-blue-500/20' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">Facebook</Label>
                  <Input
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="https://facebook.com/username"
                    className="bg-black/40 border-white/20 mt-1"
                    disabled={!socialEnabled.facebook}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialEnabled({ ...socialEnabled, facebook: !socialEnabled.facebook })}
                  className={`relative w-14 h-7 rounded-full transition-all ${socialEnabled.facebook ? 'bg-blue-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${socialEnabled.facebook ? 'left-8' : 'left-1'}`} />
                </button>
              </div>

              {/* YouTube */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${socialEnabled.youtube ? 'bg-red-500/10 border-red-500/20' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                <div className="p-2 bg-red-600 rounded-lg">
                  <Youtube className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">YouTube</Label>
                  <Input
                    value={formData.youtube}
                    onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                    placeholder="https://youtube.com/c/channel"
                    className="bg-black/40 border-white/20 mt-1"
                    disabled={!socialEnabled.youtube}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialEnabled({ ...socialEnabled, youtube: !socialEnabled.youtube })}
                  className={`relative w-14 h-7 rounded-full transition-all ${socialEnabled.youtube ? 'bg-red-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${socialEnabled.youtube ? 'left-8' : 'left-1'}`} />
                </button>
              </div>

              {/* TikTok */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${socialEnabled.tiktok ? 'bg-zinc-500/10 border-white/20' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                <div className="p-2 bg-black rounded-lg border border-white/20">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">TikTok</Label>
                  <Input
                    value={formData.tiktok}
                    onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                    placeholder="https://tiktok.com/@username"
                    className="bg-black/40 border-white/20 mt-1"
                    disabled={!socialEnabled.tiktok}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialEnabled({ ...socialEnabled, tiktok: !socialEnabled.tiktok })}
                  className={`relative w-14 h-7 rounded-full transition-all ${socialEnabled.tiktok ? 'bg-white' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full transition-all ${socialEnabled.tiktok ? 'left-8 bg-black' : 'left-1 bg-white'}`} />
                </button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}