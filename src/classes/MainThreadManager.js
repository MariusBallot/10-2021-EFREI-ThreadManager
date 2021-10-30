import Thread from './Thread'

class MainThreadManager {
    constructor() {
        this.params = {
            thread: {
                height: 60,
                step: 50,
                width: window.innerWidth - 200,
            },
            threadStep: 100
        }

        this.deadlines = []
        this.activePeriodTracker = [0, 0, 0]

        this.costTracker = []
        this.executions = []
    }

    computeBusyPeriod(threadsData) {
        let prevW = 0
        threadsData.forEach(thread => {
            prevW += thread.cost
        });
        console.log(prevW)

        for (let i = 1; i < 20; i++) {
            let currW = 0
            threadsData.forEach(thread => {
                currW += Math.ceil(prevW / thread.period) * thread.cost
            });

            if (currW == prevW) {
                console.log("busy Period Found", i)
                return i
            }
            prevW = currW
        }
    }

    doablility(threadsdata) {
        let flag = false
        //const URM = 1 / (Math.pow(2, threadsdata.length) - 1)
        let U = 0
        threadsdata.forEach(thread => {
            U += thread.cost / thread.period
        });
        if (U < 1) {
            flag = true
        }
        return [U, flag]
    }

    init(threadsData, canvas) {
        this.threadsData = threadsData
        this.ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = 800


        this.threadsData.forEach((thread, i) => {
            for (let j = 0; j < 10; j++) {
                this.costTracker[i] = thread.cost
                const dl = {
                    task: i,
                    pos: j * thread.period + thread.deadline,
                    open: false,
                    done: false
                }
                if (j == 0)
                    dl.open = true
                this.deadlines.push(dl)
            }
        });




        for (let currPos = 0; currPos < 100; currPos++) {

            this.threadsData.forEach((thread, i) => {
                if (currPos >= thread.period * this.activePeriodTracker[i] && currPos < thread.period * this.activePeriodTracker[i] + thread.deadline) {
                    let dlFlags = [false, false, false]
                    this.deadlines.forEach(dl => {
                        if (dl.task == i && !dl.done) {
                            if (!dlFlags[dl.task]) {
                                dl.open = true
                                dlFlags[dl.task] = true
                            }
                        }
                    });
                }
            });

            let taskPrio = null
            let smallPos = null
            this.deadlines.forEach(dl => {
                if (smallPos == null || smallPos > dl.pos) {
                    if (dl.open && !dl.done) {
                        smallPos = dl.pos
                        taskPrio = dl.task
                        this.costTracker[dl.task] -= 1
                        if (this.costTracker[dl.task] <= 0) {
                            this.costTracker[dl.task] = this.threadsData[dl.task].deadline
                            dl.done = true
                            dl.open = false
                            this.activePeriodTracker[dl.task]++
                        }
                    }
                }
            });

            let exe = {
                task: taskPrio,
                pos: currPos
            }
            this.executions.push(exe)
        }

        console.log(this.executions)

        this.threadsData.forEach((thread, i) => {
            new Thread(this.ctx, i, thread, this.executions, this.params)
        });

    }



    bind() {

    }
}

const _instance = new MainThreadManager()
export default _instance