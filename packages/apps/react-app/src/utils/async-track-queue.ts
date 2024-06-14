import { debounce } from "lodash";

interface RequiredData {
    timestamp?: number | string 
}

// 如果我还没上报，queueData 还有数据，但是用户关了浏览器，怎么办？
/**
 * 我还有数据没有上报
 * 所以，我是不是可以用 localStroage 去存储这些没用的数据
 * 等我下次打开浏览器的时候，我再去追加
 */

class TaskQueueStorableHelper<T extends RequiredData> {
    private static instance: TaskQueueStorableHelper<any> | null = null;

    // 单例
    public static getInstance<T extends RequiredData>() {
        if(!this.instance) {
            this.instance = new TaskQueueStorableHelper<T>();
        }

        return this.instance;
    }

    private STORAGE_KEY = "luyi_local_store";
    private store: any = null;

    // 我再次打开浏览器的时候，是 consturctor 执行的时候
    // 如果我的 STORAGE_KEY 还有内容，就说明还没上报完
    constructor() {
        const localStorageVal = localStorage.getItem(this.STORAGE_KEY);
        if(localStorageVal) {
            try {
                this.store = JSON.parse(localStorageVal);
            } catch(err) {};
        }
    }

    get queueData() {
        return this.store?.queueData || null;
    }

    set queueData(queueData: Array<T>) {
        this.store = {
            ...this.store,
            queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
    }
}

export abstract class AsyncTrackQueue<T> {

    // 本地的存储服务
    private get storableService() {
        return TaskQueueStorableHelper.getInstance();
    }

    private set queueData(value: Array<T>) {
        this.storableService.queueData = value;
        if(value.length) {
            // 开始执行提交数据
            this.debounceRun()
        }
    }

    private get queueData(): Array<T> {
        return this.storableService.queueData;
    }

    public addTask(data: T|Array<T>) {
        this.queueData = (this.queueData || []).concat(data);
    }

    // 最好是不是，addTask 有一段时间不再增加了，再提给server
    protected debounceRun = debounce(this.run.bind(this), 500);

    // 
    private run() {
        const currentDataList = this.queueData;
        if(currentDataList.length) {
            this.queueData = [];
            this.consumeTaskQueue(currentDataList);
        }
    }
    protected abstract consumeTaskQueue(data: Array<T>): Promise<unknown>;
}