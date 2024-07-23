import Draw from './draw';
import Tools from './tools';
import { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
   width: 100%;
   height: 100%;
   background-color: rgba(240,242,245,1);
`;

function App() {
    const [state, setState] = useState({defaultBrush: 'pencil'});

    const [brushType, setBrushType] = useState('pencil');
    const onChangeBrush = (type) => {
        setBrushType(type);
    };

    return (
        <Container>
            <Draw brushType={brushType}/>
            <Tools onChangeBrush={onChangeBrush}/>
        </Container>
    );
}
export default App;