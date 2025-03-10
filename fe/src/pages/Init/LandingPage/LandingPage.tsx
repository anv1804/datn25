import '../styles/landingpage.scss';
import Logo from '../../../assets/images/logos/logo2.png';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';

const LandingPage = () => {
    return (
        <div className="bg-white">
            <LandingHeader />
            <section className="bg-[#FCF8F1] bg-opacity-30 ">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                                A social media for learners
                            </p>
                            <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                                Connect &amp; learn from the experts
                            </h1>
                            <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                                Grow your career fast with right mentor.
                            </p>
                            <Link
                                to={`/`}
                                title=""
                                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-400 rounded-full lg:mt-16 hover:bg-yellow-500 focus:bg-yellow-500"
                                role="button"
                            >
                                Bắt đầu ngay
                                <svg
                                    className="w-6 h-6 ml-8 -mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div>
                            <img
                                className="w-full"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default LandingPage
