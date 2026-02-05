import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FundamentalAnalysis } from './components/FundamentalAnalysis';
import { Products } from './components/Products';
import { Reviews } from './components/Reviews';
// import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <Partners />
        <FundamentalAnalysis />
        <Products />
        <Reviews />
        {/* <Pricing /> */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;
