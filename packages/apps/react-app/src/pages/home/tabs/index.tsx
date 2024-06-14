import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

type Props = {
    onChange ?: (bool: boolean) => void;
}

const tabs = [
    { name: "关注", to: '/follow'},
    { name: "推荐", to: '/'},
    { name: "热榜", to: '/hot'},
    { name: "视频", to: '/zvideo'},
    
]


export const PureTab = () => tabs.map((item) => <NavLink
    key={item.name}
    to={item.to}
    className={({ isActive }) => (" whitespace-nowrap p-4 px-6 text-base transition-all " + (
        isActive ? "text-blue-600 font-bold " : "text-black hover:text-blue-900"
    ))}
>
    {item.name}
</NavLink>)

function Tabs({ onChange }: Props) {

    const scrollRef = useRef<HTMLDivElement>(null);
    //  当我们这个 scrollRef 在屏幕不显示的时候，我们进行切换
    // 如果判断？
    // 1. getBoundingClientRect()
    // 2. intersectionObserver 

    useEffect(() => {
        let intersectionObserver = new IntersectionObserver((entries) => {
            // console.log("=====>", entries[0]?.isIntersecting)
            onChange?.(entries[0]?.isIntersecting)
        });

        scrollRef.current && intersectionObserver.observe(scrollRef.current);

        return () => {
            scrollRef.current && intersectionObserver.unobserve(scrollRef.current);
        }
    }, [])


  return (
    <div className='w-full'>
        <div ref={scrollRef}></div>
        <div className='flex '>
           <PureTab /> 
        </div>
        <Outlet />
    </div>
  )
}

export default Tabs