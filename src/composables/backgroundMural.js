// composables/backgroundMural.js
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default function useBackgroundMural() {
  const backgroundColor = ref('#ffffff')

  const handleScroll = () => {
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const percent = Math.min(scrollY / maxScroll, 1)

    const start = { r: 255, g: 255, b: 255 }
    const mid = { r: 255, g: 255, b: 102 }
    const end = { r: 255, g: 140, b: 0 }

    let r, g, b

    if (percent < 0.5) {
      const p = percent / 0.5
      r = start.r + (mid.r - start.r) * p
      g = start.g + (mid.g - start.g) * p
      b = start.b + (mid.b - start.b) * p
    } else {
      const p = (percent - 0.5) / 0.5
      r = mid.r + (end.r - mid.r) * p
      g = mid.g + (end.g - mid.g) * p
      b = mid.b + (end.b - mid.b) * p
    }

    backgroundColor.value = `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    backgroundColor
  }
}
