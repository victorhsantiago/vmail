import { onBeforeUnmount } from 'vue'

const useKeydown = (keyCombos) => {
  const onKeydown = (event) => {
    const keyCombo = keyCombos.find((keyCombo) => keyCombo.key === event.key)
    keyCombo && keyCombo.fn()
  }

  window.addEventListener('keydown', onKeydown)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}

export default useKeydown
