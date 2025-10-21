import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const scrollY = ref(0)
  const scrollYProgress = ref(0)
  const windowHeight = ref(window.innerHeight)
  const documentHeight = ref(document.body.scrollHeight - window.innerHeight)

  const onScroll = () => {
    scrollY.value = window.scrollY
    scrollYProgress.value = Math.min(scrollY.value / (document.body.scrollHeight - window.innerHeight), 1)
  }

  const onResize = () => {
    windowHeight.value = window.innerHeight
    documentHeight.value = document.body.scrollHeight - windowHeight.value
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  })

  return {
    scrollY,
    scrollYProgress,
    windowHeight,
    documentHeight
  }
}
