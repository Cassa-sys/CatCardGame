<script setup lang="ts">
import { Card } from '../Card';

const props = defineProps({
    deck: Array<Card>
})
</script>

<template>
    <div class="deckFlex">
        <div class="card" v-for="card in deck">
            {{ card.name }}
            <br />
            {{ card.description }}
        </div>
    </div>
</template>



<style lang="css" scoped>
    .deckFlex {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        /* padding: 0; */

        background-color: black;
    }
    .card {
        min-width: 20%;
        height: 25vh;
        padding: 12px;

        background-color: darkkhaki;
        color: white;
    }
</style>