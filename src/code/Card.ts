import { Player } from "./Player";
export class Card {
    name: string;
    description: string;
    effect: VoidFunction;
    cost: number;
    costPool: string;
    playable: boolean;

    constructor(name: string, description: string, cost: number, costPool: string, effect: VoidFunction) {
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.cost = cost;
        this.costPool = costPool

        if (costPool == "Energy" && cost > Player.energy) {
            this.playable = false
        } else {
            this.playable = true
        }
    }

    play() {
        if (this.costPool == "Energy" && this.cost <= Player.energy) {
            Player.energy -= this.cost
            this.effect()
        } else if (this.costPool == "Health") {
            Player.changeHealth(-this.cost)
            this.effect()
        }
    }

    checkPlayable(): boolean {
        if (this.costPool == "Energy" && this.cost > Player.energy) {
            return false;
        } else {
            return true
        }
    }
}