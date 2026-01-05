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
  Linkedin,
  Music2,
  UserCircle,
  Target,
  Heart,
  Zap,
  Award,
  FileCheck,
  Trash2,
  LayoutTemplate,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Settings() {
  const { content, updateContent, certificates, addCertificate, updateCertificate, deleteCertificate, sections, updateSections } = useContent();
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
    tiktok: '',
    linkedin: ''
  });

  // Social Media Toggle State
  const [socialEnabled, setSocialEnabled] = useState({
    instagram: true,
    facebook: true,
    youtube: true,
    tiktok: true,
    linkedin: true
  });

  // Intro Video State
  const [videoData, setVideoData] = useState({
    video_url: '',
    title: '',
    description: ''
  });

  // Coach Profile State
  const [coachProfile, setCoachProfile] = useState({
    journey: '',
    value1_title: '',
    value1_desc: '',
    value2_title: '',
    value2_desc: '',
    value3_title: '',
    value3_desc: '',
    value4_title: '',
    value4_desc: ''
  });

  // Account Settings State (Username & Password)
  const [accountData, setAccountData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // New Certificate State
  const [newCert, setNewCert] = useState({ name: '', issuer: '' });

  useEffect(() => {
    if (isSaving) return; // Prevent overwriting while saving to avoid flicker

    setFormData({
      wa_phone: content["contact.phone"] || "",
      wa_template: content["contact.wa_template"] || "",
      email: content["contact.email"] || "",
      display_phone: content["contact.display_phone"] || "",
      address: content["contact.address"] || "",
      instagram: content["social.instagram"] || "",
      facebook: content["social.facebook"] || "",
      youtube: content["social.youtube"] || "",
      tiktok: content["social.tiktok"] || "",
      linkedin: content["social.linkedin"] || ""
    });
    setSocialEnabled({
      instagram: content["social.instagram.enabled"] !== "false",
      facebook: content["social.facebook.enabled"] !== "false",
      youtube: content["social.youtube.enabled"] !== "false",
      tiktok: content["social.tiktok.enabled"] !== "false",
      linkedin: content["social.linkedin.enabled"] !== "false"
    });
    setVideoData({
      video_url: content["intro.video_url"] || "",
      title: content["intro.title"] || "",
      description: content["intro.description"] || ""
    });
    setCoachProfile({
      journey: content["about.modal_content"] || "",
      value1_title: content["about.value1.title"] || "",
      value1_desc: content["about.value1.desc"] || "",
      value2_title: content["about.value2.title"] || "",
      value2_desc: content["about.value2.desc"] || "",
      value3_title: content["about.value3.title"] || "",
      value3_desc: content["about.value3.desc"] || "",
      value4_title: content["about.value4.title"] || "",
      value4_desc: content["about.value4.desc"] || ""
    });
  }, [content]);

  // Handler for Contact Information
  const handleSaveContact = async () => {
    setIsSaving(true);
    try {
      const promises = [
        updateContent("contact.phone", formData.wa_phone),
        updateContent("contact.wa_template", formData.wa_template),
        updateContent("contact.email", formData.email),
        updateContent("contact.display_phone", formData.display_phone),
        updateContent("contact.address", formData.address),
      ];
      await Promise.all(promises);
      toast.success("Contact information saved!");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for Social Media
  const handleSaveSocial = async () => {
    setIsSaving(true);
    try {
      const promises = [
        updateContent("social.instagram", formData.instagram),
        updateContent("social.facebook", formData.facebook),
        updateContent("social.youtube", formData.youtube),
        updateContent("social.tiktok", formData.tiktok),
        updateContent("social.linkedin", formData.linkedin),
        updateContent("social.instagram.enabled", String(socialEnabled.instagram)),
        updateContent("social.facebook.enabled", String(socialEnabled.facebook)),
        updateContent("social.youtube.enabled", String(socialEnabled.youtube)),
        updateContent("social.tiktok.enabled", String(socialEnabled.tiktok)),
        updateContent("social.linkedin.enabled", String(socialEnabled.linkedin)),
      ];
      await Promise.all(promises);
      toast.success("Social media settings saved!");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for Saving ALL (Header Button)
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await Promise.all([
        handleSaveContact(), // Note: recursive isSaving set might be redundant but safe
        handleSaveSocial(),
        handleSaveVideo(),
        handleSaveCoachProfile(),
      ]);
      toast.success("All settings saved successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for Video Content
  const handleSaveVideo = () => {
    updateContent("intro.video_url", videoData.video_url);
    updateContent("intro.title", videoData.title);
    updateContent("intro.description", videoData.description);

    toast.success("Intro video settings saved!");
  };

  // Handler for Coach Profile
  const handleSaveCoachProfile = () => {
    updateContent("about.modal_content", coachProfile.journey);
    updateContent("about.value1.title", coachProfile.value1_title);
    updateContent("about.value1.desc", coachProfile.value1_desc);
    updateContent("about.value2.title", coachProfile.value2_title);
    updateContent("about.value2.desc", coachProfile.value2_desc);
    updateContent("about.value3.title", coachProfile.value3_title);
    updateContent("about.value3.desc", coachProfile.value3_desc);
    updateContent("about.value4.title", coachProfile.value4_title);
    updateContent("about.value4.desc", coachProfile.value4_desc);

    toast.success("Coach profile saved!");
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

  // --- LAYOUT MANAGEMENT ---
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      updateSections(newSections);
    }
  };

  const handleToggleSection = (index: number) => {
    const newSections = [...sections];
    newSections[index].isVisible = !newSections[index].isVisible;
    updateSections(newSections);
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
          <Button onClick={handleSaveAll} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
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


          {/* --- CARD: LANDING PAGE LAYOUT --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <LayoutTemplate className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Landing Page Layout</CardTitle>
                  <CardDescription className="text-white/50">
                    Reorder and toggle visibility of home page sections.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {sections && sections.map((section, index) => (
                  <div key={section.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${section.isVisible ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </div>
                      <span className={`font-medium ${!section.isVisible && 'text-white/40 line-through'}`}>{section.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveSection(index, 'up')}
                        disabled={index === 0}
                        className="h-8 w-8 hover:bg-white/10"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveSection(index, 'down')}
                        disabled={index === sections.length - 1}
                        className="h-8 w-8 hover:bg-white/10"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-white/10 mx-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleSection(index)}
                        className={`h-8 px-3 text-xs ${section.isVisible ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-green-400 hover:text-green-300 hover:bg-green-500/10'}`}
                      >
                        {section.isVisible ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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

          {/* --- CARD: COACH PROFILE & BIO --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <UserCircle className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle>Coach Profile & Bio</CardTitle>
                  <CardDescription className="text-white/50">
                    Your story and core values displayed in the "Read My Full Story" modal.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* The Journey / Story */}
              <div className="space-y-2">
                <Label>The Journey (Your Story)</Label>
                <Textarea
                  value={coachProfile.journey}
                  onChange={(e) => setCoachProfile({ ...coachProfile, journey: e.target.value })}
                  placeholder="Write your full professional story here... Share your journey, experiences, and what drives you."
                  className="bg-black/40 border-white/20 min-h-[150px]"
                />
                <p className="text-xs text-white/40">Use Enter for line breaks. This appears in the bio modal.</p>
              </div>

              {/* Core Values */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-white/70">
                  <Award className="w-4 h-4 text-orange-500" /> Core Values
                </Label>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Value 1 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-white/50 uppercase tracking-wider">Value 1</span>
                    </div>
                    <Input
                      value={coachProfile.value1_title}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value1_title: e.target.value })}
                      placeholder="Results-Driven"
                      className="bg-black/40 border-white/20"
                    />
                    <Input
                      value={coachProfile.value1_desc}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value1_desc: e.target.value })}
                      placeholder="Every program is designed with your specific goals in mind."
                      className="bg-black/40 border-white/20 text-sm"
                    />
                  </div>

                  {/* Value 2 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-xs text-white/50 uppercase tracking-wider">Value 2</span>
                    </div>
                    <Input
                      value={coachProfile.value2_title}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value2_title: e.target.value })}
                      placeholder="Client-Focused"
                      className="bg-black/40 border-white/20"
                    />
                    <Input
                      value={coachProfile.value2_desc}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value2_desc: e.target.value })}
                      placeholder="Your success and wellbeing are my top priorities."
                      className="bg-black/40 border-white/20 text-sm"
                    />
                  </div>

                  {/* Value 3 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-white/50 uppercase tracking-wider">Value 3</span>
                    </div>
                    <Input
                      value={coachProfile.value3_title}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value3_title: e.target.value })}
                      placeholder="Science-Based"
                      className="bg-black/40 border-white/20"
                    />
                    <Input
                      value={coachProfile.value3_desc}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value3_desc: e.target.value })}
                      placeholder="Evidence-based training methods for optimal results."
                      className="bg-black/40 border-white/20 text-sm"
                    />
                  </div>

                  {/* Value 4 */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-white/50 uppercase tracking-wider">Value 4</span>
                    </div>
                    <Input
                      value={coachProfile.value4_title}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value4_title: e.target.value })}
                      placeholder="Certified Expert"
                      className="bg-black/40 border-white/20"
                    />
                    <Input
                      value={coachProfile.value4_desc}
                      onChange={(e) => setCoachProfile({ ...coachProfile, value4_desc: e.target.value })}
                      placeholder="Fully certified with ongoing education in fitness science."
                      className="bg-black/40 border-white/20 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveCoachProfile}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* --- CARD: CERTIFICATES MANAGEMENT --- */}
          <Card className="bg-zinc-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <CardTitle>Certificates & Credentials</CardTitle>
                  <CardDescription className="text-white/50">
                    Add certifications displayed in the coach bio modal.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Certificate */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                <Label className="text-xs uppercase tracking-wider text-white/50">Add New Certificate</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    value={newCert.name}
                    onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                    placeholder="Certificate Name (e.g., NASM CPT)"
                    className="bg-black/40 border-white/20"
                  />
                  <Input
                    value={newCert.issuer}
                    onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                    placeholder="Issuing Organization"
                    className="bg-black/40 border-white/20"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (newCert.name && newCert.issuer) {
                      addCertificate(newCert);
                      setNewCert({ name: '', issuer: '' });
                      toast.success("Certificate added!");
                    } else {
                      toast.error("Please fill in both fields");
                    }
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                >
                  <Award className="w-4 h-4 mr-2" /> Add Certificate
                </Button>
              </div>

              {/* Existing Certificates List */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-white/50">
                  Current Certificates ({certificates?.length || 0})
                </Label>
                {certificates && certificates.length > 0 ? (
                  <div className="grid gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {certificates.map((cert) => (
                      <div key={cert.id} className={`flex items-center justify-between bg-black/40 border p-3 rounded-lg group transition-colors ${Boolean(cert.featured) ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 hover:border-yellow-500/30'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${Boolean(cert.featured) ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                            <FileCheck className={`w-4 h-4 ${Boolean(cert.featured) ? 'text-green-500' : 'text-yellow-500'}`} />
                          </div>
                          <div>
                            <div className="font-medium text-white text-sm">{cert.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider">{cert.issuer}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Featured Toggle */}
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] uppercase tracking-wider ${Boolean(cert.featured) ? 'text-green-400' : 'text-white/30'}`}>
                              {Boolean(cert.featured) ? 'Tampil' : 'Sembunyi'}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const isFeatured = Boolean(cert.featured);
                                const newFeatured = !isFeatured;

                                if (newFeatured) {
                                  const currentFeaturedCount = certificates.filter(c => Boolean(c.featured)).length;
                                  if (currentFeaturedCount >= 2) {
                                    toast.error("Maksimal hanya 2 sertifikat yang bisa ditampilkan di landing page!");
                                    return;
                                  }
                                }

                                updateCertificate(cert.id, { featured: newFeatured });
                                toast.success(newFeatured ? 'Ditampilkan di landing page!' : 'Disembunyikan dari landing page');
                              }}
                              className={`relative w-12 h-6 rounded-full transition-all cursor-pointer shadow-inner ${Boolean(cert.featured) ? 'bg-green-500' : 'bg-zinc-600'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${Boolean(cert.featured) ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>
                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              deleteCertificate(cert.id);
                              toast.info("Certificate deleted");
                            }}
                            className="text-white/20 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/30 italic text-sm text-center py-4">No certificates added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>


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
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveContact}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Contact Info
                </Button>
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

              {/* LinkedIn */}
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${socialEnabled.linkedin ? 'bg-blue-600/10 border-blue-600/20' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                <div className="p-2 bg-blue-700 rounded-lg">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">LinkedIn</Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="bg-black/40 border-white/20 mt-1"
                    disabled={!socialEnabled.linkedin}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialEnabled({ ...socialEnabled, linkedin: !socialEnabled.linkedin })}
                  className={`relative w-14 h-7 rounded-full transition-all ${socialEnabled.linkedin ? 'bg-blue-600' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${socialEnabled.linkedin ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveSocial}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" /> Save Social Links
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout >
  );
}