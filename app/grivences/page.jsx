"use client";
import React, { useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { TypeAnimation } from "react-type-animation";
import siteConfig from "@/config/siteConfig";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PenTool, User, Phone, MapPin, MessageSquareWarning, CheckCircle2, ShieldCheck } from "lucide-react";
import districts from "@/utils/data";

export default function SupportForm() {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLoksabha, setSelectedLoksabha] = useState("");
  const [selectedVidansabha, setSelectedVidansabha] = useState("");
  const [areaType, setAreaType] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = "नाम दर्ज करना अनिवार्य है";
    if (!phone) newErrors.phone = "फोन नंबर दर्ज करना अनिवार्य है";
    else if (!/^[0-9]{10}$/.test(phone))
      newErrors.phone = "वैध 10-अंकीय फोन नंबर दर्ज करें";
    if (!email) newErrors.email = "ईमेल दर्ज करना अनिवार्य है";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "वैध ईमेल पता दर्ज करें";
    if (!selectedDistrict) newErrors.district = "जिला चुनना अनिवार्य है";
    if (!selectedLoksabha) newErrors.loksabha = "लोकसभा चुनना अनिवार्य है";
    if (!selectedVidansabha) newErrors.vidansabha = "विधानसभा चुनना अनिवार्य है";
    if (!areaType) newErrors.areaType = "क्षेत्र का प्रकार चुनना अनिवार्य है";
    if (areaType === "rural") {
      if (!selectedBlock) newErrors.block = "ब्लॉक अनिवार्य है";
      if (!selectedGramPanchayat)
        newErrors.gramPanchayat = "ग्राम पंचायत अनिवार्य है";
    } else if (areaType === "urban") {
      if (!selectedWard) newErrors.ward = "वार्ड अनिवार्य है";
    }
    if (!problem) newErrors.problem = "समस्या का विवरण अनिवार्य है";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedLoksabha("");
    setSelectedVidansabha("");
    setAreaType("");
    setSelectedBlock("");
    setSelectedGramPanchayat("");
    setSelectedWard("");
  };

  const handleAreaTypeChange = (type) => {
    setAreaType(type);
    setSelectedBlock("");
    setSelectedGramPanchayat("");
    setSelectedWard("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedVidansabha === siteConfig.specialConstituency) {
      setAreaType("urban");
    }
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formattedProblem = `सेवा में,\nमाननीय अध्यक्ष जी,\nराहुल सिंह भदौरिया\n\nविषय: ${problem}`;
      const formData = {
        name,
        phone,
        email,
        district: selectedDistrict,
        loksabha: selectedLoksabha,
        vidansabha: selectedVidansabha,
        areaType: selectedVidansabha === siteConfig.specialConstituency ? "urban" : areaType,
        ...(areaType === "rural"
          ? {
              block: selectedBlock,
              gramPanchayat: selectedGramPanchayat,
            }
          : {
              ward: selectedWard,
            }),
        problem: formattedProblem,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/submit/supportForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      await response.json();
      setSubmitStatus("success");

      setName("");
      setPhone("");
      setEmail("");
      setSelectedDistrict("");
      setSelectedLoksabha("");
      setSelectedVidansabha("");
      setAreaType("");
      setSelectedBlock("");
      setSelectedGramPanchayat("");
      setSelectedWard("");
      setProblem("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showUrbanOption =
    selectedDistrict &&
    districts[selectedDistrict]?.nagar_nikay?.ward?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-10 px-4">
      
      {/* Animated Title */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#641526] text-white px-6 py-3 rounded-2xl shadow-md border border-amber-500/20 font-extrabold text-lg sm:text-2xl">
          <PenTool className="w-5 h-5 text-[#C79A45]" />
          <TypeAnimation
            sequence={[
              t("support.Heading2"),
              5000,
              t("support.Heading3"),
              3000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-900/10 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] text-white p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">{t("support.Heading")}</h2>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
            जनसमस्या, शिकायत या सहयोग हेतु अपना पत्र सीधे दर्ज करें।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

          {/* Section 1: Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
              <User className="w-4 h-4 text-[#C79A45]" />
              <span>आवेदक का संपर्क विवरण</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-bold text-gray-700">{t("support.name")} *</Label>
                <Input
                  placeholder="अपना नाम दर्ज करें"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                />
                {errors.name && <p className="text-xs text-red-600 font-medium mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">{t("support.phoneNumber")} *</Label>
                <Input
                  placeholder="10-अंकीय फोन नंबर"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  type="tel"
                  maxLength={10}
                />
                {errors.phone && <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">{t("support.email")} *</Label>
                <Input
                  placeholder="ईमेल आईडी दर्ज करें"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  type="email"
                />
                {errors.email && <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Location Hierarchy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
              <MapPin className="w-4 h-4 text-[#C79A45]" />
              <span>क्षेत्रीय विवरण</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-bold text-gray-700">{t("support.District")} *</Label>
                <Select onValueChange={handleDistrictChange} value={selectedDistrict}>
                  <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                    <SelectValue placeholder="जिला चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(districts).map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && <p className="text-xs text-red-600 font-medium mt-1">{errors.district}</p>}
              </div>

              {selectedDistrict && (
                <div>
                  <Label className="text-xs font-bold text-gray-700">{t("support.SLS")} *</Label>
                  <Select onValueChange={setSelectedLoksabha} value={selectedLoksabha}>
                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                      <SelectValue placeholder="लोकसभा चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict]?.loksabha?.map((ls) => (
                        <SelectItem key={ls} value={ls}>{ls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.loksabha && <p className="text-xs text-red-600 font-medium mt-1">{errors.loksabha}</p>}
                </div>
              )}

              {selectedLoksabha && districts[selectedDistrict]?.vidansabha?.[selectedLoksabha] && (
                <div>
                  <Label className="text-xs font-bold text-gray-700">{t("support.SVS")} *</Label>
                  <Select onValueChange={setSelectedVidansabha} value={selectedVidansabha}>
                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                      <SelectValue placeholder="विधानसभा चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict]?.vidansabha?.[selectedLoksabha]?.map((vs) => (
                        <SelectItem key={vs} value={vs}>{vs}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.vidansabha && <p className="text-xs text-red-600 font-medium mt-1">{errors.vidansabha}</p>}
                </div>
              )}
            </div>

            {selectedDistrict && selectedVidansabha !== siteConfig.specialConstituency && (
              <div>
                <Label className="text-xs font-bold text-gray-700 mb-2 block">क्षेत्र प्रकार चुनें *</Label>
                <RadioGroup value={areaType} onValueChange={handleAreaTypeChange} className="flex gap-6 mt-1">
                  <div className="flex items-center space-x-2 bg-amber-50/50 px-3 py-1.5 rounded-lg border border-amber-200/60">
                    <RadioGroupItem value="rural" id="r_griv" />
                    <Label htmlFor="r_griv" className="text-xs font-medium cursor-pointer">ग्रामीण (Rural)</Label>
                  </div>
                  {showUrbanOption && (
                    <div className="flex items-center space-x-2 bg-amber-50/50 px-3 py-1.5 rounded-lg border border-amber-200/60">
                      <RadioGroupItem value="urban" id="u_griv" />
                      <Label htmlFor="u_griv" className="text-xs font-medium cursor-pointer">शहरी (Urban)</Label>
                    </div>
                  )}
                </RadioGroup>
                {errors.areaType && <p className="text-xs text-red-600 font-medium mt-1">{errors.areaType}</p>}
              </div>
            )}

            {areaType === "rural" && selectedDistrict && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold text-gray-700">ब्लॉक चुनें *</Label>
                  <Select onValueChange={setSelectedBlock} value={selectedBlock}>
                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                      <SelectValue placeholder="ब्लॉक चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict]?.blocks?.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.block && <p className="text-xs text-red-600 font-medium mt-1">{errors.block}</p>}
                </div>

                {selectedBlock && (
                  <div>
                    <Label className="text-xs font-bold text-gray-700">ग्राम पंचायत चुनें *</Label>
                    <Select onValueChange={setSelectedGramPanchayat} value={selectedGramPanchayat}>
                      <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                        <SelectValue placeholder="ग्राम पंचायत चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts[selectedDistrict]?.grampanchayat?.[selectedBlock]?.map((gp) => (
                          <SelectItem key={gp} value={gp}>{gp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.gramPanchayat && <p className="text-xs text-red-600 font-medium mt-1">{errors.gramPanchayat}</p>}
                  </div>
                )}
              </div>
            )}

            {selectedVidansabha === siteConfig.specialConstituency && (
              <div>
                <Label className="text-xs font-bold text-gray-700">वार्ड चुनें *</Label>
                <Select onValueChange={setSelectedWard} value={selectedWard}>
                  <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                    <SelectValue placeholder="वार्ड चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {siteConfig.specialWards.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ward && <p className="text-xs text-red-600 font-medium mt-1">{errors.ward}</p>}
              </div>
            )}

            {areaType === "urban" && selectedDistrict && selectedVidansabha !== siteConfig.specialConstituency && (
              <div>
                <Label className="text-xs font-bold text-gray-700">वार्ड चुनें *</Label>
                <Select onValueChange={setSelectedWard} value={selectedWard}>
                  <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                    <SelectValue placeholder="वार्ड चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts[selectedDistrict]?.nagar_nikay?.ward?.map((w) => (
                      <SelectItem key={w} value={w}>{w}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ward && <p className="text-xs text-red-600 font-medium mt-1">{errors.ward}</p>}
              </div>
            )}
          </div>

          {/* Section 3: Grievance Problem Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
              <MessageSquareWarning className="w-4 h-4 text-[#C79A45]" />
              <span>समस्या या शिकायत का विवरण</span>
            </div>
            <div>
              <Label className="text-xs font-bold text-gray-700">{t("support.WP")} *</Label>
              <Textarea
                placeholder="अपनी समस्या का पूरा विवरण स्पष्ट शब्दों में लिखें..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl h-32"
              />
              {errors.problem && <p className="text-xs text-red-600 font-medium mt-1">{errors.problem}</p>}
            </div>
          </div>

          {submitStatus === "success" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>आपकी समस्या सफलतापूर्वक दर्ज कर ली गई है। शीघ्र कार्यवाही की जाएगी।</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-bold">
              कुछ गलत हो गया। कृपया पुनः प्रयास करें।
            </div>
          )}

          <div className="pt-2 flex justify-end border-t border-amber-100">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#641526] hover:bg-[#3E0D18] text-white px-8 py-3 text-sm font-extrabold rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              {isSubmitting ? t("supportForm.submitting") : t("supportForm.submit")}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
