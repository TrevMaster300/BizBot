'use client';
import React, { useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';

const LandingPage = () => {
    const [isHidden, setIsHidden] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const menuRef = useRef<HTMLElement | null>(null);

    const toggleMenuItemClick = () => setIsHidden(!isHidden);

    return (
        <div className="surface-0 flex justify-content-center min-h-screen">
            <div id="home" className="landing-wrapper w-full">
                {/* Navigation Bar */}
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex justify-between items-center relative lg:static">
                    <Link href="/" className="flex items-center">
                        <img
                            src={`/layout/images/${layoutConfig.colorScheme === 'light' ? 'logo-dark' : 'logo-white'}.svg`}
                            alt="BizBot Logo"
                            height="40"
                            className="mr-2"
                        />
                        <span className="text-900 font-semibold text-2xl">BizBot</span>
                    </Link>

                    <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                        <i ref={menuRef} className="pi pi-bars text-3xl cursor-pointer lg:hidden text-700"></i>
                    </StyleClass>

                    <div
                        className={classNames('items-center justify-end hidden lg:flex w-full lg:w-auto absolute lg:static top-full left-0 px-6 lg:px-0 z-2', {
                            hidden: isHidden
                        })}
                    >
                        <Button label="Login" text rounded className="text-blue-500 border-none font-light" />
                        <Button label="Register" rounded className="ml-3 bg-blue-500 text-white font-light" />
                    </div>
                </div>

                {/* Hero Section */}
                <div
                    className="flex flex-col-reverse lg:flex-row items-center justify-between pt-8 px-6 lg:px-8"
                    style={{
                        background: 'radial-gradient(circle at top left, #c3dcfa, #fff)',
                        clipPath: 'ellipse(150% 87% at 93% 13%)'
                    }}
                >
                    <div className="text-left max-w-xl">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                            Empower your licensing with <span className="text-blue-500">BizBot</span>
                        </h1>
                        <p className="text-gray-700 text-lg mb-6">Fast-track your municipal business licence application with a simplified digital experience.</p>
                        <Button type="button" label="Get Started" rounded className="bg-blue-500 text-white text-lg px-4 py-3 border-none" />
                    </div>

                    <img src="/demo/images/landing/screen-1.png" alt="Hero" className="w-full lg:w-[500px] mb-8 lg:mb-0" />
                </div>

                {/* Optional Callout or Footer */}
                <div className="text-center py-10 px-4">
                    <p className="text-gray-500">© {new Date().getFullYear()} BizBot. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
