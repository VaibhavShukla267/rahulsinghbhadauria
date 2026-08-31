import React from 'react';
import { CheckCircle2, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function SankalpPatra() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Main Pledge Card */}
      <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] rounded-3xl shadow-xl p-8 sm:p-10 text-white relative overflow-hidden border border-amber-500/20">
        <div className="flex items-center gap-2 bg-amber-500/20 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-amber-400/20 w-fit">
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>व्यक्तिगत संकल्प पत्र</span>
        </div>
        <p className="text-amber-50/95 text-base sm:text-xl font-medium leading-relaxed font-serif text-justify">
          "मैं, <strong className="text-amber-300 font-bold">राहुल सिंह भदौरिया</strong>, यह व्यक्तिगत संकल्प लेता हूँ कि समाज के प्रत्येक वर्ग के अधिकारों की रक्षा के लिए सदैव तत्पर रहूँगा और न्याय, समानता तथा सर्वांगीण विकास के लिए निरंतर संघर्ष करूँगा। मेरा ध्येय एक ऐसे जागरूक एवं समृद्ध समाज का निर्माण करना है जहां हर नागरिक को उसके संवैधानिक अधिकार मिलें, हमारी बहनें एवं महिलाएं सुरक्षित हों, बुजुर्गों को सम्मान प्राप्त हो, युवाओं को रोजगार एवं प्रोत्साहन मिले तथा शिक्षा, स्वास्थ्य और बुनियादी सुविधाओं का अभूतपूर्व विस्तार हो।"
        </p>
      </div>

      {/* Sankalp Points Section */}
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-[#641526] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#C79A45]" />
            <span>जनसेवा एवं विकास की प्रतिबद्धता</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#641526]">
            ✦ मेरा संकल्प ✦
          </h2>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "1. संविधान एवं नागरिक अधिकारों की रक्षा",
              points: [
                "भारतीय संविधान द्वारा प्रदत्त अधिकारों और कर्तव्यों की रक्षा हेतु सदैव संघर्षरत रहूँगा।",
                "लोकतंत्र, सामाजिक न्याय और निष्पक्ष समानता को सुदृढ़ करने का निरंतर प्रयास करूँगा।",
                "संवैधानिक अधिकारों एवं कल्याणकारी नीतियों के प्रति प्रत्येक नागरिक को जागरूक करूँगा।",
                "भ्रष्टाचार, जातिवादी वैमनस्य और किसी भी प्रकार के अन्याय के विरुद्ध अपनी आवाज बुलंद रखूँगा।"
              ]
            },
            {
              title: "2. महिलाओं के अधिकार एवं सुरक्षा",
              points: [
                "महिलाओं की सुरक्षा, सम्मान और अधिकारों की सुरक्षा हेतु प्रभावी तंत्र बनाने की मांग उठाऊँगा।",
                "दहेज प्रथा, घरेलू हिंसा और सामाजिक कुरीतियों के उन्मूलन हेतु जमीनी स्तर पर कार्य करूँगा।",
                "बालिकाओं की गुणवत्तापूर्ण शिक्षा और वित्तीय आत्मनिर्भरता की योजनाओं के लिए कार्य करूँगा।",
                "महिला उद्यमिता एवं स्वरोजगार को बढ़ावा देने के लिए मार्गदर्शन और सहयोग प्रदान करूँगा।"
              ]
            },
            {
              title: "3. बुजुर्गों के लिए सम्मान और सुविधाएं",
              points: [
                "वरिष्ठ नागरिकों को पेंशन, स्वास्थ्य देखभाल एवं सरकारी योजनाओं का शत-प्रतिशत लाभ दिलाऊँगा।",
                "वृद्धाश्रमों की व्यवस्था सुधारने तथा बुजुर्गों के लिए बेहतर चिकित्सा सेवाएं सुनिश्चित करवाऊँगा।",
                "समाज में वरिष्ठजनों के अनुभवों का सम्मान करने और मार्गदर्शन लेने हेतु निरंतर प्रयास करूँगा।"
              ]
            },
            {
              title: "4. युवाओं के अधिकार एवं सशक्तिकरण",
              points: [
                "युवाओं के लिए रोजगार के नए अवसर सृजित करने हेतु पारदर्शी नीतियों को लागू करने की मांग करूँगा।",
                "शिक्षा, खेलकूद, डिजिटल साक्षरता और तकनीकी कौशल में युवाओं की भागीदारी बढ़ाऊँगा।",
                "नशा मुक्ति अभियानों का संचालन कर युवाओं को सकारात्मक दिशा में प्रेरित करूँगा।",
                "स्टार्टअप, इनोवेशन एवं स्वरोजगार स्थापित करने वाले युवाओं को पूर्ण मार्गदर्शन प्रदान करूँगा।"
              ]
            },
            {
              title: "5. सामाजिक न्याय एवं समानता",
              points: [
                "आर्थिक रूप से कमजोर एवं वंचित परिवारों को सरकारी जनकल्याणकारी योजनाओं से जोड़ूँगा।",
                "जातिवादी और वर्गगत भेदभाव से मुक्त सौहार्दपूर्ण समाज के निर्माण हेतु कार्य करूँगा।",
                "बिना किसी भेदभाव के समाज के हर जरूरतमंद व्यक्ति की मदद हेतु सदैव उपलब्ध रहूँगा।"
              ]
            },
            {
              title: "6. रोजगार और कौशल विकास",
              points: [
                "क्षेत्र में सरकारी एवं निजी क्षेत्रों के माध्यम से नए रोजगार के अवसर बनाने हेतु प्रयासरत रहूँगा।",
                "युवाओं और महिलाओं के कौशल विकास हेतु स्थानीय स्तर पर वोकेशनल ट्रेनिंग सेंटर शुरू करवाऊँगा।",
                "मजदूरों एवं श्रमिकों को उनके अधिकारों एवं न्यायसंगत मानदेय दिलाने हेतु संघर्ष करूँगा।",
                "प्रतियोगी परीक्षाओं की निष्पक्षता एवं समयबद्ध भर्ती प्रक्रिया हेतु शासन से मांग उठाऊँगा।"
              ]
            },
            {
              title: "7. इंफ्रास्ट्रक्चर एवं जनसुविधाएं",
              points: [
                "शहरी एवं ग्रामीण क्षेत्रों में गुणवत्तापूर्ण, गड्ढा मुक्त सड़कों के निर्माण हेतु कार्य करूँगा।",
                "सड़क सुरक्षा, स्ट्रीट लाइट एवं यातायात व्यवस्था के सुधार हेतु कड़े कदम उठवाऊँगा।",
                "क्षेत्रीय पुलों, जल निकासी और सार्वजनिक परिवहन सेवाओं को सुदृढ़ बनाने हेतु प्रयासरत रहूँगा।"
              ]
            },
            {
              title: "8. स्वच्छ पेयजल एवं पर्यावरण संरक्षण",
              points: [
                "प्रत्येक घर तक स्वच्छ एवं शुद्ध पेयजल की पहुंच सुनिश्चित करने हेतु कार्य करूँगा।",
                "तालाबों, पोखरों एवं स्थानीय जल स्रोतों के पुनरुद्धार हेतु जन-अभियान चलाऊँगा।",
                "वर्षा जल संचयन (Rainwater Harvesting) एवं सघन वृक्षारोपण को बढ़ावा दूंगा।"
              ]
            },
            {
              title: "9. गुणवत्तापूर्ण शिक्षा एवं स्वास्थ्य",
              points: [
                "सरकारी विद्यालयों एवं प्राथमिक स्वास्थ्य केंद्रों में आधुनिक संसाधनों की उपलब्धता सुनिश्चित करवाऊँगा।",
                "गरीब एवं मेधावी छात्रों को उच्च शिक्षा हेतु छात्रवृत्ति एवं सहायता दिलाने का प्रयास करूँगा।",
                "शिक्षा एवं स्वास्थ्य के क्षेत्र में व्याप्त अनियमितताओं को दूर करने हेतु निरंतर संघर्षरत रहूँगा।"
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-amber-900/10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#641526] mb-4 border-b border-amber-100 pb-3">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2.5 text-gray-700 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#C79A45] mt-0.5 shrink-0" />
                      <span className="leading-relaxed text-justify">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Personal Pledge Banner */}
      <div className="bg-amber-50/80 rounded-3xl p-8 sm:p-10 border border-amber-200 text-center space-y-4 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#641526]">
          ✦ मेरा वादा, मेरा संकल्प ✦
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-serif">
          मैं, राहुल सिंह भदौरिया, समाज के प्रत्येक नागरिक की खुशहाली एवं अधिकारों की सुरक्षा हेतु सदैव समर्पित रहूँगा। अन्याय और असमानता के विरुद्ध मेरी आवाज़ कभी शांत नहीं होगी।
        </p>
        <div className="pt-2">
          <p className="text-lg sm:text-xl font-bold text-[#641526] italic bg-white inline-block px-6 py-2 rounded-full border border-amber-300 shadow-xs">
            "जनसेवा ही मेरा धर्म, संघर्ष ही मेरी पहचान!"
          </p>
        </div>
      </div>

    </div>
  );
}