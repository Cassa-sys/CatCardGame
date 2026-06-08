<script setup lang="ts">
const props = defineProps({
    value: Number,
    maxValue: Number,
    color: String
})
</script>


<template>
    <div style="width: 100%; height: 10vh; background-color: black; align-items: center;" >
        <div class="innerBar"><h1>{{ value }}/{{ maxValue }}</h1></div>
    </div>

</template>

<style lang="css" scoped>
    .innerBar {
        width: calc(calc(v-bind(value) / v-bind(maxValue))*100%);
        background-color: v-bind(color);
        padding: 0;
        height: 100%;
        align-content: center;
    }
</style>