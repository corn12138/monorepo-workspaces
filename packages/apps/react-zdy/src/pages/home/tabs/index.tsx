import React from "react";

import { NavLink, Outlet } from "react-router-dom";

const tabs = [
    { name: "好文翻译", to: "/frontPage" },
    { name: "存档", to: "/archive" },
    { name: "测试", to: "/testPage" },
    { name: "视频", to: "/zvideo" },
];

export const PureTab = () => {
    return (
        tabs.map((item) => <NavLink
            key={item.name}
            to={item.to}
            className={
                ({ isActive }) => (
                    " whitespace-nowrap p-4 px-6 text-base transition-all" + (isActive ? "text-blue-600 font-bold" : "text-black hover:text-blue-900")
                )
            }
        >
            {item.name}
        </NavLink>)
    )
}

const Tabs = () => {

    return (
        <div className='w-full'>
            <div ></div>
            <div className='flex'>
                <PureTab />
            </div>
            <Outlet />
        </div>
    )
}

export default Tabs