<script setup lang="ts">
import { Status } from '../Status';
import { ref } from 'vue'

const props = defineProps<{
     status: Status
}>();

const mouseX = ref(0)
const mouseY = ref(0)
const isVisible = ref(false)

// Update coordinates on the fly and show the element
const updateMousePosition = (event: { clientX: number; clientY: number; }) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
  isVisible.value = true
}

// Hide the element when mouse leaves the container
const hideElement = () => {
  isVisible.value = false
}

</script>


<template>
    <div class="status" v-if="status.amount != 0" @mousemove="updateMousePosition" @mouseleave="hideElement()">
        {{status.amount}} {{ status.name }}
    </div>
    <div class="hoverable" v-if="isVisible" :style="{ transform: `translate3d(${mouseX}px, ${mouseY}px, 0)` }"">
            {{ status.description }}
    </div>
</template>


<style lang="css" scoped>
    .status {
        border: 1px solid black;
        margin: 1px;
        user-select: none;
    }
    .hoverable {
    position: fixed;
    top: 0;
    left: 0;
    /* Disable interaction so it doesn't block mouse movements */
    pointer-events: none; 
    z-index: 9999;
    
    /* Offset it slightly so it doesn't cover the exact pointer */
    margin-top: 15px;
    margin-left: 15px;

    /* Basic styling */
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    }
</style>