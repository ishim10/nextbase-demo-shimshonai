/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uVG77qDcbLd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Solving Specific Business Challenges with AI
              </h1>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl text-gray-600 dark:text-gray-300">
                From Data to Results — Fast, Accurate, and Secure
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center">
            <div className="max-w-3xl mx-auto text-center">
              <ul className="space-y-6">
                <li className="flex flex-col items-center space-y-2">
                  <h3 className="text-xl font-bold mb-1">
                    Targeted Business Solutions
                  </h3>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl">
                    We focus on clearly defined business challenges—be it demand forecasting, logistics optimization, or customer experience personalization.
                  </p>
                </li>
                <li className="flex flex-col items-center space-y-2">
                  <h3 className="text-xl font-bold mb-1">
                    Integration of Multiple AI Models for a Single Task
                  </h3>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl">
                    To achieve optimal results, we combine several specialized AI models, each addressing a specific aspect of the overall task.
                  </p>
                </li>
                <li className="flex flex-col items-center space-y-2">
                  <h3 className="text-xl font-bold mb-1">
                    Multi-Agent Systems for Complex Solutions
                  </h3>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl">
                    Our multi-agent systems enable AI agents to interact and coordinate actions, providing more effective and flexible solutions to complex problems.
                  </p>
                </li>
                <li className="flex flex-col items-center space-y-2">
                  <h3 className="text-xl font-bold mb-1">
                    Rapid Results
                  </h3>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl">
                    Through process automation and ready-made solutions, you receive outcomes in the shortest possible time.
                  </p>
                </li>
                <li className="flex flex-col items-center space-y-2">
                  <h3 className="text-xl font-bold mb-1">
                    Security and Transparency
                  </h3>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl">
                    We utilize Supabase for reliable authentication and data management, ensuring security at every stage.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-950 text-gray-50 mt-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to transform your business with AI?
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
