import type { Card } from "./Card";
import { Cards } from "./Cards"
import { PickRandomFromArray, PickRandomIndexFromArray } from "./helper/PickRandom";
import { Player } from "./Player"

import { reactive } from "vue";
export var Deck = reactive({
    hand: [] as Card[],
    discarded: [] as Card[],
    undrawnCards: [] as Card[],
    deckCards: [] as Card[],

    init() {
        this.addNewCard(Cards[0]!);
        this.addNewCard(Cards[0]!);
        this.addNewCard(Cards[0]!);
        this.addNewCard(Cards[1]!);
        this.addNewCard(Cards[2]!);
        this.addNewCard(Cards[2]!);

        this.undrawnCards = this.deckCards;
    },

    drawCard() {
        if (this.hand.length >= Player.handSize) {
            return;
        }
        if (this.undrawnCards.length == 0) {
            this.undrawnCards = this.discarded;
            this.discarded = [];
        }

        let i = PickRandomIndexFromArray(this.undrawnCards);
        const card = this.undrawnCards[i];
        if (card) {
            this.hand.push(card);

            this.undrawnCards.splice(i, 1);
        }

    },

    playCard(indexInHand: number) {
        this.hand[indexInHand]?.play()
        this.discarded.push(this.hand[indexInHand]!)
        this.hand.splice(indexInHand, 1)


        this.checkPlayableHand()
    },


    checkPlayableHand() {
        this.hand.forEach((card) => {
            card.playable = card.checkPlayable();
        })
    },

    drawNewHand() {
        this.hand.forEach((card) => {
            this.discarded.push(card)
        })
        this.discarded = [];
        this.undrawnCards = this.deckCards;
        for (let index = 0; index < Player.defaultHandSize; index++) {
            this.drawCard();
        }

        this.undrawnCards = this.deckCards;
    },

    drawHandTurn() {
        this.hand.forEach((card) => {
            this.discarded.push(card)
        })
        this.hand = [];
        for (let index = 0; index < Player.defaultHandSize; index++) {
            this.drawCard();
        }
    },

    addNewCard(card: Card) {
        this.deckCards.push(card);
    }
})