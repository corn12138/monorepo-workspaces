import { AsyncTrackQueue } from "./async-track-queue";

interface TrackData {
    seqId: number;
    id: string;
    timestamp: number;
    msg?: string;
    eventName?: string;
}

export interface UserTrackData {
    msg?: string;
    eventName?: string;
}

export class BaseTrack extends AsyncTrackQueue<TrackData> {

    private seq = 0;

    // 我们假设，这个是我们的埋点 API，我们每一次调用，是不是真的要立马发起请求？
    // 我们可以收集一波，然后过一段时间，一起发送
    public track(data: UserTrackData) {
        // 做一个收集的动作
        this.addTask({
            id: `${Math.random()}`,
            seqId: this.seq++,
            timestamp: Date.now(),
            ...data
        })
    }

    protected consumeTaskQueue(data: Array<TrackData>): Promise<unknown> {
        // 1px gif 方案
        // return new Promise<void>((resolve) =>{
        //     const image = new Image();
        //     image.src = `https://www.luyi.com/logs.gif?data=${JSON.stringify(data)}`;
        //     image.onload = () => {
        //         resolve()
        //     }
        // })

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data.map(item => item.msg))
            })
        }).then(console.log)
    }
}