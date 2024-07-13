import React from 'react';
import Card from "../../components/card/index"
import Tabs from './tabs';
type Props = {}

const Home: React.FC = ({ }: Props) => {
    return (
        <div>
            <Card className="w-full">
                <Tabs></Tabs>
            </Card>
        </div>
    );
};

export default Home;