<script setup lang="ts">
import {ref} from 'vue'
import { Player } from '../Player.ts';
import CardObj from './CardObj.vue';
import { Deck } from '../Deck.ts';
import ViewDeck from './ViewDeck.vue';
import { textSpanIsEmpty } from 'typescript';
import { Enemy } from '../Enemy.ts';
import Bar from './Bar.vue';
import Name from './Name.vue';
import { enemyStatus, playerStatus } from '../Status.ts';
import Status from './Status.vue';

function indexLoop(index: number, array: Array<any>) {
    if (index + 1 == array.length) {
        return 0;
    } else {
        return index + 1;
    }
}

function nextTurn() {
    // Enemy Move Logic
    Enemy.moveset[Enemy.currentMove]?.doMove();
    Enemy.currentMove = indexLoop(Enemy.currentMove, Enemy.moveset);

    Deck.drawHandTurn()
    Player.energy = 3;
    Player.block = 0;
    Deck.checkPlayableHand();

    enemyStatus.poison.effect();
    enemyStatus.poison.turnDecrease();

    playerStatus.poison.effect();
    playerStatus.poison.turnDecrease();
}
</script>


<template>
    <div class = "gameZone" style = "display: flex">
        <div style="min-width: 50%; min-height: 80%; border: 1px solid black;">
        <Name></Name>
        <Bar :color="'Red'" :value="Player.health" :max-value="Player.maxHealth"></Bar>
        <Bar :color="'Blue'" :value="Player.block" :max-value="Player.maxHealth"></Bar>
        <h1> Energy: {{ Player.energy }}</h1>


        <!-- <button @click="Deck.drawNewHand()"></button> -->

        <div style="display: flex">
            <div v-for="status in playerStatus">
                <Status :status="status"></Status>
            </div>
        </div>


        
        </div>

        <div style="min-width: 50%; min-height: 80%; border: 1px solid black">
        <h1 style="height: 10vh; font-size: 4cqi; color: white">{{ Enemy.name }}</h1>
        <Bar :color="'Red'" :value="Enemy.health" :max-value="Enemy.maxHealth"></Bar>
        <h1 v-if="!Enemy.moveset[Enemy.currentMove]?.status">Will do: {{ Math.floor(Enemy.moveset[Enemy.currentMove]?.damageMultiplier! * Enemy.damage) }} damage {{ Enemy.moveset[Enemy.currentMove]?.amount }} times</h1>
        <h1 v-if="Enemy.moveset[Enemy.currentMove]?.target=='Enemy'">Will gain: {{ Enemy.moveset[Enemy.currentMove]?.amount }} {{ Enemy.moveset[Enemy.currentMove]?.status }}</h1>
        <h1 v-if="Enemy.moveset[Enemy.currentMove]?.target!='Enemy' && Enemy.moveset[Enemy.currentMove]?.status">Will give you: {{ Enemy.moveset[Enemy.currentMove]?.amount }} {{ Enemy.moveset[Enemy.currentMove]?.status }}</h1>
        <div style="display: flex">
            <div v-for="status in enemyStatus">
                <Status :status="status"></Status>
            </div>
        </div>
        <button style="position: absolute; bottom: 15px; right: 15px;" @click="nextTurn()">End Turn</button>
        </div>
    </div>
</template>


<style lang="css" module>


</style>