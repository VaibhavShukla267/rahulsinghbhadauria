// Centralized Local Data for Photos, Videos, and News

export const galleryImages = [
  "/galaryImage/RSB%20IG%201.png",
  "/galaryImage/RSB%20Story.png",
  "/galaryImage/RSB.png",
  "/galaryImage/Abdul%20kalam.png",
  "/galaryImage/Bhagat%20singh.png",
  "/galaryImage/AtalBihari.png",
  "/president.png"
];



export const galleryVideos = [
  {
    id: 1,
    title: "Official Video Highlight",
    videoUrl: "/banner.mp4",
  },
];

export const galleryNews = [
  {
    id: 1,
    title: "समाचार पत्र कवरेज - सामाजिक न्याय एवं जनसेवा अभियान",
    summary: "समाचार पत्रों में राहुल सिंह भदौरिया के जनसेवा एवं सामाजिक सुधार अभियानों की प्रमुखता से कवरेज।",
    mediaUrl: "/galaryNews/newspaper1.png",
    mediaType: "image",
    thumbnailUrl: "/galaryNews/newspaper1.png",
    link: "#",
  },
  {
    id: 2,
    title: "समाचार पत्र कवरेज - युवा विकास एवं जनसमस्या निस्तारण",
    summary: "क्षेत्रीय विकास एवं जनसमस्याओं के निस्तारण हेतु चलाए गए अभियानों पर विशेष प्रेस रिपोर्ट।",
    mediaUrl: "/galaryNews/newspaper2.png",
    mediaType: "image",
    thumbnailUrl: "/galaryNews/newspaper2.png",
    link: "#",
  },
  {
    id: 3,
    title: "समाचार पत्र कवरेज - जनसंवाद एवं समाज कल्याण",
    summary: "जनसंवाद कार्यक्रमों एवं राहत सामग्री वितरण गतिविधियों की समाचार पत्र कवरेज।",
    mediaUrl: "/galaryNews/newspaper3.png",
    mediaType: "image",
    thumbnailUrl: "/galaryNews/newspaper3.png",
    link: "#",
  },
];




// Helper functions for async component compatibility
export const getImages = async () => {
  return galleryImages;
};

export const getVideos = async () => {
  return galleryVideos;
};

export const getNews = async () => {
  return galleryNews;
};
