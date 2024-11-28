import React, { useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import './Preloader.css'
import { preLoaderAnim } from "../animations/index.js";
import awcLogo from '../assets/images/awc Logo.png';

export const Preloader = () => {
    useEffect(() => {
        preLoaderAnim();
      }, []);
    return (
    <div className="preloader">
        <div className="logo">
        <img src={awcLogo} alt="AWC Logo" className="awc-logo" />
        </div>
        <div className="banner-animation">
            <TypeAnimation
            sequence={[
                'Welcome to',
                1000,
                'Adaptive Workflow Consultancy',
                1000,
            ]}
            speed={50}
            style={{ fontSize: '2em' }}
            />
      </div>
    </div>
    )
} 