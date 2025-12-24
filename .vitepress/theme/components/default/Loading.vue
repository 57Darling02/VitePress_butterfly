<template>
    <div class="loading-screen">
        <div class="loading">
            <h6>加载中</h6>
            <div class="dot" v-for="i in 36"></div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { } from 'vue'
</script>
<style lang="scss" scoped>
@use "sass:math";
@use "sass:string";

.loading-screen {
    position: fixed;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

$containerSize: 128px;
$ballSize: 8px;
$n: 36;
$pDeg: calc(360deg / $n);
$time: 2.5s;

.loading {
    width: $containerSize;
    height: $containerSize;
    margin: 50px auto;
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
        position: absolute;
        left: 50%;
        top: 0;
        width: $ballSize;
        height: $ballSize;
        margin-left: -(calc($ballSize / 2));
        margin-top: -(calc($ballSize / 2));
        perspective: 70px;
        transform-style: preserve-3d;
        transform-origin: center calc($containerSize /2) + calc($ballSize / 2);

        @for $i from 2 through $n {
            &:nth-child(#{$i}) {
                transform: rotate($pDeg * ($i - 1));
                &::before,
                &::after {
                    animation-delay: - calc($time / $n) * ($i - 1) * 6;
                }
            }


        }

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        &::before {
            background-color: red;
            top: -100%;
            animation: rotation-black $time infinite;

            @keyframes rotation-black {
                0% {
                    animation-timing-function: ease-in;
                }

                25% {
                    transform: translate3d(0, 100%, $ballSize);
                    animation-timing-function: ease-out;
                }

                50% {
                    transform: translate3d(0, 200%, 0);
                    animation-timing-function: ease-in;
                }

                75% {
                    transform: translate3d(0, 100%, -$ballSize);
                    animation-timing-function: ease-out;
                }
            }
        }

        &::after {
            background-color: blueviolet;
            top: 100%;
            animation: rotation-white $time infinite;

            @keyframes rotation-white {
                0% {
                    animation-timing-function: ease-in;
                }

                25% {

                    transform: translate3d(0, -100%, -$ballSize);
                    animation-timing-function: ease-out;
                }

                50% {

                    transform: translate3d(0, -200%, 0);
                    animation-timing-function: ease-in;
                }

                75% {

                    transform: translate3d(0, -100%, $ballSize);
                    animation-timing-function: ease-out;
                }
            }
        }
    }

}






// .loading{
//     animation: pulse 1.5s ease-in-out infinite;

// }
@keyframes pulse {
    0% {
        opacity: 0.8;
        transform: scale(1);
    }

    50% {
        opacity: 0.3;
        transform: scale(0.98);
    }

    100% {
        opacity: 0.8;
        transform: scale(1);
    }
}
</style>