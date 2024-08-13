import React from "react";
import withDataFetching from "../hoc/withDataFetching"; // 封装的hoc

//定义一个展示日期的组件
const DateDisplay = ({ data, loading, error }) => {
    if (loading)
        return (
            <>
                <p>Loading...</p>
            </>
        );

    if (error)
        return (
            <>
                <p>Error:{error?.message}</p>
            </>
        );

    return (
        <>
            <ul>
                {data.map((date) => (
                    <li key={date.id}>{date.date}</li>
                ))}
            </ul>
        </>
    );
}

//使用hoc封装DateDisplay组件
const url = "https://api.hnpwa.com/v0/news/1.json";
const DateDisplayWithFetching = withDataFetching(url)(DateDisplay);

const TestsHoc = () => {
    return (
        <>
            <h1>TestsHoc</h1>
            <DateDisplayWithFetching />
        </>
    );
}
export default TestsHoc;
