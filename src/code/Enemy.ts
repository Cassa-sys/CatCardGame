import { Deck } from "./Deck";
import { generateEnemyName } from "./EnemyNames";
import { PickRandomFromArray } from "./helper/PickRandom";
import { Player } from "./Player";
import { enemyStatus, playerStatus } from "./Status";
import { reactive } from 'vue'
import { swapTab } from "./helper/swapTab";


class move {
    amount: number;
    damageMultiplier: number;
    status?: keyof typeof playerStatus;
    target?: String


    constructor(amount: number, damageMultiplier: number, status?: keyof typeof playerStatus | keyof typeof enemyStatus, target?: String) {
        this.amount = amount;
        this.damageMultiplier = damageMultiplier;
        this.status = status;
        this.target = target;
    }

    doMove() {
        if (this.status) {
            if (this.target  == "Enemy") {
                for (let i = 0; i < this.amount; i++) {
                    enemyStatus[this.status].amount += 1
                }
                
            } else {
                for (let i = 0; i < this.amount; i++) {
                    playerStatus[this.status].amount += 1
                }
            }
        } else {
            for (let i = 0; i < this.amount; i++) {
                Player.changeHealth(-Math.floor((Enemy.damage + enemyStatus.strength.amount) * this.damageMultiplier))
            }
        }
    }
}

var movesets = [
    [
        new move(1, 1)
    ],
    [
        new move(1, 0, "poison"),
        new move(1, 1),
        new move(2, 0, "poison")
    ],
    [
        new move(4, 0.2),
        new move(2, 0.5),
        new move(1, 0, "strength", "Enemy"),
    ],
    [
        new move(2, 0, "poison")
    ]
    
]


export var Enemy = reactive({
    health: 25,
    maxHealth: 25,
    name: generateEnemyName(),
    damage: 10,
    moveset: movesets[0] as move[],
    currentMove: 0,

    constructor(health: number, damage: number) {
        this.generateNewEnemy(health, damage, PickRandomFromArray(movesets));
    },

    generateNewEnemy(health: number, damage: number, moveset: move[]) {
        this.name = generateEnemyName();
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.moveset = moveset;
        this.currentMove = 0;
    },


    changeHealth(amount: number) {
        if (Math.abs(amount) > this.health && amount <= 0) {
            this.onDeath()
            return;
        } else {
            this.health += amount;
        }
    },

    onDeath() {
        this.generateNewEnemy((this.health + 25), this.damage * 1.2, PickRandomFromArray(movesets));
        Player.score += this.health;

        for (const key of Object.keys(playerStatus) as (keyof typeof playerStatus)[]) {
            playerStatus[key].clear();
        }
        for (const key of Object.keys(enemyStatus) as (keyof typeof enemyStatus)[]) {
            enemyStatus[key].clear();
        }
        Player.energy = 3;
        Player.block = 0;

        Deck.drawNewHand();
        // Generate new Card
        swapTab(4);
    }

})