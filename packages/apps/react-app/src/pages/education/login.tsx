import React, { useState } from 'react'
import Button from '../../components/button'
import { IValidCore } from './index'
import { VaildCore } from "vaild-core";

type Props = {}

function Login({ }: Props) {

    const [logList, setLogList] = useState<Array<string>>([]);

    const showLog = (newLogList: Array<string>) => {
        setLogList(logList => newLogList)
    }

    const handleClick = () => {
        console.log("提交");

        const core = new VaildCore() as unknown as IValidCore;
        // const core = new VaildCore()

        core.usePlugins("stepPost", "postUrlPlugin", "http://xxx/xxx/login");

        core.addPlugin("stepPost", (ctx) => {
            console.log('====', ctx.loggin)
            showLog([...ctx.loggin])
            return ctx;
        })

        core.addPlugin("stepInfo", (ctx) => {
            ctx.loggin.push("手机号信息数据确认");
            showLog([...ctx.loggin])
            return ctx;
        })

        core.addPlugin("stepInfo", (ctx) => {
            ctx.loggin.push("密码信息数据确认");
            showLog([...ctx.loggin])
            return ctx;
        })
        core.run();
    }

    return (
        <div>
            <Button onClick={handleClick}>
                登录
            </Button>
            <div className=' flex flex-col justify-start items-start'>
                {
                    logList.map((item, idx) => <div key={idx}>{item}</div>)
                }

            </div>
        </div>
    )
}

export default Login