export function PickRandomFromArray(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
}


export function PickRandomIndexFromArray(array: Array<any>) {
    return Math.floor(Math.random() * array.length)
}