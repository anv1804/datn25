import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LandingHeader = () => {
    const [hamburger, setHamburger] = useState(false)

    const toggleMenu = () => {
        setHamburger(!hamburger)
    }

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* lg+ */}
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex">
                            <img
                                className="w-auto h-8 lg:h-10"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                                alt=""
                            />
                        </a>
                    </div>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex p-2 text-black transition-all duration-300 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                    >
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ease-in-out ${hamburger ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8h16M4 16h16"
                            />
                        </svg>
                        <svg
                            className={`absolute w-6 h-6 transition-transform duration-300 ease-in-out ${hamburger ? 'rotate-0 scale-100' : '-rotate-180 scale-0'
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        <Link
                            to={`/tin-tuc`}
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            Tin Tức
                        </Link>
                        <Link
                            to={'/thoi-khoa-bieu'}
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            Thời Khóa Biểu
                        </Link>
                        <a
                            href="#"
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            {" "}
                            Resources{" "}
                        </a>
                        <a
                            href="#"
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            {" "}
                            Pricing{" "}
                        </a>
                    </div>
                    <Link
                        to={`/admin`}
                        title=""
                        className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
                        role="button"
                    >
                        Cộng tác viên
                    </Link>
                </nav>
                {/* xs to lg */}
                <div
                    className={`overflow-hidden transition-[height] duration-300 ease-in-out lg:hidden
                        ${hamburger ? 'h-[280px]' : 'h-0'}`}
                >
                    <nav className={`pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md
                        transition-all duration-300 ease-in-out transform
                        ${hamburger
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-2'
                        }`}
                    >
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                <a
                                    href="#"
                                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 
                                        hover:text-blue-600 focus:text-blue-600 hover:translate-x-2"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 
                                        hover:text-blue-600 focus:text-blue-600 hover:translate-x-2"
                                >
                                    Solutions
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 
                                        hover:text-blue-600 focus:text-blue-600 hover:translate-x-2"
                                >
                                    Resources
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 
                                        hover:text-blue-600 focus:text-blue-600 hover:translate-x-2"
                                >
                                    Pricing
                                </a>
                            </div>
                        </div>

                        <div className="px-6 mt-6">
                            <Link
                                to={`/admin`}
                                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white 
                                    transition-all duration-300 bg-blue-600 border border-transparent rounded-md 
                                    hover:bg-blue-700 focus:bg-blue-700 hover:scale-105"
                                role="button"
                            >
                                Cộng tác viên
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default LandingHeader
