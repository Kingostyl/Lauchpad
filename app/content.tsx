"use client";
import React, { useRef, useState } from "react";
import Images from "./components/image";
import ImageAPI from "@/api/image.json";
import "swiper/css/pagination";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";


const Content = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  const [searchlauchpad, serSearchlauchpad] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    serSearchlauchpad(event.target.value);
    setIsSearching(!!event.target.value);
  };

  const allData = [...ImageAPI];

  const filteredData = allData.filter((item) =>
    item.caption.toLowerCase().includes(searchlauchpad.toLowerCase())
  );

  const itemsPerPage = 33;
  const page1Data = filteredData.slice(0, itemsPerPage);
  const page2Data = filteredData.slice(itemsPerPage, itemsPerPage * 2);

  return (
    <>
      <header className="relative z-50 flex justify-center top-3 bottom-10 right-0 left-0">
        <nav>
          <div className="relative w-64">
            <span className="fill-white absolute top-0 bottom-0 items-center flex left-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14px"
                height="44px"
                viewBox="0 0 15 44"
              >
                <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
              </svg>
            </span>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              value={searchlauchpad}
              onChange={changeSearch}
              className="pl-8 outline-none inpt-sch font-light bg-slate-800/5 border-[1.1px] border-white/40 rounded-md"
            />
          </div>
        </nav>
      </header>

      <main className="w-full">
        <Swiper
          pagination={isSearching ? false : pagination}
          modules={[Pagination, Mousewheel]}
          mousewheel={true}
          direction={"horizontal"}
          className="mySwiper"
          speed={1000}
        >
          {filteredData.length === 0 ? (
            <p className="fixed left-0 right-0 font-extralight text-white/50 text-7xl top-0 bottom-0 flex justify-center items-center">
              No Result
            </p>
          ) : (
            <>
              <SwiperSlide>
                <section className="grid grid-cols-7 gap-y-6 pt-6 mx-10  items-baseline justify-items-center">
                  {isSearching
                    ? filteredData.map((image, index) => (
                        <Images
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          priority
                          width={90}
                          height={90}
                          caption={image.caption}
                        />
                      ))
                    : page1Data.map((image, index) => (
                        <Images
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          priority
                          width={90}
                          height={90}
                          caption={image.caption}
                        />
                      ))}
                </section>
              </SwiperSlide>
              <SwiperSlide>
                <section className="grid grid-cols-7 gap-y-6 p-5 mx-10 justify-items-center">
                  {isSearching
                    ? filteredData.map((image, index) => (
                        <Images
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          priority
                          width={90}
                          height={90}
                          caption={image.caption}
                        />
                      ))
                    : page2Data.map((image, index) => (
                        <Images
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          priority
                          width={90}
                          height={90}
                          caption={image.caption}
                        />
                      ))}
                </section>
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </main>
    </>
  );
};

export default Content;
