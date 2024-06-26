import { debounce,throttle } from "lodash"

interface RequireData {
    timestamp?: number | string;
}

//若我还没有上报 queueData 还有数据 ，但是用户关闭了浏览器 ，该如何？
/**
 * 我还有数据没有上报
 * so 我是否 可以 用localstorage 去存储这些没用的数据
 * 等我下次打开浏览器的时候，我再去追加
 */

class TaskQueueStorableHelper<T extends RequireData> {
    private static instance: TaskQueueStorableHelper<any> | null = null;

    //单例
    public static getInstance<T extends RequireData>() {
        if (!this.instance) {
            this.instance = new TaskQueueStorableHelper<T>();
        };

        return this.instance;
    };

    private STORAGE_KEY = "luyi_local_store";
    private store: any = null;
    //我再次打开浏览器 的时候 是constructor 执行的时候
    // 若我还是 STORAGE_KEY还有内容 就说明还没有上报完
    constructor() {
        const localStorageVal = localStorage.getItem(this.STORAGE_KEY);
        if (localStorageVal) {
            try {
                this.store = JSON.parse(localStorageVal);
            } catch (error) {

            }
        }
    }

    get queueData() {
        return this.store?.queueData || null;
    };

    set queueData(queueData: Array<T>) {
        this.store = {
            ...this.store,
            queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
    }

}

export abstract class AsyncTrackQueue<T> {

    // private __queueData: Array<T> = [];
    // 本地的存储服务
    private get storableService() {
        return TaskQueueStorableHelper.getInstance();
    }

    private set queueData(value: Array<T>) {
        this.storableService.queueData = value;
        if (value.length) {
            // 开始执行提交，sending

        }
    };

    private get queueData(): Array<T> {
        return this.storableService.queueData;
    }


    public addTask(data: T | Array<T>) {
        this.queueData = (this.queueData || []).concat(data);
    };

    // 最好的方式 ，addTask 有一段时间不再增加了，再提交给server
    protected debounceRun = debounce(this.run.bind(this), 500);

    private run() {
        const currentDataList = this.queueData;
        if (currentDataList.length) {
            this.queueData = [];
            this.consumeTaskQueue(currentDataList)
        }
    };

    protected abstract consumeTaskQueue(data: Array<T>): Promise<unknown>;

};
