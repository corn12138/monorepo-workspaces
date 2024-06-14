import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../components/navigation';
import Card from '../../components/card';
import Tabs from './tabs';
import AdvancedBtns from './AdvancedBtns';
import Creation from './Creation';
import SelfFunctions from './SelfFunctions';

type Props = {}

function Home({}: Props) {

  // 代表着，我切换后的目录，该不该隐藏
  const [ hide, setHide ] = useState<boolean>(true);

  const handleChange = (isHide: boolean) => {
    setHide(isHide);
  }

  return (
    <div className='bg-slate-100'>
        <Navigation hide={hide} />
        <div className='mx-auto max-w-5xl flex my-2 px-2'>
          <Card className='w-5/7' >
              <Tabs onChange={handleChange} />
          </Card>
          <div className=' w-2/7 flex flex-col flex-1'>
            <Card className='w-full' >
              <Creation />
            </Card>
            <Card className='w-full' >
             <AdvancedBtns />
            </Card>
            <Card className='w-full' >
              <SelfFunctions />
            </Card>
          </div>
        </div>
    </div>
  )
}

export default Home;