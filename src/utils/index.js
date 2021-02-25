export const delay = async function(duration = 1500) {
    return await new Promise(reslove => {
        setTimeout(() => {
            reslove();
        }, duration);
    });
};
