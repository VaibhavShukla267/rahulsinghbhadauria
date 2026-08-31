import AboutHome from "@/components/AboutHome";
import Banner_below_options from "@/components/banner_below_options";
import Container from "@/components/Container";
import GoogleTranslate from "@/components/GoogleTranslate";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import TwitterWidget from "@/components/TwitterWidget";
import RecentImages from "@/components/RecentImages";
import RecentNews from "@/components/RecentNews";
import RecentVideos from "@/components/RecentVideos";
import PressReleaseModal from "@/components/PressReleaseModal";
import siteConfig from "@/config/siteConfig";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <Banner_below_options/>
        <AboutHome/>
        {siteConfig.features.recentNews && <RecentNews />}
        {siteConfig.features.pressRelease && <PressReleaseModal />}
        {siteConfig.features.recentVideos && <RecentVideos />}
        <RecentImages/>
        <TwitterWidget/>
      </Container>
    </div>
  );
}

