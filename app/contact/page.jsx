"use client"
import { useTranslation } from '@/contexts/TranslationContext';
import { PhoneCall, Mail, MapPin, Send, MessageSquareText, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Page() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, phone, subject, message } = formData;
    if (!name || !email || !phone || !subject || !message) {
      setError('सभी फ़ील्ड अनिवार्य हैं।');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('कृपया सही ईमेल पता दर्ज करें।');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'संदेश भेजने में विफलता।');
        return;
      }

      setSuccess('आपका संदेश सफलतापूर्वक प्राप्त हो गया है। शीघ्र ही आपसे संपर्क किया जाएगा!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError('एक अप्रत्याशित त्रुटि हुई।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Page Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#641526] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>संपर्क एवं संवाद</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#641526]">{t('contact.heading')}</h1>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            आपके सुझाव, प्रश्न या समस्याओं के समाधान हेतु हम सदैव उपलब्ध हैं।
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Map & Quick Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-4 shadow-xl border border-amber-900/10 h-[320px] overflow-hidden">
              <iframe
                className="w-full h-full rounded-2xl border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.4951539921597!2d80.93464607536766!3d26.846693076673464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a88b7fbd7b%3A0x5b0313d29ab377a2!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710235768695!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-900/10 space-y-4">
              <h3 className="text-lg font-extrabold text-[#641526] border-b border-amber-100 pb-2">कार्यालय संपर्क</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C79A45] shrink-0 mt-0.5" />
                  <span>लखनऊ / कानपुर, उत्तर प्रदेश</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#C79A45] shrink-0" />
                  <span>+91 94155 35222</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C79A45] shrink-0" />
                  <span>rahulsinghbhadauriya@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-900/10">
            <div className="flex items-center gap-2 text-[#641526] font-extrabold text-xl mb-6 border-b border-amber-100 pb-3">
              <MessageSquareText className="w-5 h-5 text-[#C79A45]" />
              <span>संदेश भेजें</span>
            </div>

            {error && <p className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>}
            {success && <p className="mb-4 text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">{success}</p>}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold text-gray-700">{t('contact.name')} *</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="अपना नाम दर्ज करें"
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-700">{t('contact.phone')} *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="मोबाइल नंबर"
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">{t('contact.email')} *</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="ईमेल आईडी दर्ज करें"
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">{t('contact.subject')} *</Label>
                <Input
                  type="text"
                  name="subject"
                  placeholder="संदेश का विषय दर्ज करें"
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">{t('contact.message')} *</Label>
                <Textarea
                  name="message"
                  placeholder="अपना संदेश यहाँ विस्तार से लिखें..."
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl h-28"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></Textarea>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#641526] hover:bg-[#3E0D18] text-white py-3 font-extrabold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'भेजा जा रहा है...' : t('contact.submit')}</span>
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Page;
