import { reactive } from "vue"
export var Player = reactive({
    health: 100,
    maxHealth: 100,
    handSize: 9,
    block: 0,
    defaultHandSize: 5,
    energy: 3,
    score: 0,


    changeHealth: (amount: number) => {
        if (amount <= 0) {
            let initialAmount = amount
            amount += Player.block
            amount = Math.min(amount, 0)
            Player.block = Math.max(Player.block + initialAmount, 0)
            Player.health += amount
        }
        if (amount >= 0) {
            Player.health = Math.min(Player.maxHealth, Player.health + amount)
        }
        if (Player.health <= 0) {
            alert("You have succumb to the cats scratches! Score: " + Player.score );
        }
    },

    changeBlock: (amount: number) => {
        Player.block += amount
    }
})