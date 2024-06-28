//请求队列 --- 针对请求 按照一定的顺序进行

export class RequestQueue {
    queue: any[];
    isProcessing: boolean;

    constructor() {
        this.queue = [];
        this.isProcessing = false
    };

    enqueue(requsetFunc: any) {
        this.queue.push(requsetFunc);
        console.log(this.queue,"请求队列")
        // return
        this.processQueue();
    }

    processQueue() {
        if (this.queue.length === 0 || this.isProcessing) return;
        this.isProcessing = true;
        const requsetFunc = this.queue.shift();
        requsetFunc().then(() => {
            this.isProcessing = false;
            this.processQueue();
        }).catch(() => {
            this.isProcessing = false;
            this.processQueue();
        });
    }
}

