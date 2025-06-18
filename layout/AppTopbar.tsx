/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
    useEffect
} from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const [calendarVisible, setCalendarVisible] = useState(false);
    const [calendarDate, setCalendarDate] = useState<Date | null>(null);
    const profileMenuRef = useRef<Menu>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setCalendarVisible(false);
            }
        };

        if (calendarVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [calendarVisible]);

    const profileItems = [
        { label: 'My Profile', icon: 'pi pi-user' },
        { label: 'Settings', icon: 'pi pi-cog' },
        { separator: true },
        { label: 'Logout', icon: 'pi pi-sign-out' }
    ];

    return (
        <div className="layout-topbar" style={{ position: 'relative' }}>
            <Link href="/" className="layout-topbar-logo">
                <img
                    src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
                    width="47.22px"
                    height={'35px'}
                    alt="logo"
                />
                <span>BizBot</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible
                })}
            >
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={() => setCalendarVisible(!calendarVisible)}
                >
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>

                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={(e) => profileMenuRef.current?.toggle(e)}
                >
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Menu model={profileItems} popup ref={profileMenuRef} id="profile_menu" />
            </div>

            {calendarVisible && (
                <div
                    ref={calendarRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: '100px',
                        zIndex: 1000
                    }}
                >
                    <Calendar
                        value={calendarDate}
                        onChange={(e) => setCalendarDate(e.value)}
                        inline
                    />
                </div>
            )}
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
