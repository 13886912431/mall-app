/**
 * 动画函数
 * @param {*} option 配置对象
 */
export default function Animate(option) {
    const defaultOption = {
        begin: null,
        end: null,
        complete: null,
        onmove: null,
        duration: 400,
        tick: 16, // 16毫秒移动一次
    };

    this.option = { ...defaultOption, ...option };

    // 调用该函数，如果目标值与当前值相同就返回
    let flag = true;
    for (const prop in this.option.begin) {
        if (this.option.end[prop] !== this.option.begin[prop]) {
            flag = false;
        }
    }
    if (flag) {
        return;
    }

    // 计时器
    this.timer = null;
    // 次数：需要移动多少次
    this.times = Math.ceil(this.option.duration / this.option.tick);
    // 当前移动次数
    this.curTimes = 0;
    // 当前数据
    this.current = { ...this.option.begin };

    function getSpeed() {
        const distance = {}, // 需要移动的距离
            speed = {}; // 每次移动多少距离
        for (const prop in this.option.begin) {
            distance[prop] = this.option.end[prop] - this.option.begin[prop];
            speed[prop] = distance[prop] / this.times;
        }
        return speed;
    }
    // 速度
    this.speed = getSpeed.call(this);
    this.start();
}

Animate.prototype.start = function () {
    const self = this;
    function move() {
        self.timer = requestAnimationFrame(move);
        self.curTimes++;
        for (const prop in self.option.begin) {
            if (self.curTimes === self.times) {
                // 停止
                self.current[prop] = self.option.end[prop];
                self.stop();
            } else {
                self.current[prop] += self.speed[prop];
            }
        }
        typeof self.option.onmove === "function" && self.option.onmove(self.current);
    }
    this.timer = requestAnimationFrame(move);
};

Animate.prototype.stop = function () {
    cancelAnimationFrame(this.timer);
    this.timer = null;
    typeof this.option.complete === "function" && this.option.complete();
};
