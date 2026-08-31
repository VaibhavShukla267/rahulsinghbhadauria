"use client"
import React, { useState, useRef } from "react";
import { useTranslation } from '@/contexts/TranslationContext';
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PenTool, User, Briefcase, MapPin, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import districts from "@/utils/data"; 
import positions from "@/utils/karyakarniData";
import siteConfig from "@/config/siteConfig";

// Zone and Mandal structure for Uttar Pradesh
const upZones = {
  "पश्चिमांचल": {
    mandals: ["मेरठ मंडल", "आगरा मंडल", "अलीगढ़ मंडल", "सहारनपुर मंडल", "मुरादाबाद मंडल", "बरेली मंडल"],
    districts: {
      "मेरठ मंडल": ["मेरठ", "गाजियाबाद", "गौतम बुद्ध नगर", "हापुड़", "बुलंदशहर", "बागपत"],
      "आगरा मंडल": ["आगरा", "फिरोजाबाद", "मैनपुरी", "मथुरा"],
      "अलीगढ़ मंडल": ["अलीगढ़", "हाथरस", "कासगंज", "एटा"],
      "सहारनपुर मंडल": ["सहारनपुर", "मुज़फ्फरनगर", "शामली"],
      "मुरादाबाद मंडल": ["मुरादाबाद", "रामपुर", "ज्योतिबा फुले नगर", "बिजनौर", "सम्भल"],
      "बरेली मंडल": ["बरेली", "बदायूं", "पीलीभीत", "शाहजहाँपुर"]
    }
  },
  "पूर्वांचल": {
    mandals: ["गोरखपुर मंडल", "देवीपाटन मंडल", "बस्ती मंडल", "आजमगढ़ मंडल", "वाराणसी मंडल", "मिर्जापुर मंडल"],
    districts: {
      "गोरखपुर मंडल": ["गोरखपुर", "कुशी नगर", "देवरिया", "महराजगंज"],
      "देवीपाटन मंडल": ["गोंडा", "बहराइच", "श्रावस्ती", "बलरामपुर"],
      "बस्ती मंडल": ["बस्ती", "सिद्धार्थ नगर", "संत कबीर नगर"],
      "आजमगढ़ मंडल": ["आज़मगढ़", "मऊ", "बलिया", "अम्बेडकर नगर"],
      "वाराणसी मंडल": ["वाराणसी", "चन्दौली", "जौनपुर", "गाजीपुर", "भदोही(संत रविदास नगर)"],
      "मिर्जापुर मंडल": ["मीरजापुर", "सोनभद्र"]
    }
  },
  "मध्यांचल": {
    mandals: ["लखनऊ मंडल", "फैजाबाद मंडल", "इलाहाबाद मंडल", "कानपुर मंडल"],
    districts: {
      "लखनऊ मंडल": ["लखनऊ", "अयोध्या", "रायबरेली", "उन्नाव", "सीतापुर", "हरदोई", "लखीमपुर खीरी"],
      "फैजाबाद मंडल": ["फैजाबाद", "अमेठी", "सुल्तानपुर", "बाराबंकी"],
      "इलाहाबाद मंडल": ["प्रयागराज", "कौशाम्बी", "प्रतापगढ़", "फतेहपुर"],
      "कानपुर मंडल": ["कानपुर देहात", "कानपुर नगर", "औरैया", "इटावा", "फर्रुखाबाद", "कन्नौज"]
    }
  },
  "बुंदेलखंड": {
    mandals: ["झांसी मंडल", "चित्रकूट मंडल"],
    districts: {
      "झांसी मंडल": ["झांसी", "जालौन", "ललितपुर", "हमीरपुर", "महोबा"],
      "चित्रकूट मंडल": ["चित्रकूट", "बाँदा"]
    }
  }
};

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

