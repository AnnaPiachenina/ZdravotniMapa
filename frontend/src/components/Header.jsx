import React, { useState } from 'react';
import { BiPlusMedical } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { PiListBold } from "react-icons/pi";

const Header = ({ onSideBar, onSearch, searchQuery, points, onSuggestion }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filterSuggestions = points.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery!== ''
  );

  return (
    <div className='flex md:flex-row flex-col lg:px-10 md:px-5 px-4 md:py-4 py-3 gap-1 items-center shadow-xl justify-between relative'>

      {/* leva strana */}
      <div className='flex flex-col w-full md:w-auto relative'>
        <div className='flex gap-1.5 items-center w-full'>
          <button title="Seznam jednotek" onClick={onSideBar} className='hover:text-green-900 text-green-700'>
            <PiListBold className='md:size-9 size-6 mt-1 mb-1' />
          </button>
          <div className='relative w-full'>
            <FaSearch className='absolute right-3 top-2.5 text-gray-400 md:size-5 size-3' />
            <div>
                <input
                placeholder="Vyhledávání"
                value={searchQuery}
                onChange={(e) => {
                    onSearch(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className='bg-white rounded-md focus:outline-none lg:w-lg md:w-sm w-full md:h-10 h-8 border border-gray-300 pl-3 pr-10'
                />

                {showSuggestions && filterSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50 pb-1">
                        {filterSuggestions.map((point, index) => (
                        <li
                            key={index}
                            onClick={() => {
                            onSuggestion(point.name);
                            setShowSuggestions(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 md:h-10 h-8"
                        >
                            {point.name}
                        </li>
                        ))}
                    </ul>
                )}

            </div>
          </div>
        </div>
      </div>

      {/* prava starna */}
      <div className='flex gap-1 items-center mt-2 md:mt-0 text-green-700'>
        <BiPlusMedical className='md:size-11 size-8' />
        <h1 className='text-green-700 lg:text-4xl md:text-3xl text-2xl font-semibold'>
          Zdravotní mapa
        </h1>
      </div>
    </div>
  );
};

export default Header;
