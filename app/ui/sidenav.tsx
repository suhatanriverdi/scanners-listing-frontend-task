"use client";

import NavLinks from "@/app/ui/navLinks";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SideNav() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-sky-100 dark:bg-gray-950 md:h-40">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={
              resolvedTheme === "dark" ? "/s4e-dark.webp" : "/s4e-light.webp"
            }
            alt="logo"
            width={265}
            height={102}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-950 md:block"></div>
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-sky-700 dark:hover:text-sky-300 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6 text-gray-900 dark:text-gray-200" />
          <div className="hidden md:block text-gray-900 dark:text-gray-200">
            Sign Out
          </div>
        </button>
      </div>
    </div>
  );
}
