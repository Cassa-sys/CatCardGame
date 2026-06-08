<script setup lang="ts">
import type { Card } from '../Card';
import { Cards } from '../Cards';
import { Deck } from '../Deck';
import { PickRandomFromArray, PickRandomIndexFromArray } from '../helper/PickRandom';
import { swapTab } from '../helper/swapTab';
import { Player } from '../Player';

var cardRewards: Card[] = [PickRandomFromArray(Cards), PickRandomFromArray(Cards), PickRandomFromArray(Cards)]

function generateNewCards() {
    let i1, i2, i3 = 0;
    i1 = PickRandomIndexFromArray(Cards);
    i2 = PickRandomIndexFromArray(Cards);
    while (i2 == i1) {
        i2 = PickRandomIndexFromArray(Cards)
    }
    i3 = PickRandomIndexFromArray(Cards);
    while (i3 == i1 || i3 == i2) {
        i3 = PickRandomIndexFromArray(Cards)
    }

    cardRewards = [Cards[i1]!, Cards[i2]!, Cards[i3]!]
}

generateNewCards()

function addCard(index: number) {
    Deck.addNewCard(cardRewards[index]!);
    generateNewCards();
    swapTab(1);
}

function rest() {
    Player.health = Player.maxHealth;
    swapTab(1);
}

</script>

<template>
    <div style="justify-content: center; align-items: center; height: 75vh; min-width: 100%; display: flex; flex-direction: column; background-color: #282a36;">
        <button @click="rest()" class="rest">
            Rest to full HP?
            <br/>
            {{ Player.health }} / {{ Player.maxHealth }}
        </button>
        <br/>
        or add one Card to your deck:
        <br/>
        <div class="cardHolder">
            <div v-for="(card, index) in cardRewards">
                <button @click="addCard(index)" class="cardReward">
                    {{ card.name }}
                    <br/>
                    {{ card.description }}
                </button>
            </div>
        </div>
    </div>


</template>


<style lang="css" scoped>
    .cardHolder {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .cardReward {
        height: 20vh;
        width: 10vw;
        margin: 5px;
    }
    .rest {
        align-content: center;
    }
</style>