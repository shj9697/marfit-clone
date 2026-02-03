import SliderItems from '../component/SliderItems';
import Banner from '../component/Banner';
import SliderItems1 from '../component/SliderItems1'
import Banner2 from '../component/Banner2';
import SliderItem3 from '../component/SliderItem3';
import Main1 from '../component/main1';
import SliderItems4 from '../component/SliderItems4';
import Banner3 from '../component/Banner3';
import HeroSection from '../component/HeroSection';
import SliderItems5 from '../component/SliderItems5';

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <SliderItems />
      <Banner />
      <SliderItems1 />
      <Banner2 />
      <SliderItem3 />
      <Main1 />
      <SliderItems4 />
      <Banner3 />
      <SliderItems5 />
    </div>
  )
}

export default Home;