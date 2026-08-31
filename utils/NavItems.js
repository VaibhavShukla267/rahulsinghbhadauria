import { useEffect, useState } from "react";
import { BookOpen, Contact, Home, Image, FileUser } from "lucide-react";
import { t, languageService } from "@/utils/languageService"; // Import languageService
import siteConfig from "@/config/siteConfig";

const generateNavItems = () => {
    // Gallery content array constructed dynamically based on toggles
    const galleryContent = [
        {
            name: t("gallery.photoGallery"),
            link: "/gallery/images"
        }
    ];

    if (siteConfig.features.recentVideos) {
        galleryContent.push({
            name: t("gallery.videoGallery"),
            link: "/gallery/videos"
        });
    }

    if (siteConfig.features.recentNews) {
        galleryContent.push({
            name: t("gallery.newsGallery"),
            link: "/gallery/news"
        });
    }

    if (siteConfig.features.pressRelease) {
        galleryContent.push({
            name: t("gallery.pressRelease"),
            link: "/gallery/pressrelease"
        });
    }

    const items = [
        {
            name: t("common.home"),
            icon: <Home className="w-4 relative -top-0.5" />,
            link: "/",
            content: null
        },
        {
            name: t("common.about"),
            icon: <BookOpen className="w-4 relative -top-0.5" />,
            link: "/about",
            content: [
                {
                    name: t("about.aboutOrg"),
                    link: "/about/organisation"
                },
                {
                    name: t("about.ideology"),
                    link: "/about/ideology"
                },
                {
                    name: t("about.leadership"),
                    link: "/about/leadership"
                },
            ]
        },
        {
            name: t("common.gallery"),
            link: null,
            icon: <Image className="w-4 relative -top-0.5" />,
            content: galleryContent
        },
        {
            name: t("common.contact"),
            icon: <Contact className="w-4 relative -top-0.5" />,
            link: "/contact",
            content: null
        },
        {
            name: t("common.grivences"),
            icon: <FileUser className="w-4 relative -top-0.5" />,
            link: "/grivences",
            content: null
        }
    ];

    return items;
};


const NavItems = () => {
    const [navItems, setNavItems] = useState(generateNavItems);
    const [language, setLanguage] = useState(languageService.getCurrentLanguage());

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(languageService.getCurrentLanguage());
            setNavItems(generateNavItems());
        };

        const unsubscribe = languageService.subscribe(handleLanguageChange);

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setNavItems(generateNavItems());
    }, [language]);

    return navItems;
};

export default NavItems;