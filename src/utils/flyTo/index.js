import Vue from "vue";
import flyTo from "./index.vue";

const FlyTo = Vue.extend(flyTo);

export default ({
    src,
    width,
    height,
    startX,
    startY,
    endX,
    endY,
}) => {
    const fly = new FlyTo({
        el: document.createElement("div"),
        data() {
            return {
                src,
                width,
                height,
                startX,
                startY,
                endX: startX,
                endY: startY,
                opacity: 1,
                scale: 1,
            }
        }
    });

    document.body.appendChild(fly.$el);

    fly.$el.addEventListener("transitionend", () => {
        fly.$el.remove();
    })

    setTimeout(() => {
        fly.endX = endX;
        fly.endY = endY;
        fly.opacity = 0;
        fly.scale = 0;
    }, 0);
}
