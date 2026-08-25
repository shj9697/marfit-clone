import SliderItems from '../component/SliderItems';
import Banner from '../component/Banner';
import SliderItems1 from '../component/SliderItems1'
import Banner2 from '../component/Banner2';
import SliderItem3 from '../component/SliderItem3';
import AboutUs from '../component/AboutUs';
import SliderItems4 from '../component/SliderItems4';
import HeroSection from '../component/HeroSection';
import SliderItems5 from '../component/SliderItems5';
import { useEffect, useState } from 'react';
import { getHomePageContentAPI } from '../api/home';

function Home() {

  const [homePageContent, setHomePageContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getHomePageContentAPI();
        if (!cancelled) setHomePageContent(data.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <p>Loading......</p>
  }
  if (error) {
    return <p>Error : {error}</p>
  };


  return (
    <div className="w-full">
      <HeroSection banner={homePageContent?.banners?.hero} />
      <SliderItems />
      <Banner imgUrl={homePageContent?.banners?.["mid-1"]?.imageUrl} path={homePageContent?.banners?.["mid-1"]?.linkUrl} />
      <SliderItems1 />
      <Banner2 imgUrl={homePageContent?.banners?.["mid-2"]?.imageUrl} path={homePageContent?.banners?.["mid-2"]?.linkUrl} />
      <SliderItem3 />
      <AboutUs leftContent={homePageContent?.banners?.["mid-3"]?.left} rightContent={homePageContent?.banners?.["mid-3"]?.right} />
      <SliderItems4 />
      <Banner2 imgUrl={homePageContent?.banners?.["mid-4"]?.imageUrl} path={homePageContent?.banners?.["mid-4"]?.linkUrl} />
      <SliderItems5 />
    </div>
  )
}

export default Home;