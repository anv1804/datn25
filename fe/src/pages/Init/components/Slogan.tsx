
const Slogan = () => {
    const listSlogan = [
        "Bảo mật",
        "Công nghệ số",
        "Linh hoạt",
        "Dễ tiếp cận"
    ]
    return (
        <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                <h3 className="text-4xl font-bold text-white">
                    TCLASS - Hệ thống quản lý giáo dục
                </h3>
                <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {listSlogan?.map((item: String) => (
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white">
                                {item}
                            </span>
                        </li>
                    ))}


                </ul>
            </div>
        </div>
    )
}

export default Slogan
