import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import StartHere from '@/components/StartHere';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <main className="relative">
        <Hero />
        <StartHere />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
