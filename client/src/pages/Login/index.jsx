import React from 'react'
import LoginForm from '../../components/LoginForm';
import logo from "/eyegoai_logo.jpeg";
import authImg from "/auth-widgets.png";


export default function Login() {

  return (
    <div>
        <div className="logo absolute top-0">
            <img src={logo} alt="eyegoai logo" />
        </div>
        <div className='block md:flex items-center justify-between'>
            <LoginForm />
            <div className="hidden w-[60%] text-white p-10 text-center justify-center md:flex flex-col h-[100vh] bg-[#090E23]">
                <h2 className='text-3xl font-semibold!'>
                    Welcome to <span className='text-[#635BFF]'>eyegoai <br /> dashboard</span>
                </h2>
                <img src={authImg} className='w-[85%] mx-auto' alt="Auth image" />
            </div>
        </div>
    </div>
  )
}
