import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Slogan from "./components/Slogan"
import Social from "./components/Social"
import { register } from "@/services/authService"
import { useAppDispatch } from "@/hooks/redux"
import { setCredentials } from "@/store/features/auth/authSlice"
import { showSuccess, showError } from "@/utils/messageUtils"

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.fullName || !formData.email || !formData.password) {
            showError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (formData.password.length < 6) {
            showError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        try {
            setLoading(true);
            const response = await register(formData);
            
            if (response.status === "success") {
                // Set user credentials in Redux store
                dispatch(setCredentials({
                    user: response.data.user,
                    token: response.token
                }));
                
                showSuccess("Đăng ký thành công! Đang chuyển hướng...");
                
                // Redirect based on user role
                setTimeout(() => {
                    if (response.data.user.role === "user") {
                        navigate("/user");
                    } else if (["admin", "collaborator"].includes(response.data.user.role)) {
                        navigate("/admin");
                    }
                }, 1000);
            }
        } catch (error) {
            if (error instanceof Error) {
                showError(error.message);
            } else {
                showError("Đăng ký thất bại. Vui lòng thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img
                            className="object-cover w-full h-full"
                            src="https://i.pinimg.com/736x/f9/3d/39/f93d391b37025dd0be9f02762a24fcca.jpg"
                            alt=""
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <Slogan />
                </div>
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="capitalize text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Đăng Ký Tài khoản
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Đã có tài khoản?{" "}
                            <Link
                                to={`/dang-nhap`}
                                title=""
                                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                            >
                                Đăng nhập ngay!
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="fullName" className="text-base font-medium text-gray-900">
                                        Họ &amp; Tên
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="Nguyễn Văn A"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="nguyenan@edu.com.vn"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="capitalize text-base font-medium text-gray-900">
                                        Mật Khẩu
                                    </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Đang xử lý..." : "Đăng Ký"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <Social />
                        <p className="mt-5 text-sm text-gray-600">
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a
                                href="#"
                                title=""
                                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                            >
                                Privacy Policy
                            </a>{" "}
                            &amp;
                            <a
                                href="#"
                                title=""
                                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                            >
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
