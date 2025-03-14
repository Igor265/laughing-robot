"use client";

import {Input} from "@/components/ui/input";
import {useRef, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SearchIcon} from "lucide-react";

export default function SearchProductInput({ page }: { page: number }) {

  const [searchTerm, setSearchTerm] = useState("");
  const searchButtonRef = useRef<HTMLAnchorElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchButtonRef.current?.click();
    }
  };


  return (
    <div className="flex items-center gap-x-2 p-4">
      <Input
        type="text"
        placeholder="Buscar produtos..."
        className="w-full dark:bg-gray-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
      <Button asChild variant="outline" size="icon">
        <Link href={`/public?page=${page}&product=${searchTerm}`} ref={searchButtonRef}>
          <SearchIcon />
        </Link>
      </Button>
    </div>
  );
}