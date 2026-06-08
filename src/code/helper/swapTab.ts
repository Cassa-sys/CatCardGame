import { ref } from 'vue'
export var tab = ref(4)

export function swapTab(id: number) {
    tab.value=id
}