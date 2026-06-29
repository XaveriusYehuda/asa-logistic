import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Popup from "../component/popup";

const SignUp = ({pageVariants, triggerPopup, popupActive, setPopupActive, popupConfig, setPopupConfig}) => {

  const { register, user } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registeredUser = await register(username, email, password);

      console.log(username, email, password);

      const message = registeredUser.message;

      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          {message}
        </p>
      );
      
      navigate('/login');
      
    } catch (err) {
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          {err.message}
        </p>
      );
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <Popup 
        popupActive={popupActive} 
        setPopupActive={setPopupActive} 
        contentTitle={popupConfig.title}
        contentText={popupConfig.content}
      />
      <section class="bg-white py-16 md:py-32 px-4 sm:px-8 relative overflow-hidden font-inter min-h-screen flex items-center justify-center">
  
        <div class="bg-white rounded-[50px] max-w-5xl w-full p-8 sm:p-12 lg:p-16 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] relative z-10 border border-gray-100/50">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div class="lg:col-span-6 space-y-4">
              <div class="flex items-center gap-2">
                <span class="inline h-3 w-3 block bg-red-calm self-end mb-1.75 transform rounded-full"></span>
                <h2 class="text-4xl sm:text-5xl font-bold font-inter text-black tracking-wide flex items-center gap-3">
                  Hi, there <span class="text-yellow-400">✨</span>
                </h2>
              </div>
              <p class="text-lg sm:text-xl font-bold font-inter text-black tracking-wide leading-tight">
                Please sign up to access more information.
              </p>
            </div>

            <div class="lg:col-span-6 flex flex-col items-center">
              <div class="w-full max-w-md space-y-6">
                
                <h3 class="text-2xl font-inter font-bold text-black text-center mb-4 tracking-wide">Sign Up</h3>
                
                <form onSubmit={handleSubmit} class="space-y-4">
                  
                  <div class="relative">
                    <input 
                      type="text" 
                      id="username"
                      placeholder=" " 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      class="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_100px_white]"
                    />
                    <label 
                      for="username" 
                      class="absolute left-5 top-1/2 -translate-y-1/2 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 
                      peer-focus:-top-0 peer-focus:text-xs peer-focus:text-red-500 
                      peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-xs appearance-none"
                    >
                      Username
                    </label>
                    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                      <svg
                        className="w-5 h-5"
                        viewBox="-10 -10 520 520"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M249.985 106.235C292.319 106.236 325.725 139.231 325.726 178.826C325.726 218.422 292.319 251.418 249.985 251.418C207.651 251.418 174.244 218.422 174.244 178.826C174.244 139.23 207.651 106.235 249.985 106.235Z"
                          stroke="currentColor"
                          strokeWidth="50"
                        />

                        <circle
                          cx="250"
                          cy="250"
                          r="235"
                          stroke="currentColor"
                          strokeWidth="50"
                        />

                        <path
                          d="M129.623 372.261C134.512 211.677 369.179 211.677 374.068 372.261"
                          stroke="currentColor"
                          strokeWidth="50"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      placeholder=" " 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_100px_white]"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 
                      peer-focus:-top-0 peer-focus:text-xs peer-focus:text-red-500 
                      peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-xs appearance-none"
                    >
                      Email
                    </label>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                      <svg
                        className="w-5 h-5"
                        viewBox="-10 -10 520 520"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M249.985 106.235C292.319 106.236 325.725 139.231 325.726 178.826C325.726 218.422 292.319 251.418 249.985 251.418C207.651 251.418 174.244 218.422 174.244 178.826C174.244 139.23 207.651 106.235 249.985 106.235Z"
                          stroke="currentColor"
                          strokeWidth="50"
                        />

                        <circle
                          cx="250"
                          cy="250"
                          r="235"
                          stroke="currentColor"
                          strokeWidth="50"
                        />

                        <path
                          d="M129.623 372.261C134.512 211.677 369.179 211.677 374.068 372.261"
                          stroke="currentColor"
                          strokeWidth="50"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      type="password" 
                      id="password"
                      placeholder=" " 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_100px_white]"
                    />
                    <label 
                      htmlFor="password" 
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 
                      peer-focus:-top-0 peer-focus:text-xs peer-focus:text-red-500 
                      peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-xs appearance-none"
                    >
                      Password
                    </label>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 450 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M225 275C216.437 274.911 208.049 277.156 200.966 281.433C193.882 285.709 188.442 291.812 185.378 298.92C182.314 306.028 181.774 313.8 183.829 321.189C185.885 328.578 190.438 335.23 196.875 340.25V375C196.875 381.63 199.838 387.989 205.113 392.678C210.387 397.366 217.541 400 225 400C232.459 400 239.613 397.366 244.887 392.678C250.162 387.989 253.125 381.63 253.125 375V340.25C259.562 335.23 264.115 328.578 266.171 321.189C268.226 313.8 267.686 306.028 264.622 298.92C261.558 291.812 256.118 285.709 249.034 281.433C241.951 277.156 233.563 274.911 225 275ZM365.625 175V125C365.625 91.8479 350.809 60.0537 324.437 36.6117C298.065 13.1696 262.296 0 225 0C187.704 0 151.935 13.1696 125.563 36.6117C99.1908 60.0537 84.375 91.8479 84.375 125V175C61.9974 175 40.5362 182.902 24.7129 196.967C8.88949 211.032 0 230.109 0 250V425C0 444.891 8.88949 463.968 24.7129 478.033C40.5362 492.098 61.9974 500 84.375 500H365.625C388.003 500 409.464 492.098 425.287 478.033C441.111 463.968 450 444.891 450 425V250C450 230.109 441.111 211.032 425.287 196.967C409.464 182.902 388.003 175 365.625 175ZM140.625 125C140.625 105.109 149.514 86.0322 165.338 71.967C181.161 57.9018 202.622 50 225 50C247.378 50 268.839 57.9018 284.662 71.967C300.486 86.0322 309.375 105.109 309.375 125V175H140.625V125ZM393.75 425C393.75 431.63 390.787 437.989 385.512 442.678C380.238 447.366 373.084 450 365.625 450H84.375C76.9158 450 69.7621 447.366 64.4876 442.678C59.2132 437.989 56.25 431.63 56.25 425V250C56.25 243.37 59.2132 237.011 64.4876 232.322C69.7621 227.634 76.9158 225 84.375 225H365.625C373.084 225 380.238 227.634 385.512 232.322C390.787 237.011 393.75 243.37 393.75 250V425Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <div class="pt-2 pl-2 space-y-1">
                    <p class="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                      <span class="w-1 h-1 bg-gray-800 rounded-full inline-block"></span>
                      Passwords must be at least 8 characters long
                    </p>
                    <p class="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                      <span class="w-1 h-1 bg-gray-800 rounded-full inline-block"></span>
                      Passwords must include both uppercase and lowercase letters
                    </p>
                    <p class="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
                      <span class="w-1 h-1 bg-gray-800 rounded-full inline-block"></span>
                      Passwords must contain numbers
                    </p>
                  </div>

                  <div class="text-center pt-4">
                    <button type="submit" class="w-full sm:w-auto bg-red-calm text-white font-bold px-16 py-3 rounded-full text-sm shadow-[0_10px_25px_rgba(239,51,38,0.25)] hover:bg-red-700 transition-all duration-300 hover:scale-[1.02]">
                      Sign Up
                    </button>
                  </div>

                  <div class="text-center pt-2">
                    <button type="button" onClick={() => navigate('/login')}  class="text-red-calm text-[11px] font-bold hover:underline tracking-wide">
                      Already have an account?
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SignUp;