import { ref } from 'vue'
export var tab = ref(1)

export function swapTab(id: number) {
    tab.value=id
}