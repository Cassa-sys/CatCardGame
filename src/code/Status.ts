import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { reactive } from 'vue';

export class Status {
    name: String;
    description: String;
    amount: number;
    effect: VoidFunction;


    constructor(name: String, description: String, amount: number, effect: VoidFunction) {
        this.name = name;
        this.description = description;
        this.amount = amount;

        this.effect = effect;
    }

    addAmount(amount: number) {
        this.amount += amount;
    }

    turnDecrease() {
        this.amount = Math.max(this.amount - 1, 0)
    }

    clear() {
        this.amount = 0;
    }
}


export var playerStatus = reactive({
    "strength": new Status("Strength", "With the power of a thousand pats, your pats raise the cats annoyance faster! Cards deal +1 per stack!", 1, () => {/* Implemented Elsewhere*/}),
    "poison": new Status("Ew... Hair Ball!", "The cat decided to wake up and choose violence! \n Deals annoyance damage by #Stacks at end of your turn. Then decreases by 1.", 0, () => {Player.changeHealth(-playerStatus["poison"].amount);}),
})

export var enemyStatus = reactive({
    "strength": new Status("Strength", "The cat sharpens its paws at the nearby post! Deals +1 annoyance per stack!", 0, () => {/* Implemented Elsewhere*/}),
    "poison": new Status("Auto Patter!", "With the power of science, it pats the cat for you!\n Raises annoyance by #Stacks at end of your turn. Then decreases by 1.", 0, () => {Enemy.changeHealth(-enemyStatus["poison"].amount);}),
})