import { Card } from "./Card";
import { Deck } from "./Deck";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { enemyStatus, playerStatus } from "./Status";
export var Cards = [
    new Card("Pat the Cat!", "Raises Annoyance by 6.", 1, "Energy", () => {Enemy.changeHealth(-6 - playerStatus.strength.amount)}),
    new Card("Bandage", "Heal 5", 1, 'Energy', () => {Player.changeHealth(5)}),
    new Card("Move Away", "Block 5", 1, 'Energy', () => {Player.changeBlock(5)}),
    new Card("Coffee Shot", "Gain 2 Energy\nTake 5 Damage", 5, 'Health', () => {Player.energy += 2}),
    new Card("Draw", "Draw 2", 1, "Energy", () => {Deck.drawCard(); Deck.drawCard()}),
    new Card("Cat Patter", "Strength 1", 1, "Energy", () => {playerStatus["strength"].addAmount(1)}),
    new Card("Coin Flip", "50% Deal 8 Annoyance, 50% Block 8", 1, "Energy", () => {Math.random() >= 0.5 ? Player.changeBlock(8) : Enemy.changeHealth(-8 - playerStatus.strength.amount)}),
    new Card("Auto Pat!", "Poison 3", 1, "Energy", () => {enemyStatus.poison.amount += 3}),
    new Card("Multi-Pat", "3 Annoyance - Twice!", 1, "Energy", () => {Enemy.changeHealth(-3 - playerStatus.strength.amount); Enemy.changeHealth(-3 - playerStatus.strength.amount)}),
    new Card("Get Bit", "Strength 4\nTake 5 Damage", 1, "Energy", () => {
        Player.changeHealth(-5);
        playerStatus.strength.addAmount(4)
    }),
    new Card("Cleanse", "Remove all negative effects", 1, "Energy", () => {playerStatus.poison.amount = 0})
]