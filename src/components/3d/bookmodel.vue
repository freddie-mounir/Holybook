<template>
  <div class="book-model" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  modelPath: String,
  coverTexture: String,
  position: { type: Object, default: () => ({ x: 0, y: 0, z: 0 }) },
  scale: { type: Number, default: 1 },
  scrollSpeed: { type: Number, default: 1 }
})

const container = ref(null)
const { scrollYProgress } = useScrollAnimation()
let scene, camera, renderer, bookModel

const initThree = async () => {
  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8f8f8)

  // Camera
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight)

  // Load model
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync(props.modelPath)
  const initThree = async () => {
  console.log('Initializing Three.js scene');
  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8f8f8)

  // Camera
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 2)
  scene.add(directionalLight)

  // Load model
  console.log('Loading model:', props.modelPath);
  const loader = new GLTFLoader()
  try {
    const gltf = await loader.loadAsync(props.modelPath)
    bookModel = gltf.scene
    console.log('Model loaded successfully:', bookModel);
  } catch (error) {
    console.error('Error loading model:', error);
    return;
  }

  // Load cover texture if provided
  if (props.coverTexture) {
    console.log('Loading texture:', props.coverTexture);
    const textureLoader = new THREE.TextureLoader()
    try {
      coverTexture = await textureLoader.loadAsync(props.coverTexture)
      console.log('Texture loaded successfully:', coverTexture);

      // Apply texture to book cover
      bookModel.traverse((child) => {
        if (child.isMesh && child.name === 'cover') {
          console.log('Applying texture to mesh:', child.name);
          child.material.map = coverTexture
          child.material.needsUpdate = true
        }
      })
    } catch (error) {
      console.error('Error loading texture:', error);
    }
  }

  // Position and scale
  bookModel.position.set(props.position.x, props.position.y, props.position.z)
  bookModel.scale.set(props.scale, props.scale, props.scale)

  scene.add(bookModel)
  console.log('Model added to scene');

  // Start animation loop
  animate()
}

  // Load cover texture
  const textureLoader = new THREE.TextureLoader()
  coverTexture = await textureLoader.loadAsync(props.coverTexture)

  // Apply texture to book cover
  bookModel.traverse((child) => {
    if (child.isMesh && child.name === 'cover') {
      child.material.map = coverTexture
      child.material.needsUpdate = true
    }
  })

  // Position and scale
  bookModel.position.set(props.position.x, props.position.y, props.position.z)
  bookModel.scale.set(props.scale, props.scale, props.scale)

  scene.add(bookModel)

  // Start animation loop
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)

  // Update rotation based on scroll
  if (bookModel) {
    bookModel.rotation.y = scrollYProgress.value * Math.PI * 2 * props.scrollSpeed
    bookModel.position.y = props.position.y + Math.sin(scrollYProgress.value * Math.PI * 2) * 0.2
  }

  renderer.render(scene, camera)
}

// Handle resize
const onResize = () => {
  if (container.value) {
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
  }
})

// Watch for scroll changes
watch(scrollYProgress, (newVal) => {
  // Additional scroll-based animations can be added here
})
</script>

<style scoped>
.book-model {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
}
</style>
