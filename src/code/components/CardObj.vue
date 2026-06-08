<script setup lang="ts">
import { Card } from '../Card';
import { Deck } from '../Deck';
import { ref } from "vue"
import { Player } from '../Player';
const props = defineProps({
    card: Card,
    positionInHand: Number,
    cardsInHand: Number
})
</script>

<template>
    <div class="card">
        <button @click="Deck.playCard(positionInHand!)" :disabled="!card?.playable">
            {{ card?.name }}
            <br/>
            {{ card?.description }}
            <br />
            <!-- {{ card?.costPool }} - {{ card?.cost }} -->
        </button>
    </div>
</template>

<style lang="css" scoped>
/* Need to calculate what degree for each card in hand */
.card {
    --middle: calc(calc(v-bind(cardsInHand) / 2) - 0.5);
    --angle: calc(v-bind(positionInHand) - var(--middle));
    transform: rotateZ(calc(8deg * var(--angle)));
    /* transform: rotateZ(-15deg); */

    transition: transform 0.3s ease-in-out;
}
.card:hover {
    z-index: 1;
    transform: scale(1.5)
}

.card * {
    min-height: 13vh;
    max-width: 5vw;
}
</style>