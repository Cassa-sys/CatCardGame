import { PickRandomFromArray } from "./helper/PickRandom";

export function generateEnemyName(): String {
    let enemyName: String = "";
    enemyName = PickRandomFromArray(names) + " the " + PickRandomFromArray(species);   
    return enemyName;
}


var names = [
    "Mewo",
    "Mochi",
    "Miso",
    "Moon"
]
var species = [
    "Shorthair",
    "Maine Coon",
    "Ragdoll",
    "Siamese",
]