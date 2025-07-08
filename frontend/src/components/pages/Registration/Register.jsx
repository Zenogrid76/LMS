import React from "react";

export default function Register() {
    return (
        <div
            className="relative flex min-h-screen flex-col bg-[#f9fbfa] overflow-x-hidden"
            style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
        >
            <div className="flex h-full grow flex-col justify-top items-center ">
                <div className="flex w-5xl h-120 flex-col justify-center rounded-b-xl py-10 bg-white shadow-lg">
                    <div className="px-40 flex flex-1 justify-center">
                        <div className="flex flex-col max-w-[960px] flex-1">
                            <h2 className="text-[#101816] text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                                Create Your Account
                            </h2>
                            {/* Social Signup Buttons */}
                            <div className="flex justify-center">
                                <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaf1ef] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em] w-full"
                                        onClick={() => window.location.href = 'https://accounts.google.com/'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                        </svg>
                                        <span className="m-2 truncate text-black ">Continue with Google</span>
                                    </button>
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f4f4f8] text-[#0A66C2] text-sm font-bold leading-normal tracking-[0.015em] w-full"
                                        onClick={() => window.location.href = 'https://www.linkedin.com/'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                        </svg>
                                        <span className="m-2 truncate">Continue with Linkedin</span>
                                    </button>
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f5fd] text-[#1877F2] text-sm font-bold leading-normal tracking-[0.015em] w-full"
                                        onClick={() => window.location.href = 'https://www.facebook.com/'}>
                                        <svg className="m-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                        </svg>
                                        <span className="m-2 truncate">Continue with FaceBook</span>
                                    </button>
                                </div>
                            </div>
                            {/* Register as Mentor/Student */}
                            <div className="flex justify-center">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1FDEAB] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em] grow"
                                        onClick={() => window.location.href = '/register/mentor'} // Redirect to Mentor Registration
                                    >
                                        <span className="truncate">Register as Mentor</span>
                                    </button>
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1FDEAB] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em] grow"
                                    onClick={() => window.location.href = '/register/student'} // Redirect to Student Registration
                                    >
                                        <span className="truncate">Register as Student</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
