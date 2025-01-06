import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full rounded-md p-6 sm:p-10 gap-16 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to S4E Security Tools
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Run free cybersecurity tools to enhance your security posture.
        </p>
      </header>

      <main className="text-center max-w-xl">
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
          Empower your applications with comprehensive scans and insights, from
          SSL checks to network vulnerability assessments.
        </p>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
          Visit the Scanners page to explore and execute security tools for your
          assets.
        </p>
      </main>

      <footer className="text-center">
        <Link
          href="/scanners"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-base sm:text-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
        >
          Go to Scanners
        </Link>
      </footer>
    </div>
  );
}
