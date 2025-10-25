import DecorativeCircle from "@/components/decorative/DecorativeCircle";
import WavyBackground from "@/components/decorative/WavyBackground";
import FeatureCard from "@/components/cards/FeatureCard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Link } from "react-router";
import { Shield, Ticket, Zap } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100 pb-32 pt-20">
        <DecorativeCircle
          className="absolute -right-12 -top-12 opacity-50"
          size="xl"
          color="bg-blue-300"
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
              Welcome to <span className="text-blue-600">TicketFlow</span>
            </h1>
            <p className="mb-8 text-xl text-gray-700 sm:text-2xl">
              Streamline your ticket management with powerful tools and
              intuitive workflows
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/auth/login"
                className="rounded-lg border-2 border-blue-600 bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <WavyBackground />
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <DecorativeCircle
          className="absolute -left-20 bottom-10 opacity-30"
          size="lg"
          color="bg-indigo-200"
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Why Choose TicketFlow?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Ticket size={48} />}
              title="Easy Ticket Management"
              description="Create, update, and track tickets with an intuitive interface designed for efficiency."
            />
            <FeatureCard
              icon={<Zap size={48} />}
              title="Lightning Fast"
              description="Built with modern technologies for optimal performance and seamless user experience."
            />
            <FeatureCard
              icon={<Shield size={48} />}
              title="Secure & Reliable"
              description="Your data is protected with industry-standard security measures and best practices."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
