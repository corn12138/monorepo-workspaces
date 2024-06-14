import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import { VaildCore } from "vaild-core";
import Login from './login';

type Props = {};

type FPlugin<T> = (ctx: T) => Promise<T>;

interface IValidCore {
    addPlugin: (type: string, cb: FPlugin<any>) => {};
    usePlugins: (type: string, name: string, ...params: Array<string>) => {};
    addLog: (log: string, ctx: any) => {};
    run: () => {};
    runWithStep: (steps: Array<string>) => {};
}

const core = new VaildCore() as unknown as IValidCore;

function Education({ }: Props) {

    const [logList, setLogList] = useState<Array<string>>([]);


    useEffect(() => {
        core.addPlugin("stepInfo", (ctx) => {
            core.addLog("stepInfo: 手机号信息数据确认", ctx);
            showLog([...ctx.current.loggin])
            return ctx;
        })

        core.addPlugin("stepInfo", (ctx) => {
            core.addLog("stepInfo: 邮箱信息数据确认", ctx);
            showLog([...ctx.current.loggin])
            return ctx;
        })


        core.usePlugins("stepValid", "phoneValidPlugin", "/xxxxx${}/")

        core.usePlugins("stepPost", "postUrlPlugin", "http://xxx/xxx/register");

        core.addPlugin("stepPost", (ctx) => {
            console.log('====', ctx.current.loggin)
            showLog([...ctx.current.loggin])
            return ctx;
        })
    }, [])

    const showLog = (newLogList: Array<string>) => {
        setLogList(logList => newLogList)
    }

    const handleClick = () => {
        console.log("提交");

        

        // core.rePipe( ['stepPost','stepInfo']);

        core.run();

        
    }

    const handleNewClick = () => {
        console.log(core)
        core.runWithStep(['stepPost','stepInfo']);
    }

    return (
        <div>
            <Button onClick={handleClick}>
                注册
            </Button>
            <Button onClick={handleNewClick}>
                新能力
            </Button>
            <div className=' flex flex-col justify-start items-start'>
                {
                    logList.map((item, idx) => <div key={idx}>{item}</div>)
                }

            </div>
            <Login />
        </div>
    )
}

export default Education