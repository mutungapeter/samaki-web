{/* second nav holding categories div */}
      {/* <div className="fixed w-full top-[70px] left-0 z-30 transition hidden lg:flex items-center justify-between bg-white lg:h-[50px]">
        <div className=" w-11/12 mx-auto flex items-center relative justify-between ">
          <div className="w-64 relative h-[60px] mt-[10px]  hidden lg:block bg-white  shadow-md rounded-md ">
            <div className="text-white w-full flex items-center font-bold p-2 bg-[#DD3131]">
              <HiMenuAlt2 color="white" />
              <span className="text-white">Categories</span>
            </div>
            <ul className="space-y-2 text-black p-4 bg-[#fff] absolute z-30 w-64 rounded-b-md shadow-sm cursor-pointer">
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Fish Types
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Preparation Styles
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Specialty Dishes
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Accompaniments/Sides
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Sauces and Seasonings
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Customizable Options
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Combo Meals
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Beverages
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Desserts
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Seasonal Specials
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      {/* <div className="fixed w-full hidden  lg:flex items-center justify-between bg-white lg:h-[50px] top-[70px] left-0 z-30 transition px-14">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="relative group"
          >
            <button
              className={`py-2 px-4 text-sm font-medium text-gray-700 hover:text-[#DD3131] ${
                hoveredCategory === index ? "text-[#DD3131]" : ""
              }`}
            >
              {category.name}
            </button>
            {hoveredCategory === index && (
              <div className="absolute left-0 w-48 bg-white border rounded-md shadow-lg p-3 mt-1">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link key={subIndex} href={`/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      {subcategory.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div> */}

{/* <div className="w-full top-[70px] left-0 z-20 transition hidden lg:flex items-center justify-between bg-white h-[50px]">
        <div className="w-11/12 mx-auto flex items-center relative justify-between">
          <div className="w-64 relative max-h-[60px] mt-[10px] hidden lg:block bg-white shadow-md rounded-md"
          ref={categoriesRef}
          >
            <div className="text-white w-full flex items-center font-bold p-2 bg-[#DD3131]">
              <HiMenuAlt2 color="white" />
              <span className="text-white">MENU</span>
            </div>
            <ul className="space-y-2 text-black p-4 bg-[#fff] absolute z-30 w-64 rounded-b-md shadow-sm cursor-pointer">
              {categoriesData.map((category, index) => (
                <li
                  key={index}
                  className="text-sm font-light hover:font-medium hover:text-[#DD3131] cursor-pointer p-1 border-b"
                  onMouseEnter={() => setHoveredCategory(index)}
                >
                  {category.name}
                  {hoveredCategory === index && (
                    <div className="absolute flex flex-col left-full top-0   bg-white border rounded-md shadow-lg p-3 mt-1 z-50">
                      <h2 className="text-lg text-black font-bold border-b pb-2 mb-2">
                        {category.name}
                      </h2>
                      <div className=" max-h-[500px] w-full h-[370px] p-8 flex gap-6 justify-between">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            href={`/${subcategory.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            <div
                              className="flex flex-col gap-4 
                           hover:text-[#DD3131] cursor-pointer
                            transition ease-in-out
                       delay-150 
                       hover:-translate-y-1 
                       hover:scale-110
                        duration-300
                        
                           "
                            >
                              <div className="w-[70px] h-[70px]  rounded-md overflow-hidden">
                                <Image
                                  src={subcategory.image}
                                  height={70}
                                  width={70}
                                  alt={subcategory.name}
                                  className=" w-[70px] h-[70px] object-cover"
                                />
                              </div>
                              <span className="text-sm font-light text-black hover:text-[#DD3131]">
                                {subcategory.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}