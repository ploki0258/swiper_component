const options = {
    data() {
        return {
            currentTime: "",
            timer: null,
            items: [],
            currentItemIndex: 0,
            currentItem: {},
        };
    },
    methods: {
        /**
         * 初始化
         */
        init() {
            console.log("init");
        },
        /**
         * 顯示當前時間
         */
        updateCurrentTime() {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            hours = hours < 10 ? `0${hours}` : hours;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            this.currentTime = `${hours}:${minutes}:${seconds}`;
        },
        /**
         * 持續更新當前時間
         */
        loopUpdateCurrentTime() {
            this.updateCurrentTime();
            this.stopUpdateCurrentTime();
            // 每秒更新一次，直到停止
            this.timer = setInterval(() => {
                this.updateCurrentTime();
            }, 1000);
        },
        /**
         * 停止更新時間
         */
        stopUpdateCurrentTime() {
            clearInterval(this.timer);
        },
        /**
         * 初始化資料(從後端抓取資料)
         */
        async initItems() {
            const result = await fetch("/database/swiper.json");
            const data = await result.json();
            this.items = data;
            // console.log(this.items);
            this.currentItem = this.items[this.currentItemIndex];
        },
        setItem(index) {
            this.$refs.swiper.classList.add("change");
            setTimeout(() => {
                this.currentItemIndex = index;
                this.currentItem = this.items[this.currentItemIndex];
                this.$refs.swiper.classList.remove("change");
            }, 600);
        },
    },
    mounted() {
        this.init();
        this.loopUpdateCurrentTime();
        // 一次性計時器
        // setTimeout(() => {
        //     this.stopUpdateCurrentTime();
        // }, 10000);
        this.initItems();
    },
};

const { createApp } = Vue;

createApp(options).mount("#swiper-app");
