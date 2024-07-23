import styled from "styled-components";
import { Button,Flex} from "antd";

const ToolsBox=styled.div`
position:absolute;
bottom:10px;
left:50%;
transform:translateX(-50%);
`;

export default function Tools(props){
    return (
        <ToolsBox>
            <Flex gap="large">
                <Button onClick={()=>props.onChangeBrush("pencil")}>铅笔</Button>
                <Button onClick={()=>props.onChangeBrush("eraser")}>橡皮</Button>
                <Button onClick={()=>props.onChangeBrush("spray")}>喷绘</Button>
                <Button onClick={()=>props.onChangeBrush("tape")}>胶带</Button>
            </Flex>
        </ToolsBox>
    );
}