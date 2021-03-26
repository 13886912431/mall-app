export async function delay(duration = 1500) {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

/**
 * 防抖
 * @param {*} func 需要执行的函数
 * @param {*} wait 间隔时间
 */
export function debounce(func, wait = 300) {
    if (typeof func !== "function") return;
    let timer = null;
    return function(...arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arg);
        }, wait);
    };
}
