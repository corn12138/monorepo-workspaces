import React, { useEffect, useRef, useState } from 'react';

const EventExample = () => {
    const buttonRef = useRef(null);
    const [val, setVal] = useState<Array<string>>([]);

    useEffect(() => {   
        // 给按钮加一个原生监听事件
        const button = buttonRef.current;
        button.addEventListener("click", handleNativeClick, true); // true ---> 在捕获阶段监听

        return () => {
            button.removeEventListener("click", handleNativeClick, true);
        }
    }, []);

    // 原生事件处理函数
    const handleNativeClick = (event: { stopPropagation: () => void; }) => {
        setVal(prevVal => [...prevVal, "Native event (capture phase)"]);
        console.log("Native event (capture phase)");

        // 示例：在某些条件下阻止事件进一步传播
        if (shouldStopPropagation()) {
            event.stopPropagation();
            console.log("Propagation stopped in native event handler");
        }
    }

    // 判断是否应该停止事件传播
    const shouldStopPropagation = () => {
        // 根据实际情况返回true或false
        return true; // 假设我们总是停止传播
    }

    // React 合成事件处理函数
    const handleReactClick = (event: { preventDefault: () => void; }) => {
        setVal(prevVal => [...prevVal, "React synthetic event"]);
        console.log("React synthetic event");

        // 示例：在某些条件下阻止事件默认行为
        if (shouldPreventDefault()) {
            event.preventDefault();
            console.log("Default prevented in React event handler");
        }
    }

    // 判断是否应该阻止默认行为
    const shouldPreventDefault = () => {
        // 根据实际情况返回true或false
        return false; // 假设我们不阻止默认行为
    }

    return (
        <div>
            <div className='text-center via-violet-500'>{val.join(",")}</div>
            <button ref={buttonRef} className='border-solid border-2 rounded-lg text-center bg-red-500 hover:via-orange-500' onClick={handleReactClick}>
                Click Me
            </button>
        </div>
    );
};

export default EventExample;
