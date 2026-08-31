"use client"
import { toast } from "sonner"
import siteConfig from "@/config/siteConfig";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import Script from 'next/script';
import districts from "@/utils/data";
import { User, Phone, MapPin, ShieldCheck, CreditCard, HeartHandshake, Sparkles } from "lucide-react";

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

export default function FormComponent() {
  const userId = useRef("rsb" + Date.now().toString());
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [donateAmount, setdonateAmount] = useState("200");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    mob: "",
    whatno: "",
    address: "",
    state: ""
  });

  const validateForm = () => {
    let newErrors = {};
    if (Number(donateAmount) < 200) {
      toast.error('न्यूनतम सहयोग राशि ₹200 है');
      return false;
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "प्रथम नाम अनिवार्य है";
    } else if (formData.name.length < 2) {
      newErrors.name = "प्रथम नाम कम से कम 2 अक्षर का होना चाहिए";
    }

    if (!formData.lname.trim()) {
      newErrors.lname = "अंतिम नाम अनिवार्य है";
    } else if (formData.lname.length < 2) {
      newErrors.lname = "अंतिम नाम कम से कम 2 अक्षर का होना चाहिए";
    }

    if (!formData.mob) {
      newErrors.mob = "फोन नंबर अनिवार्य है";
    } else if (!/^[0-9]{10}$/.test(formData.mob)) {
      newErrors.mob = "वैध 10-अंकीय फोन नंबर दर्ज करें";
    }

    if (!formData.whatno) {
      newErrors.whatno = "व्हाट्सएप नंबर अनिवार्य है";
    } else if (!/^[0-9]{10}$/.test(formData.whatno)) {
      newErrors.whatno = "वैध 10-अंकीय व्हाट्सएप नंबर दर्ज करें";
    }

    if (!formData.address.trim()) {
      newErrors.address = "पूरा पता अनिवार्य है";
    } else if (formData.address.length < 10) {
      newErrors.address = "कृपया पूरा स्पष्ट पता दर्ज करें";
    }

    if (!formData.state) {
      newErrors.state = "राज्य का चयन करें";
    }

    if (formData.state === "Uttar Pradesh") {
      if (!selectedDistrict) newErrors.district = "जिला अनिवार्य है";
    }

    if (!consent) {
      newErrors.consent = "कृपया घोषणा पत्र पर अपनी सहमति दें";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'state' && value !== 'Uttar Pradesh') {
      setSelectedDistrict("");
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(formData.state === 'Uttar Pradesh' ? {
        district: selectedDistrict,
      } : {
        district: "",
      })
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        setIsSubmitting(false);
        return;
      }

      const orderResponse = await fetch('/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId.current, membership_type: "donate", amount: Number(donateAmount) * 100 }),
      });
      const { orderId } = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(donateAmount) * 100,
        currency: "INR",
        name: siteConfig.organizationNameHi,
        description: "Donation Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/verifyPayment/support', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: {
                  userId: userId.current,
                  ...formData
                }
              }),
            });

            const data = await verifyResponse.json();
            if (data.success) {
              setIsSubmitting(false);
              toast.success("सहयोग राशि प्राप्त करने के लिए आपका धन्यवाद!");
              setFormData({
                name: "", lname: "", mob: "", whatno: "", district: "", address: "", state: ""
              });
              setSelectedDistrict("");
              setConsent(false);
              userId.current = "rsb" + Date.now().toString();
            }
          } catch (err) {
            setIsSubmitting(false);
            toast.error("भुगतान सत्यापन विफल रहा।");
          }
        },
        prefill: {
          name: `${formData.name} ${formData.lname}`,
          contact: formData.mob,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setIsSubmitting(false);
      toast.error('त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full max-w-4xl mx-auto my-8 px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-amber-900/10 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] text-white p-6 sm:p-8 text-center relative">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-amber-400/20">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
              <span>सहयोग एवं दान (Donation)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">सहयोग फॉर्म (Donation Form)</h1>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              सामाजिक सुधार, शिक्षा प्रसार एवं राहत सामग्री अभियानों हेतु अपना स्वेच्छिक सहयोग प्रदान करें।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

            {/* Quick Amount Selector */}
            <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/60 space-y-3">
              <Label htmlFor="donateAmount" className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                सहयोग राशि चुनें या दर्ज करें (₹) *
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["200", "500", "1000", "2100"].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setdonateAmount(amt)}
                    className={`py-2 px-3 rounded-xl text-sm font-extrabold transition-all border ${
                      donateAmount === amt
                        ? "bg-[#641526] text-white border-[#641526] shadow-sm"
                        : "bg-white text-gray-800 border-amber-200 hover:bg-amber-100/50"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <Input
                  id="donateAmount"
                  type="number"
                  min="200"
                  placeholder="अन्य राशि (₹)"
                  value={donateAmount}
                  onChange={(e) => setdonateAmount(e.target.value)}
                  className="bg-white border-amber-200 focus:border-[#641526] font-bold text-gray-800 rounded-xl"
                />
              </div>
            </div>

            {/* Section 1: Donor Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                <User className="w-4 h-4 text-[#C79A45]" />
                <span>सहयोगकर्ता का विवरण</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-bold text-gray-700">प्रथम नाम *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="अपना प्रथम नाम दर्ज करें"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  />
                  {errors.name && <p className="text-xs text-red-600 font-medium mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="lname" className="text-xs font-bold text-gray-700">अंतिम नाम *</Label>
                  <Input
                    id="lname"
                    name="lname"
                    placeholder="अपना अंतिम नाम दर्ज करें"
                    value={formData.lname}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  />
                  {errors.lname && <p className="text-xs text-red-600 font-medium mt-1">{errors.lname}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                <Phone className="w-4 h-4 text-[#C79A45]" />
                <span>संपर्क विवरण</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mob" className="text-xs font-bold text-gray-700">मोबाइल नंबर *</Label>
                  <Input
                    id="mob"
                    name="mob"
                    type="tel"
                    maxLength={10}
                    placeholder="10-अंकीय मोबाइल नंबर"
                    value={formData.mob}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  />
                  {errors.mob && <p className="text-xs text-red-600 font-medium mt-1">{errors.mob}</p>}
                </div>
                <div>
                  <Label htmlFor="whatno" className="text-xs font-bold text-gray-700">व्हाट्सएप नंबर *</Label>
                  <Input
                    id="whatno"
                    name="whatno"
                    type="tel"
                    maxLength={10}
                    placeholder="10-अंकीय व्हाट्सएप नंबर"
                    value={formData.whatno}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  />
                  {errors.whatno && <p className="text-xs text-red-600 font-medium mt-1">{errors.whatno}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Address Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#641526] font-bold text-base border-b border-amber-100 pb-2">
                <MapPin className="w-4 h-4 text-[#C79A45]" />
                <span>पता विवरण</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-xs font-bold text-gray-700">पूरा पता *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="मकान नंबर, गली/मोहल्ला, लैंडमार्क दर्ज करें"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl"
                  />
                  {errors.address && <p className="text-xs text-red-600 font-medium mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-700">राज्य चुनें *</Label>
                  <Select
                    name="state"
                    value={formData.state}
                    onValueChange={(val) => handleInputChange({ target: { name: 'state', value: val } })}
                  >
                    <SelectTrigger className="mt-1 bg-gray-50/50 focus:bg-white border-gray-200 focus:border-[#641526] rounded-xl">
                      <SelectValue placeholder="राज्य का चयन करें" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((st) => (
                        <SelectItem key={st} value={st}>{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-600 font-medium mt-1">{errors.state}</p>}
                </div>

                {formData.state === "Uttar Pradesh" && (
                  <div>
                    <Label className="text-xs font-bold text-gray-700">जिला चुनें *</Label>
                    <Select onValueChange={(val) => { setSelectedDistrict(val); formData.district = val; }}>
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
                )}
              </div>
            </div>

            {/* Section 4: Declaration Box */}
            <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/60 space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked)}
                  className="mt-0.5 border-amber-800 data-[state=checked]:bg-[#641526]"
                />
                <label htmlFor="consent" className="text-xs text-gray-700 leading-relaxed cursor-pointer font-serif">
                  मैं एतद्द्वारा अपनी स्वेच्छा से सामाजिक विकास अभियानों के लिए सहयोग प्रदान कर रहा हूँ और सभी नियम एवं शर्तों से सहमत हूँ।
                </label>
              </div>
              {errors.consent && <p className="text-xs text-red-600 font-bold pl-7">{errors.consent}</p>}
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% सुरक्षित भुगतान प्रणाली (Razorpay)</span>
              </div>

              <Button
                type="submit"
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#641526] hover:bg-[#3E0D18] text-white px-8 py-3 text-sm font-extrabold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? "प्रक्रिया जारी है..." : `सहयोग राशि प्रदान करें (₹${donateAmount})`}</span>
              </Button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
