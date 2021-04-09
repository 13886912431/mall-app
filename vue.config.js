const px2rem = require("postcss-px2rem");

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
    devServer: {
        open: true
    },
    productionSourceMap: !(process.env.VUE_APP_ENV === "prod"),
    outputDir: "docs",
    publicPath: process.env.VUE_APP_ENV === "prod" ? "https://13886912431.github.io/mall-app" : "/"
};
