class Thread {
    constructor(ctx, index, data, executions, BP, params) {
        this.ctx = ctx
        this.index = index
        this.data = data
        this.executions = executions
        this.BP = BP
        this.params = params

        this.ctx.save()
        this.ctx.translate(20, this.params.threadStep * index)
        this.drawFrame()
        this.drawPeriod()
        this.drawDeadline()
        this.drawExecutions()
        this.drawBP()
        this.ctx.restore()
    }

    drawFrame() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.params.thread.height);
        this.ctx.lineTo(this.params.thread.width, this.params.thread.height);
        this.ctx.stroke();
        this.ctx.closePath()

        for (let i = 0; i < this.params.thread.width; i += this.params.thread.step) {
            this.ctx.save()
            this.ctx.beginPath();
            this.ctx.translate(i, 0)
            this.ctx.moveTo(0, this.params.thread.height - this.params.thread.step);
            this.ctx.lineTo(0, this.params.thread.height);
            this.ctx.stroke();
            this.ctx.lineWidth = 0.5
            this.ctx.closePath()
            this.ctx.restore()
        }
    }

    drawPeriod() {
        for (let i = 1; i < this.params.thread.width; i += this.data.period * this.params.thread.step) {
            this.ctx.save()
            this.ctx.beginPath();
            this.ctx.translate(i, 0)
            this.ctx.moveTo(-2, 0);
            this.ctx.lineTo(-2, this.params.thread.height);
            this.ctx.lineWidth = 1.5
            this.ctx.strokeStyle = "blue"
            this.ctx.stroke();
            this.ctx.closePath()
            this.ctx.restore()
        }
    }

    drawDeadline() {
        for (let i = 1; i < this.params.thread.width; i += this.data.deadline * this.params.thread.step) {
            this.ctx.save()
            this.ctx.beginPath();
            this.ctx.translate(i, 0)
            this.ctx.moveTo(0 + 2, 0);
            this.ctx.lineTo(0 + 2, this.params.thread.height);
            this.ctx.lineWidth = 1.5
            this.ctx.strokeStyle = "red"
            this.ctx.stroke();
            this.ctx.closePath()
            this.ctx.restore()
        }
    }
    drawExecutions() {
        this.executions.forEach(exe => {
            for (let i = 0; i < this.params.thread.width / this.params.thread.step; i += 1) {
                if (exe.task == this.index && i == exe.pos) {
                    this.ctx.save()
                    this.ctx.beginPath();
                    this.ctx.translate(i * this.params.thread.step, 0)
                    this.ctx.rect(0, 10, this.params.thread.step, 50);
                    this.ctx.strokeStyle = "blue"
                    this.ctx.lineWidth = 2
                    this.ctx.stroke();
                    this.ctx.closePath()
                    this.ctx.restore()
                }
            }
        });
    }

    drawBP() {

        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.translate(this.params.thread.step * this.BP, 0)
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.params.thread.height * 2);
        this.ctx.strokeStyle = "green"
        this.ctx.lineWidth = 3
        this.ctx.stroke();
        this.ctx.closePath()
        this.ctx.restore()

    }

    bind() {

    }
}

export default Thread