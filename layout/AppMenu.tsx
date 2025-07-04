/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Insights', icon: 'pi pi-fw pi-chart-bar', to: '/insights' },
                { label: 'Chat Preview', icon: 'pi pi-fw pi-comments', to: '/chat-preview' },
                { label: 'Tracker', icon: 'pi pi-fw pi-clock', to: '/application-tracker' },
                { label: 'Licenses', icon: 'pi pi-fw pi-briefcase', to: '/license-explorer' },
                { label: 'Map View', icon: 'pi pi-fw pi-map-marker', to: '/map-view' },
                { label: 'Assistant', icon: 'pi pi-fw pi-robot', to: '/assistant' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
