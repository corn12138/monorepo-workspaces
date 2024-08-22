//验证 useReducer
import React, { useReducer } from "react";
import styled from "styled-components";

// 1.css in js
const Container = styled.div`
    width: 100%;
    background-color: rgba(240,242,245,1);
`;

const initialState = {
    count: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state;
    }
};

const TestsReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //
    const increment = () => {
        dispatch({ type: 'increment' })
    }
    //
    const decrement = () => {
        dispatch({ type: 'decrement' });
    }
    return (
        <>
            <Container>
                <h1>测试useReducer</h1>
                <p>state:{state.count}</p>
                <button onClick={increment}></button>
                <button onClick={decrement}></button>
            </Container>
        </>
    )
};