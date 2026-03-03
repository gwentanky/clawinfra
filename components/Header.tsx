'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" width={60} height={60} alt="Logo" />
            <span className="text-2xl text-foreground hover:text-primary transition-colors font-heading">
              ClawInfra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden text-xl md:flex items-center space-x-8 font-heading">
            <Link
              href="/#features"
              className="text-foreground hover:text-primary/80 transition-colors"
            >
              Features
            </Link>
            <Link
              target="_blank"
              href="https://docs.clawinfra.dev"
              className="text-foreground hover:text-primary/80 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/gwentanky/clawinfra"
              target="_blank"
              className="text-foreground hover:text-primary/80 transition-colors"
            >
              GitHub
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="text-foreground hover:text-primary/80 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="https://docs.clawinfra.dev"
                target="_blank"
                className="text-foreground hover:text-primary/80 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="https://github.com/gwentanky/clawinfra"
                target="_blank"
                className="text-foreground hover:text-primary/80 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </Link>
              <Link
                href="mailto:contact@clawinfra.dev"
                className="text-foreground hover:text-primary/80 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
