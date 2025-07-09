export default function PortfolioPage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Taylor Mohney
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Software Engineer & Researcher
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Building modern applications and conducting research in quantization theory and machine learning optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#experience" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Experience
            </a>
            <a 
              href="/cv.pdf" 
              target="_blank"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Professional Experience
          </h2>
          <div className="space-y-8">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Experience timeline will be implemented here
            </p>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Research & Publications
          </h2>
          <div className="space-y-8">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Research publications will be displayed here
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
              Professional certifications grid will be implemented here
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
              Project showcase will be implemented here
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Get In Touch
          </h2>
          <div className="text-center space-y-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities, research collaborations, or interesting projects.
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:contact@youngmohney.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/taylormohney" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/CatsMeow492" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 