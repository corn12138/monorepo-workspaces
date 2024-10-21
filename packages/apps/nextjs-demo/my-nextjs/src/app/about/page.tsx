import React from 'react';

const aboutPage:React.FC = () => {
    return (
        <>
            <section className='grid grid-cols-1'>
                <div className='text-center font-sans text-fuchsia-600'>关于我</div>
                <div className='text-center font-semibold text-zinc-400'>欢迎来到此页面！！！</div>
            </section>
        </>
    );
};

export default aboutPage;