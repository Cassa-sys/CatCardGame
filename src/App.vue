<script setup lang="ts">
import {ref} from 'vue'
import { Player } from './code/Player.ts';
import CardObj from './code/components/CardObj.vue';
import { Deck } from './code/Deck.ts';
import ViewDeck from './code/components/ViewDeck.vue';
import { textSpanIsEmpty } from 'typescript';
import { Enemy } from './code/Enemy.ts';
import Bar from './code/components/Bar.vue';
import Name from './code/components/Name.vue';
import GameBoard from './code/components/GameBoard.vue';
import { tab, swapTab } from './code/helper/swapTab.ts';
import CardReward from './code/components/CardReward.vue';

Deck.init()
Deck.drawNewHand();
</script>

<template> 
<div style='color: white; background-color: black;'>

</div>
  <GameBoard v-if="tab == 1"/>
  <ViewDeck :deck="Deck.undrawnCards" style="display: disabled;" v-if="tab == 2"/>
  <ViewDeck :deck="Deck.discarded" style="display: disabled;" v-if="tab == 3"/>
  <CardReward v-if="tab == 4"></CardReward>
  <!-- Deck -->
  <div class="bottom">
    <button id="notDrawn" @click="swapTab(2)">
      {{Deck.undrawnCards.length}}
      <br/>
      See Deck
    </button>
    <div id="hand">
      <CardObj v-for="(card, index) in Deck.hand" :card="card" :position-in-hand="index" :cards-in-hand="Deck.hand.length"></CardObj>
    </div>
    <button id="discarded" @click="swapTab(3)">
      {{ Deck.discarded.length }}
      <br/>
      See Discarded
    </button>
  </div>
  <button v-if="tab !== 1 && tab !== 4" @click="swapTab(1)">Go Back</button>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.gameZone {
  position: relative;
  min-height: 100%;
  width: 100%;
  min-height: 80vh;
  background-color: #282a36;
}

.bottom {
  min-width: 100%;
  width:100%;
  min-height: 10vh;
  /* background-color: yellow; */
  display: flex;
}

.bottom * {
  /* position: relative; */
  height: 10vh;
  width: 100%;
  padding: 0;
}
#hand {
  min-width: 80%;
  display: flex;
  justify-content: center;
}
#hand * {
  width: auto;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}


</style>
