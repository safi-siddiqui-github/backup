'use client';

import { NikeSearchBarEventEmitter } from "@/lib/nike/events";
import { CircleX, LoaderCircle, Search } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { searchData } from "@/lib/nike/constants/data";

export type SearchResultType = {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
}

// Constants
const DEBOUNCE_DELAY = 2000;

export default function NikeSearchBarModalComponent() {

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

  // Modal Functions
  const openSearchBar = useCallback(() => setShowSearchBar(true), []);
  const closeSearchBar = useCallback(() => setShowSearchBar(false), []);

  useEffect(() => {
    if (NikeSearchBarEventEmitter) {
      NikeSearchBarEventEmitter.on("openSearchBar", openSearchBar);
      return () => {
        NikeSearchBarEventEmitter.off("openSearchBar", openSearchBar
        )
      };
    }
  }, [openSearchBar]);

  // Utility Functions
  const normalizeText = useCallback((text: string) => text.toLowerCase(), []);

  const getUniqueWords = useCallback((searchArray: SearchResultType[]) => {
    return Array.from(
      new Set(
        searchArray.flatMap(item =>
          `${item.title} ${item.category}`.split(' ')
        ).map(normalizeText)
      )
    );
  }, [normalizeText]);

  const filterSearchResults = useCallback((searchArray: SearchResultType[], term: string) => {
    return searchArray.filter(({ title, category, price }) => {
      return normalizeText(title).includes(term)
        || normalizeText(category).includes(term)
        || (!isNaN(Number(term)) && Number(price) <= Number(term));
    });
  }, [normalizeText]);

  // Debounce Hook
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  // Input Function
  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != '') {
      setIsTyping(true);
      setSearchTerm(event.target.value);
    } else {
      setIsTyping(false);
    }
  }, []);

  // Search Functions
  const popularSearchesFN = useCallback((searchArray: SearchResultType[]) => {
    setPopularSearches(getUniqueWords(searchArray));
  }, [getUniqueWords]);

  const searchResultsFN = useCallback(() => {
    const results = filterSearchResults(searchData, normalizeText(debouncedSearchTerm));
    setSearchResults(results);
    popularSearchesFN(results.length ? results : searchData);
  }, [debouncedSearchTerm, normalizeText, filterSearchResults, popularSearchesFN]);

  // Re render on debounced
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchResultsFN();
    }
    setIsTyping(false);
  }, [debouncedSearchTerm, searchResultsFN, setIsTyping]);

  // Default Render
  useEffect(() => {
    popularSearchesFN(searchData);
  }, [popularSearchesFN]);

  const handleSearch = (formData: FormData) => {

    const search = formData.get('search') as string;
    if (search != '') {
      // Do the follwing
    }
  }

  return (
    <div
      className={`absolute z-20 w-full h-full backdrop-blur-sm items-start justify-center ${showSearchBar ? 'flex' : 'hidden'}`}
      onClick={closeSearchBar}
    >

      <div
        className=" bg-white pt-6 sm:pt-10 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-6 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl rounded-b min-h-fit shadow-2xl"
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
      >

        <div className="flex justify-between">
          <p className="text-xl font-medium">Search</p>

          <button onClick={closeSearchBar}>
            <CircleX className="size-6" />
          </button>
        </div>

        <form action={handleSearch} className="border rounded flex items-center px-2 py-1 overflow-hidden">
          {
            isTyping
              ? (<LoaderCircle className="size-6 animate-spin" />)
              : (<Search className="min-w-6" />)
          }

          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="px-2 py-1 outline-none flex-1"
            onChange={handleChangeInput}
          />
        </form>

        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-4">

            <div className="flex gap-2 items-center">
              <p className="font-medium">Popular Searches</p>
              {isTyping && (<p className="font-medium animate-pulse">searching...</p>)}
            </div>

            <div className="flex flex-wrap gap-2">
              {
                popularSearches
                  .map((eachSearch, index) => (<Link key={index} href={'/nike'} className="px-2 py-1">{eachSearch}</Link>))
              }
            </div>
          </div>

          <div className="flex flex-col gap-4">

            <div className="flex gap-2 items-center">
              <p className="font-medium">Products</p>
              {isTyping && (<p className="font-medium animate-pulse">searching...</p>)}
            </div>

            <div className="gap-2 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {
                searchResults
                  .map(({ id, title, price, category, image }) => (
                    <div key={id} className="flex items-center gap-4">

                      <Image width={120} height={120} src={image} style={{ objectFit: 'cover' }} alt={title} className="w-28 h-28 rounded" />

                      <div className="flex flex-col items-start gap-2">
                        <Link href={'/nike'} className="font-medium hover:underline text-2xl tracking-tight line-clamp-1">
                          {title}
                        </Link>

                        <Link href={'/nike'} className="hover:underline ">
                          {category}
                        </Link>

                        <p className="font-medium lining-nums text-2xl">
                          ${price}
                        </p>

                      </div>

                    </div>
                  ))
              }

              <p className={`font-light ${searchResults.length != 0 && 'hidden'}`}>Explore suggestions</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}