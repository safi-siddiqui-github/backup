'use client';

import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import CardFourComponent, { CardFourProps } from "./CardFourComponent";
import { shopData } from "@/utils/data";
import { SlidersHorizontal } from "lucide-react";

export type ShopDataTypeExtended = CardFourProps & {
  subCategories: string[];
};

type FilterMenuType = {
  category: string;
  title: string;
  options: string[];
}

export default function ShopClientComponent() {

  const searchParams = useSearchParams();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [shopPageData, setShopPageData] = useState<ShopDataTypeExtended[]>([]);
  const [filterMenu, setFilterMenu] = useState<FilterMenuType[]>([]);

  const isChecked = useCallback((category: string, eachOption: string): boolean => {
    if (searchParams.size > 0) {
      const categoryExists = searchParams.has(category);
      if (categoryExists) {

        const searchParamsCC: string[] = searchParams.getAll(category);
        if (searchParamsCC.includes(eachOption)) {
          // console.log(searchParamsCC, eachOption);
          return true;
        }
      }
    }

    return false;
  }, [searchParams]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.form?.requestSubmit();
  }, []);

  const hideFilterMenu = useCallback(() => {
    setShowFilterMenu(false);
  }, []);

  const toggleFilterMenu = useCallback(() => {
    setShowFilterMenu(prevShowFilterMenu => !prevShowFilterMenu);
  }, []);

  useEffect(() => {
    if (window.visualViewport?.width) {
      if (window.visualViewport.width > 640) {
        setShowFilterMenu(true);
      }
    }
  }, []);

  const generateFilterMenu = useCallback((data: ShopDataTypeExtended[]): FilterMenuType[] => {
    if (data.length === 0) {
      return []; // Return empty array if data is empty
    }

    const newFilterMenu: FilterMenuType[] = [];

    const uniqueCategories = Array.from(
      new Set(data.map(item => item.category.toLowerCase()))
    );

    newFilterMenu.push({
      category: "category",
      title: "Category",
      options: uniqueCategories,
    });

    const uniqueSubCategories = Array.from(
      new Set(data.flatMap(item => item.subCategories.map(sub => sub.toLowerCase())))
    );

    newFilterMenu.push({
      category: "subcategory",
      title: "Sub Category",
      options: uniqueSubCategories,
    });

    const uniqueColors = Array.from(
      new Set(data.flatMap(item => item.color.map(color => color.toLowerCase())))
    );

    newFilterMenu.push({
      category: "color",
      title: "Color",
      options: uniqueColors,
    });

    return newFilterMenu;
  }, []);

  const firstUppercase = useCallback((text: string): string => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1, text.length)
  }, []);

  useEffect(() => {
    if (shopData.length > 0) {
      setFilterMenu(generateFilterMenu(shopData));
    }
  }, [generateFilterMenu]);

  const filterShopData = useCallback(() => {
    if (searchParams.size > 0) {
      const filteredSet = new Set<string>();
      const filtered = shopData.filter(({ id, category, subCategories, color }) => {
        const categoryExists = searchParams.has('category');
        const colorExist = searchParams.has("color");

        let categoryMatch = false;
        let subCategoryMatch = false;
        let colorMatch = false;

        if (categoryExists) {
          const searchParamsCC: string[] = searchParams.getAll('category').map(item => item.toLowerCase());
          categoryMatch = searchParamsCC.includes(category.toLowerCase());
        }

        if (searchParams.has('subcategory')) { // Check for 'subcategory' key
          const searchParamsSC: string[] = searchParams.getAll('subcategory').map(item => item.toLowerCase());
          subCategoryMatch = subCategories.some((sub: string) => searchParamsSC.includes(sub.toLowerCase()));
        }

        if (colorExist) {
          const searchColors: string[] = searchParams.getAll("color").map(c => c.toLowerCase());
          colorMatch = color.some((c: string) => searchColors.includes(c.toLowerCase()));
        }

        if ((categoryMatch || subCategoryMatch || colorMatch) && !filteredSet.has(id)) {
          filteredSet.add(id);
          return true;
        }
        return false;
      });

      return filtered.length > 0 ? filtered : [];
    }

    return shopData;
  }, [searchParams]);

  useEffect(() => {
    setShopPageData(filterShopData());
  }, [searchParams, filterShopData]);


  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Shop</p>
          <p className="">&#40; {shopPageData.length} &#41; results</p>
        </div>

        <button
          type={"button"}
          className="flex items-center bg-black rounded px-4 py-2 gap-2 text-white font-medium xl:text-base rtd"
          onClick={toggleFilterMenu}
        >
          Filters
          <SlidersHorizontal className="size-5" />
        </button>

      </div>


      <div className="flex gap-5 relative">

        <div
          className={`absolute sm:relative top-0 left-0 backdrop-blur-sm sm:backdrop-blur-0 h-full rtd ${showFilterMenu ? 'w-full sm:w-60' : 'w-0'}`}
          onClick={hideFilterMenu}
        >
          <div
            className={`flex flex-col gap-4 bg-white pb-6 rounded-br overflow-hidden rtd ${showFilterMenu ? 'w-full' : 'w-0'}`}
            onClick={(e: SyntheticEvent) => { e.stopPropagation() }}
          >

            <Form action={'/nike/shop'} className="flex flex-col gap-4" scroll={false}>
              {
                filterMenu.map(({ category, title, options }, index) => (
                  <div key={`${category}-${index}`} className="flex flex-col gap-2">

                    <p className="text-xl font-medium">{firstUppercase(title)}</p>
                    <div className="flex flex-col items-start">
                      {options.map((eachOption, optionIndex) => (
                        <label
                          key={`${category}-${eachOption}-${optionIndex}`}
                          className="flex gap-2 items-center"
                        >
                          <input
                            type="checkbox"
                            className="size-5"
                            name={category}
                            value={eachOption}
                            onChange={handleInputChange}
                            defaultChecked={isChecked(category, eachOption)}
                          />
                          <span className="text-lg">{firstUppercase(eachOption)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              }
            </Form>
          </div>

        </div>

        <div className={`flex-1 grid grid-cols-1 place-content-start rtd gap-5 ${showFilterMenu ? 'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {
            shopPageData.map((eachShopDataItem, index) => (
              <CardFourComponent key={`shopData-${index}`} cardFourData={eachShopDataItem} />
            ))
          }
        </div>

      </div>

    </div>
  )
}