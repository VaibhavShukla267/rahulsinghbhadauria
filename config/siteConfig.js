// Centralized Branding and Site Customization Configuration

const siteConfig = {
  // Branding Details
  organizationNameEn: "Rahul Singh Bhadauria",
  organizationNameHi: "राहुल सिंह भदौरिया",
  founderNameEn: "Rahul Singh Bhadauria",
  founderNameHi: "राहुल सिंह भदौरिया",

  // Contact Information
  contactEmail: "Rahulsinghbhadauriya@gmail.com",
  contactPhone: "+91 91408 66567",
  address: "Uttar Pradesh, Lucknow, Kanpur",

  // Social Media Links
  socialLinks: {
    facebook: "https://www.facebook.com/rsb27official",
    twitter: "https://twitter.com/rsb27official",
    instagram: "https://www.instagram.com/rsb27official/",
    youtube: "http://localhost:3000/",
  },

  // Founder Widgets
  founder: {
    name: "Rahul Singh Bhadauria",
    facebookUrl: "https://www.facebook.com/rsb27official",
    // Iframe src urls
    facebookWidgetSrc: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Frsb27official&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId",
  },

  // Organization Widgets
  organization: {
    facebookWidgetSrc: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Frsb27official&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true",
  },

  // Geographic / Local Customizations
  specialConstituency: "कल्याणपुर",
  specialWards: [
    'नवाबगंज ', 'विष्णुपुरी ', 'पुराना कानपुर ', 'ख्योरा ', 'नारामऊ ', 'बेनाझाबर ', 
    'तिलक नगर ', 'आवास विकास ', 'कल्याणपुर उत्तरी ', 'कल्याणपुर दक्षिण ', 
    'गीता नगर ', 'कल्याणपुर पश्चिम', 'पनकी ', 'नानकारी ', 
    'आंबेडकर नगर काकादेव ', 'काकादेव ', 'अशोक नगर'
  ],


  // Feature Toggles (True to enable, False to hide)
  features: {
    recentNews: true,
    recentVideos: false,
    pressRelease: false,
    padavedan: true,
  }
};


export default siteConfig;

