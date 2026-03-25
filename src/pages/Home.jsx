import Hero from '../components/home/Hero';
import SearchBox from '../components/home/SearchBox';
import FeaturedTours from '../components/home/FeaturedTours';
import Destinations from '../components/home/Destinations';

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBox />
      <FeaturedTours />
      <Destinations />
    </>
  );
}
