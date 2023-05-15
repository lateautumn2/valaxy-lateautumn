<script setup lang="ts">
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'
import {ref} from "vue"

const startTime = ref('2021/08/08 18:08:08')
const day = ref(0)
const hour = ref(0)
const min = ref(0)
const second = ref(0)

const setTime = ()=>{
let seconds = 1000;
let minutes = seconds * 60;
let hours = minutes * 60;
let days = hours * 24;
const nowTime = new Date().getTime()
const diff = nowTime - new Date(startTime.value).getTime()
day.value = Math.floor(diff/days)
hour.value = Math.floor((diff - (day.value*days))/hours)
min.value = Math.floor((diff - (day.value*days)-hour.value*hours)/minutes)
second.value = Math.floor((diff - day.value*days-hour.value*hours-min.value*minutes)/seconds)
}
setInterval(()=>{
    setTime()
},1000)

</script>

<template>
    <div>
        <YunFooter>
            本博客已经运行 {{ day }} 天 {{ hour }} 小时 {{ min }} 分钟 {{ second }} 秒(●'◡'●)
        </YunFooter>
    </div>
</template>


<style scoped></style>