import React from 'react';
import Card from "../../components/card/index"
import Tabs from './tabs';
import { Outlet } from 'react-router-dom';
type Props = {}

const Home: React.FC = ({ }: Props) => {
    return (
        <div>
            <Card className="w-full">
                <Tabs></Tabs>
            </Card>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Home;