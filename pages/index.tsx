import Link from "next/link";
import Head from "next/head";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>SimpleCRM - Manage Your Customers With Ease</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="text-xl font-bold">SimpleCRM</div>
          <div className="space-x-4">
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Manage Your Customers With Ease
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-6">
            SimpleCRM helps you keep track of your customer relationships in one intuitive dashboard.
          </p>
          <Link href="/signup">
            <span className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
              Get Started
            </span>
          </Link>
        </header>

        {/* Features Section */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">🔍 Easy Customer Management</h3>
              <p>Quickly add, edit, and search your customer data.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📊 Dashboard Insights</h3>
              <p>Visualize your CRM data with an easy-to-use dashboard.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🔐 Secure & Reliable</h3>
              <p>Built with security and performance in mind using Supabase.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-4">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} SimpleCRM. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
