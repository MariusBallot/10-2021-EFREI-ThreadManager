import Thread from './Thread'

class MainThreadManager {
    constructor() {
        this.params = {
            thread: {
                height: 60,
                step: 20,
                width: window.innerWidth - 200,
            },
            threadStep: 100
        }

        this.busyPeriod
        this.threadZones = []
        this.executions = []
    }

    computeBusyPeriod(threadsData) {
        let prevW = 0
        threadsData.forEach(thread => {
            prevW += thread.cost
        });

        for (let i = 1; i < 20; i++) {
            let currW = 0
            threadsData.forEach(thread => {
                currW += Math.ceil(prevW / thread.period) * thread.cost
            });

            if (currW == prevW) {
                this.busyPeriod = prevW
                return prevW
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


        //ThreadZone hydration
        threadsData.forEach((thread, j) => {
            this.threadZones[j] = []

            let zId = 0
            for (let i = 0; i < this.busyPeriod; i += thread.deadline) {
                const t = {
                    zoneId: zId,
                    start: thread.period * zId,
                    stop: 0,
                    active: false,
                    cost: thread.cost,
                    done: false,
                }
                t.stop = t.start + thread.deadline - 1
                this.threadZones[j].push(t)

                zId++
            }
        });

        //Time loop
        // for (let i = 0; i < this.busyPeriod; i++) {
        for (let t = 0; t < this.busyPeriod; t++) {

            //Check if thread zone is active
            for (let j = 0; j < threadsData.length; j++) {
                this.threadZones[j].forEach((zone, h) => {
                    if (t >= zone.start && t <= zone.stop)
                        zone.active = true
                    else {
                        zone.active = false
                    }
                });
            }

            //Check Priority
            let prioTask = null
            let prevStop = null
            for (let j = 0; j < threadsData.length; j++) {
                this.threadZones[j].forEach((zone, h) => {
                    if (zone.active && !zone.done) {
                        if (prevStop == null || prevStop > zone.stop) {
                            prioTask = j
                            prevStop = zone.stop
                        }
                    }

                });
            }

            //Hydrate executions array
            this.executions.push({ task: prioTask, pos: t })

            //Check if zone is done (As no more cost to put in exectutions)
            this.threadZones[prioTask].forEach((zone, h) => {
                if (zone.active && !zone.done) {
                    zone.cost--
                    if (zone.cost == 0)
                        zone.done = true
                }

            });

        }

        console.log(this.executions)


        this.threadsData.forEach((thread, i) => {
            new Thread(this.ctx, i, thread, this.executions, this.busyPeriod, this.params)
        });

    }



    bind() {

    }
}

const _instance = new MainThreadManager()
export default _instance