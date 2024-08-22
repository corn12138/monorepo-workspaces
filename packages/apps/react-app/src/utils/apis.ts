import { BaseTrack, UserTrackData } from "./track";

// 代码中的 BaseTrack 类和 UserTrackData 接口是我们自己定义的，用于埋点的数据结构和发送逻辑。
export class Performance {
    public static readonly timing = window.performance?.timing;
    public static init(){
        if(this.timing){
            window.addEventListener("load",()=>{
                t.track({
                    eventName:"PAGE_FMP",
                    msg:`dns:${this.getTimings().dns}`
                })
            })
        }else{
            console.warn("不支持")
        }
    }

    public static getTimings():{ [key in string ]: number} {
        return {
            dns: Performance.timing.connectEnd - Performance.timing.connectStart,
            tcp: Performance.timing.domContentLoadedEventEnd - Performance.timing.domContentLoadedEventStart
        }
    }
}

const t = new BaseTrack();

// 发送数据--
export const sendLog = <T>(data:T)=>{
    t.track(data as (T & UserTrackData));
};