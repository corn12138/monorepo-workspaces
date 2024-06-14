import React, { FC, MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
// import { mockList } from './MockList';
import { apiGet } from '../../../../api/request';

type Props = {}

interface ItemProps {
    item: any

}


const RecommendData: FC<ItemProps> = ({ item }) => {

    const [selected, setSelected] = useState<boolean>(false);


    const handleClick: MouseEventHandler<Element> = (event) => {
        event?.preventDefault();
        setSelected(val => !val);
    }

    const href = `https://www.zhihu.com/question/${item?.target?.question?.id}/answer/${item?.target?.id}`

    return <div className='flex flex-col items-start p-4 border-b'>
        {/* 标题部分 */}
        <div className='h-auto flex justify-start'>
            <a className='font-bold text-black text-lg leading-10'
                target='_blank'
                href={href}
            >
                {
                    item?.target?.question?.title
                }
            </a>
        </div>
        {/* 文章内容部分 */}
        <div>
            {
                // dangerouslySetInnerHTML ----> 使用此 渲染 富文本 （类似于 v-html）
                selected ? <div dangerouslySetInnerHTML={{ __html: item?.target?.content }} /> :
                    <a href='/'
                        onClick={handleClick}
                        className=' cursor-pointer text-slate-800 hover:text-slate-500'
                    >
                        {item?.target?.excerpt || item?.target?.excerpt_new}
                        <span className=' text-sm leading-7 text-blue-500 hover:text-slate-500'> 阅读全文 &gt;</span>
                    </a>
            }
        </div>
        {/* 底bar 部分  ' bottom-0 border-t shadow-sm sticky' ---吸底操作 */}
        <div className={`flex bg-white w-full ${selected ? " bottom-0 border-t shadow-sm sticky " : ""} `}>
            <div className='h-10 rounded-sm bg-blue-100 text-blue-500 px-2 py-1 m-2 inline-flex'>
                <span className='inline-flex items-center justify-center' >
                    <svg width="10" height="10" viewBox="0 0 24 24" className="Zi Zi--TriangleUp VoteButton-TriangleUp" fill="currentColor"><path fillRule="evenodd" d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z" clipRule="evenodd"></path></svg>
                    &nbsp;赞同
                </span>
            </div>
            <div className='h-10 rounded-sm bg-blue-100 text-blue-500 px-2 py-1 m-2 inline-flex'>
                <span className='inline-flex items-center justify-center' >
                    <svg width="10" height="10" viewBox="0 0 24 24" className="Zi Zi--TriangleDown" fill="currentColor"><path fillRule="evenodd" d="M13.792 20.319c-.781 1.406-2.803 1.406-3.584 0L2.418 6.296c-.76-1.367.228-3.046 1.791-3.046h15.582c1.563 0 2.55 1.68 1.791 3.046l-7.79 14.023Z" clipRule="evenodd"></path></svg>
                </span>
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                &nbsp; {item?.target?.comment_count} 条评论
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                收藏
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                喜欢
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                分享
            </div>
            {
                selected && <div onClick={handleClick}
                    className='text-base text-gray-400 p-2 m-2 inline-flex cursor-pointer'>
                    <span className='inline-flex'>收起</span>
                </div>
            }
        </div>

    </div>
}


// 封装useAPI 

// 1.useEffect 类型
// effct  是副作用的意思，我在封装的时候，我要把他哪些东西，作为我的副作用来看待。
// 对于此例，就是对应的 entrise[0]?.isIntersecting 发生变化的时候执行 副作用
// 副作用 ===>就是我的业务===>请求、接口、返回更新的数据。
// 功能：当我监听的ref的 InsObs 发生变化的时候，执行副作用
const useRefInsObsEffect = (fn: (b: boolean) => void, ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        let intersectionObserver = new IntersectionObserver((entrise) => {
            fn(entrise[0]?.isIntersecting); // 当其发生变化的时候 就会 执行你传入的自定义函数
        });
        // 监听触底的（ref）
        ref.current && intersectionObserver.observe(ref.current);
        // 销毁这个监听
        return () => {
            ref.current && intersectionObserver.unobserve(ref.current)
        }

    }, [])
}

// 2.封装useState 类型
// useState 本身返回的是数据、状态逻辑
// 我将所有的逻辑，都封装在useAPI里 最后只返回你的  viewModel
// 这是 MVVM的逻辑
// 一般情况下， server-data ----> model ----> for view 的 model -->  view 
// 封装：【 server-data -->  model  -->  ***for view 的 model*** 】

const useRefInsObsState = (ref: RefObject<HTMLDivElement>) => {
    // list 代表数据
    const [list, setList] = useState<Array<any>>([]);
    // 请求数据  ---> 这里的intersectionObserver 的目的 是在做 触底加载的
    const lockRef = useRef<boolean>(true); //请求加锁  防止多次调用
    const listRef = useRef<Array<any>>([]); //相当于一个全局的变量--->用来解决下边的闭包问题
    useEffect(() => {
        let intersectionObserver = new IntersectionObserver((entries) => {
            // entries[0]?.isIntersecting 发生变化时，通知你执行，你传进来的自定义函数。
            if (entries[0]?.isIntersecting && lockRef.current) {
                lockRef.current = false;
                apiGet({
                    url: "feed",
                    startNum: listRef.current.length,
                    pageSize: 10,
                }).then((res) => {
                    listRef.current = [...listRef.current, ...res?.list as unknown as Array<any>];
                    setList(listRef.current);
                    lockRef.current = true;
                });
            }
        });
        ref.current && intersectionObserver.observe(ref.current);
        return () => {
            ref.current && intersectionObserver?.unobserve(ref.current);
        }
    }, []);
    return [list, list.length]
}

const RecommendList = ({ }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    // // list 代表数据
    // const [list, setList] = useState<Array<any>>([]);
    // // 请求数据  ---> 这里的intersectionObserver 的目的 是在做 触底加载的
    // const lockRef = useRef<boolean>(true); //请求加锁  防止多次调用
    // const listRef = useRef<Array<any>>([]); //相当于一个全局的变量--->用来解决下边的闭包问题
    // useRefInsObsEffect((bool) => {
    //     if (bool && lockRef.current) {
    //         lockRef.current = false
    //         apiGet({
    //             url: 'feed',
    //             startNum: listRef.current.length,
    //             pageSize: 10
    //         }).then(res => {
    //             // 这里 小心闭包的陷阱（因为下边存的setList 上边的如果是 startNum:list.length 拿不到最新的） 
    //             //---> 处理的方案一：dispatch 函数的参数，可以是一个函数。 方案二：使用一个ref(listRef) 去储存最新的数据
    //             listRef.current = [...listRef.current, ...res?.list as unknown as Array<any>]
    //             setList(listRef.current)
    //             lockRef.current = true
    //         })
    //     }

    // }, scrollRef);

    const [list, len] = useRefInsObsState(scrollRef);


    return (
        <div className='flex flex-col border-t'>
            <h5>一共有{len}条数据</h5>
            {
                list?.map((item: any, idx: number) => <RecommendData key={item.id} item={item}></RecommendData>)
            }
            {/* 只要在页面中显示出来,我就马上加载 */}
            <div ref={scrollRef} className='flex h-14 justify-center text-slate-500'>loading.....</div>
        </div>
    );
};

export default RecommendList;