import React, { useState } from 'react';
import Form from '../../features/auth/components/Form/Form';
import Typewriter from 'typewriter-effect';
import { FormFields } from '../../features/auth/types/auth.types';

const Register: React.FC = () => {
    const loginLabels: FormFields[] = ["usernameOrEmail", "password"];
    const registerLabels: FormFields[] = ["username", "email", "password", "confirmPassword"];

    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

    const toggleMode = (): void => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const labels = isLoginMode ? loginLabels : registerLabels;
    return (<>
        <div className='flex justify-center md:block p-[2rem] lg:p-[4rem] h-dvh w-screen bg-richBlack'>
            <div className='md:flex lg:justify-between lg:flex-row'>
                <div className='text-offWhite hidden md:flex text-2xl md:text-3xl lg:text-5xl font-bold md:flex-1 break-words md:leading-normal lg:leading-snug mt-5 lg:mt-0'>
                    <Typewriter
                        key={isLoginMode ? 'login' : 'register'}
                        options={{
                            loop: true,
                            delay: 75,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(isLoginMode ? 'Log in to join your friends and keep the fun going!' : "Join the fun and show who's the champion!")
                                .pauseFor(4000)
                                .deleteAll()
                                .typeString(isLoginMode ? 'Compete, win, have fun!' : 'Share challenges and victories with your friends!')
                                .pauseFor(7000)
                                .deleteAll()
                                .typeString(isLoginMode ? 'Create victory stories with your friends!' : 'Join our community and be part of something great!')
                                .pauseFor(8000)
                                .start();
                        }}
                    />
                </div>
                <svg className="w-full h-auto absolute bottom-0 left-0 transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".1" className="fill-current text-coolGray"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".3" className="mt-4 fill-current text-carmineRed"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".75" className="fill-current text-sandyOrange"></path>
                </svg>
                <Form labels={labels} isLogin={isLoginMode} />
                <div className={`${isLoginMode ? "bottom-16" : "bottom-6"} text-offWhite lg:text-lg fixed font-bold left-1/2 -translate-x-1/2 w-full md:left-[0%] md:translate-x-0 md:w-[53%] p-[2rem] md:bottom-36 text-sm flex flex-col`}>
                    <span className='mb-1'>
                        {isLoginMode ?
                            'Want to create an account? Sign up now!'
                            :
                            'Already have an account? Log in to continue and track your progress!'}
                    </span>
                    <button onClick={toggleMode} className='text-left lg:text-xl md:ml-4 w-fit bg-gradient-to-r from-carmineRed to-red-300 bg-clip-text text-transparent lg:hover:text-sandyOrange transition-all duration-300 z-10'>{isLoginMode ? 'Sign up' : 'Log in'}</button>
                </div>
            </div>
        </div >
    </>
    )
};

export default Register;