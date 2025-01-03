"use client";
import useSWR from "swr";
import { scannersData } from "@/app/seed/seedScannersData"; // Veriyi doğrudan import ediyoruz

// Mimic Data
// const fetcher = (url) => fetch(url).then((r) => r.json());
const fetcher = () => scannersData;

export default function Home() {
  const { data, error, isLoading } = useSWR("scannersData", fetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error || !data) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Scanners List</h1>
      <ul>
        {data.map((scanner: { name: string; slug: string }) => (
          <li key={scanner.slug}>{scanner.name}</li>
        ))}
      </ul>
    </div>
  );
}