function Page() {
    const { t } = useTranslation();
    const serialNumberRef = useRef("RSB" + Date.now().toString());
    
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [education, setEducation] = useState("");
    const [address, setAddress] = useState("");
    const [executiveCommittee, setExecutiveCommittee] = useState("");
    const [position, setPosition] = useState("");
    const [executiveId, setExecutiveId] = useState("");
    const [experience, setExperience] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [selectedState, setSelectedState] = useState("");
    
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedMandal, setSelectedMandal] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedLoksabha, setSelectedLoksabha] = useState("");
    const [selectedVidansabha, setSelectedVidansabha] = useState("");
    const [areaType, setAreaType] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        let newErrors = {};
        
        if (!name) newErrors.name = "नाम आवश्यक है";
        if (!fatherName) newErrors.fatherName = "पिता/पति का नाम आवश्यक है";
        if (!birthDate) newErrors.birthDate = "जन्म तिथि आवश्यक है";
        if (!address) newErrors.address = "पूरा पता आवश्यक है";
        if (!executiveCommittee) newErrors.executiveCommittee = "कार्यकारणी का चयन आवश्यक है";
        if (!position) newErrors.position = "पद का चयन आवश्यक है";
        if (!executiveId) newErrors.executiveId = "सदस्यता कार्ड आईडी आवश्यक है";
        if (!phone || !/^[0-9]{10}$/.test(phone)) newErrors.phone = "वैध 10-अंकीय फोन नंबर दर्ज करें";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "वैध ईमेल दर्ज करें";
        if (!applicationDate) newErrors.applicationDate = "आवेदन की तिथि आवश्यक है";
        if (!selectedState) newErrors.state = "राज्य का चयन आवश्यक है";
        
        if (selectedState === "Uttar Pradesh") {
            if (!selectedZone) newErrors.zone = "क्षेत्र का चयन आवश्यक है";
            if (!selectedMandal) newErrors.mandal = "मंडल का चयन आवश्यक है";
            if (!selectedDistrict) newErrors.district = "जिला का चयन आवश्यक है";
            if (!selectedLoksabha) newErrors.loksabha = "लोकसभा का चयन आवश्यक है";
            if (!selectedVidansabha) newErrors.vidansabha = "विधानसभा का चयन आवश्यक है";
            if (!areaType) newErrors.areaType = "क्षेत्र प्रकार का चयन आवश्यक है";
            
            if (areaType === "rural") {
                if (!selectedBlock) newErrors.block = "ब्लॉक का चयन आवश्यक है";
                if (!selectedGramPanchayat) newErrors.gramPanchayat = "ग्राम पंचायत का चयन आवश्यक है";
            } else if (areaType === "urban") {
                if (!selectedWard) newErrors.ward = "वार्ड का चयन आवश्यक है";
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        if (state !== 'Uttar Pradesh') {
            setSelectedZone("");
            setSelectedMandal("");
            setSelectedDistrict("");
            setSelectedLoksabha("");
            setSelectedVidansabha("");
            setAreaType("");
            setSelectedBlock("");
            setSelectedGramPanchayat("");
            setSelectedWard("");
        }
    };

    const handleZoneChange = (zone) => {
        setSelectedZone(zone);
        setSelectedMandal("");
        setSelectedDistrict("");
        setSelectedLoksabha("");
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleMandalChange = (mandal) => {
        setSelectedMandal(mandal);
        setSelectedDistrict("");
        setSelectedLoksabha("");
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
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

    const handleLoksabhaChange = (loksabha) => {
        setSelectedLoksabha(loksabha);
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleVidansabhaChange = (vidansabha) => {
        setSelectedVidansabha(vidansabha);
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
        
        if (vidansabha === siteConfig.specialConstituency) {
            setAreaType("urban");
        }
    };

    const handleAreaTypeChange = (type) => {
        setAreaType(type);
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleBlockChange = (block) => {
        setSelectedBlock(block);
        setSelectedGramPanchayat("");
    };

    const handleExecutiveCommitteeChange = (committee) => {
        setExecutiveCommittee(committee);
        setPosition("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formData = {
                serialNumber: serialNumberRef.current, name, fatherName, birthDate, education, address,
                phone, email, applicationDate, state: selectedState,
                zone: selectedZone, mandal: selectedMandal, district: selectedDistrict, 
                loksabha: selectedLoksabha, vidansabha: selectedVidansabha, 
                areaType: areaType, block: selectedBlock, gramPanchayat: selectedGramPanchayat, 
                ward: selectedWard, submittedAt: new Date().toISOString()
            };

            const response = await fetch('/api/submit/padAvedan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit form');

            await response.json();
            setSubmitStatus('success');
            
            setName(""); setFatherName(""); setBirthDate(""); setEducation("");
            setAddress(""); setExecutiveCommittee(""); setPosition(""); setExecutiveId("");
            setExperience(""); setPhone(""); setEmail(""); setApplicationDate("");
            setSelectedState(""); setSelectedZone(""); setSelectedMandal("");
            setSelectedDistrict(""); setSelectedLoksabha(""); setSelectedVidansabha("");
            setAreaType(""); setSelectedBlock(""); setSelectedGramPanchayat(""); setSelectedWard("");
            
            serialNumberRef.current = "RSB" + Date.now().toString();
            
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showUrbanOption = selectedDistrict && districts[selectedDistrict]?.nagar_nikay?.ward?.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-10 px-4">
            
            {/* Animated Title */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#641526] text-white px-6 py-3 rounded-2xl shadow-md border border-amber-500/20 font-extrabold text-lg sm:text-2xl">
                    <PenTool className="w-5 h-5 text-[#C79A45]" />
                    <TypeAnimation
                        sequence={['पद आवेदन फॉर्म', 5000, 'Position Application Form', 3000]}
                        wrapper="span" speed={50} repeat={Infinity}
                    />
                </div>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-900/10 overflow-hidden">
                <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] text-white p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold">संगठनात्मक पद हेतु आवेदन पत्र</h2>
                    <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
                        संगठन की विभिन्न जिम्मेदारियों एवं पदों हेतु अपने विवरण दर्ज करें।
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

                    {/* Registration ID & Date */}
                    <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-bold text-amber-900 uppercase">आवेदन संख्या (Ref. No.)</Label>
                            <div className="text-sm font-mono font-bold text-gray-800 mt-1 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                                {serialNumberRef.current}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="application_date" className="text-xs font-bold text-amber-900 uppercase">आवेदन तिथि *</Label>
                            <Input
                                id="application_date"
                                type="date"
                                value={applicationDate}
                                onChange={(e) => setApplicationDate(e.target.value)}
                                className="mt-1 bg-white border-amber-200 focus:border-[#641526]"
                            />
                            {errors.applicationDate && <p className="text-xs text-red-600 font-medium mt-1">{errors.applicationDate}</p>}
                        </div>
                    </div>

                    {/* Section 1: Applicant Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                            <User className="w-4 h-4 text-[#C79A45]" />
                            <span>आवेदक का व्यक्तिगत विवरण</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-gray-700">आवेदक का नाम *</Label>
                                <Input placeholder="अपना पूरा नाम दर्ज करें" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.name && <p className="text-xs text-red-600 font-medium mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">पिता / पति / माता का नाम *</Label>
                                <Input placeholder="अभिभावक का नाम" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.fatherName && <p className="text-xs text-red-600 font-medium mt-1">{errors.fatherName}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">जन्म तिथि *</Label>
                                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.birthDate && <p className="text-xs text-red-600 font-medium mt-1">{errors.birthDate}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">शैक्षणिक योग्यता</Label>
                                <Input placeholder="जैसे: स्नातक, परास्नातक आदि" value={education} onChange={(e) => setEducation(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.education && <p className="text-xs text-red-600 font-medium mt-1">{errors.education}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Position & Membership */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                            <Briefcase className="w-4 h-4 text-[#C79A45]" />
                            <span>वांछित पद एवं सदस्यता विवरण</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-gray-700">कार्यकारणी चुनें *</Label>
                                <Select onValueChange={handleExecutiveCommitteeChange} value={executiveCommittee}>
                                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="कार्यकारणी का चयन करें" /></SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(positions).map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.executiveCommittee && <p className="text-xs text-red-600 font-medium mt-1">{errors.executiveCommittee}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">आवेदित पद *</Label>
                                <Select onValueChange={setPosition} value={position} disabled={!executiveCommittee}>
                                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="पद का चयन करें" /></SelectTrigger>
                                    <SelectContent>
                                        {executiveCommittee && positions[executiveCommittee]?.map((pos) => (
                                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.position && <p className="text-xs text-red-600 font-medium mt-1">{errors.position}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">सदस्यता कार्ड संख्या *</Label>
                                <Input placeholder="सदस्यता कार्ड आईडी दर्ज करें" value={executiveId} onChange={(e) => setExecutiveId(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.executiveId && <p className="text-xs text-red-600 font-medium mt-1">{errors.executiveId}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <Label className="text-xs font-bold text-gray-700">पूर्व सामाजिक/राजनीतिक अनुभव</Label>
                                <Textarea placeholder="अपने पूर्व कार्य या अनुभव का संक्षेप में विवरण दें..." value={experience} onChange={(e) => setExperience(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl h-20" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Contact & Location */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                            <MapPin className="w-4 h-4 text-[#C79A45]" />
                            <span>संपर्क एवं भौगोलिक विवरण</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-gray-700">फोन नंबर *</Label>
                                <Input type="tel" maxLength={10} placeholder="10-अंकीय फोन नंबर" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.phone && <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-gray-700">ईमेल आईडी *</Label>
                                <Input type="email" placeholder="वैध ईमेल दर्ज करें" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl" />
                                {errors.email && <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <Label className="text-xs font-bold text-gray-700">पूरा स्थाई पता *</Label>
                                <Textarea placeholder="मकान नंबर, गांव/मोहल्ला, पोस्ट ऑफिस, जिला दर्ज करें" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl h-20" />
                                {errors.address && <p className="text-xs text-red-600 font-medium mt-1">{errors.address}</p>}
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-gray-700">राज्य चुनें *</Label>
                                <Select onValueChange={handleStateChange} value={selectedState}>
                                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="राज्य का चयन करें" /></SelectTrigger>
                                    <SelectContent>{states.map((st) => <SelectItem key={st} value={st}>{st}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.state && <p className="text-xs text-red-600 font-medium mt-1">{errors.state}</p>}
                            </div>

                            {selectedState === "Uttar Pradesh" && (
                                <>
                                    <div>
                                        <Label className="text-xs font-bold text-gray-700">क्षेत्र चुनें *</Label>
                                        <Select onValueChange={handleZoneChange} value={selectedZone}>
                                            <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="क्षेत्र का चयन करें" /></SelectTrigger>
                                            <SelectContent>{Object.keys(upZones).map((z) => <SelectItem key={z} value={z}>{z}</SelectItem>)}</SelectContent>
                                        </Select>
                                        {errors.zone && <p className="text-xs text-red-600 font-medium mt-1">{errors.zone}</p>}
                                    </div>
                                    {selectedZone && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">मंडल चुनें *</Label>
                                            <Select onValueChange={handleMandalChange} value={selectedMandal}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="मंडल का चयन करें" /></SelectTrigger>
                                                <SelectContent>{upZones[selectedZone]?.mandals?.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.mandal && <p className="text-xs text-red-600 font-medium mt-1">{errors.mandal}</p>}
                                        </div>
                                    )}
                                    {selectedMandal && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">जिला चुनें *</Label>
                                            <Select onValueChange={handleDistrictChange} value={selectedDistrict}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="जिला का चयन करें" /></SelectTrigger>
                                                <SelectContent>{upZones[selectedZone]?.districts?.[selectedMandal]?.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.district && <p className="text-xs text-red-600 font-medium mt-1">{errors.district}</p>}
                                        </div>
                                    )}
                                    {selectedDistrict && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">लोकसभा *</Label>
                                            <Select onValueChange={handleLoksabhaChange} value={selectedLoksabha}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="लोकसभा चुनें" /></SelectTrigger>
                                                <SelectContent>{districts[selectedDistrict]?.loksabha?.map((ls) => <SelectItem key={ls} value={ls}>{ls}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.loksabha && <p className="text-xs text-red-600 font-medium mt-1">{errors.loksabha}</p>}
                                        </div>
                                    )}
                                    {selectedLoksabha && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">विधानसभा *</Label>
                                            <Select onValueChange={handleVidansabhaChange} value={selectedVidansabha}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="विधानसभा चुनें" /></SelectTrigger>
                                                <SelectContent>{districts[selectedDistrict]?.vidansabha?.[selectedLoksabha]?.map((vs) => <SelectItem key={vs} value={vs}>{vs}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.vidansabha && <p className="text-xs text-red-600 font-medium mt-1">{errors.vidansabha}</p>}
                                        </div>
                                    )}
                                    {selectedVidansabha && selectedVidansabha !== siteConfig.specialConstituency && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700 mb-2 block">क्षेत्र प्रकार *</Label>
                                            <RadioGroup value={areaType} onValueChange={handleAreaTypeChange} className="flex gap-4">
                                                <div className="flex items-center space-x-2 bg-amber-50/50 px-3 py-1.5 rounded-lg border border-amber-200/60"><RadioGroupItem value="rural" id="r1" /><Label htmlFor="r1" className="text-xs font-medium cursor-pointer">ग्रामीण</Label></div>
                                                {showUrbanOption && (<div className="flex items-center space-x-2 bg-amber-50/50 px-3 py-1.5 rounded-lg border border-amber-200/60"><RadioGroupItem value="urban" id="u1" /><Label htmlFor="u1" className="text-xs font-medium cursor-pointer">शहरी</Label></div>)}
                                            </RadioGroup>
                                            {errors.areaType && <p className="text-xs text-red-600 font-medium mt-1">{errors.areaType}</p>}
                                        </div>
                                    )}
                                    {selectedVidansabha === siteConfig.specialConstituency && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">वार्ड चुनें *</Label>
                                            <Select onValueChange={setSelectedWard} value={selectedWard}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="वार्ड का चयन करें" /></SelectTrigger>
                                                <SelectContent>{siteConfig.specialWards.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.ward && <p className="text-xs text-red-600 font-medium mt-1">{errors.ward}</p>}
                                        </div>
                                    )}
                                    {areaType === "rural" && selectedDistrict && (
                                        <>
                                            <div>
                                                <Label className="text-xs font-bold text-gray-700">ब्लॉक चुनें *</Label>
                                                <Select onValueChange={handleBlockChange} value={selectedBlock}>
                                                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="ब्लॉक चुनें" /></SelectTrigger>
                                                    <SelectContent>{districts[selectedDistrict]?.blocks?.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                                                </Select>
                                                {errors.block && <p className="text-xs text-red-600 font-medium mt-1">{errors.block}</p>}
                                            </div>
                                            {selectedBlock && (
                                                <div>
                                                    <Label className="text-xs font-bold text-gray-700">ग्राम पंचायत चुनें *</Label>
                                                    <Select onValueChange={setSelectedGramPanchayat} value={selectedGramPanchayat}>
                                                        <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="ग्राम पंचायत चुनें" /></SelectTrigger>
                                                        <SelectContent>{districts[selectedDistrict]?.grampanchayat?.[selectedBlock]?.map((gp) => <SelectItem key={gp} value={gp}>{gp}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                    {errors.gramPanchayat && <p className="text-xs text-red-600 font-medium mt-1">{errors.gramPanchayat}</p>}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {areaType === "urban" && selectedDistrict && selectedVidansabha !== siteConfig.specialConstituency && (
                                        <div>
                                            <Label className="text-xs font-bold text-gray-700">वार्ड चुनें *</Label>
                                            <Select onValueChange={setSelectedWard} value={selectedWard}>
                                                <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"><SelectValue placeholder="वार्ड चुनें" /></SelectTrigger>
                                                <SelectContent>{districts[selectedDistrict]?.nagar_nikay?.ward?.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                                            </Select>
                                            {errors.ward && <p className="text-xs text-red-600 font-medium mt-1">{errors.ward}</p>}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {submitStatus === 'success' && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>आवेदन सफलतापूर्वक जमा हो गया है!</span>
                        </div>
                    )}
                    {submitStatus === 'error' && (
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
                            {isSubmitting ? 'सबमिट कर रहे हैं...' : 'आवेदन जमा करें'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;