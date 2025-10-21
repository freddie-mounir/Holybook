<template>
  <div class="category-view">
    <div class="category-header">
      <h1>{{ categoryName }}</h1>
      <p>Explore our {{ categoryName }} collection</p>
    </div>
    
    <div class="category-3d-container">
      <BookModel 
        v-for="book in books"
        :key="book.id"
        :model-path="book.modelPath"
        :cover-texture="book.coverTexture"
        :scroll-speed="book.scrollSpeed"
        :position="{ x: (index - books.length / 2) * 2, y: 0, z: 0 }"
      />
    </div>
    
    <div class="book-grid">
      <BookCard 
        v-for="book in books" 
        :key="book.id" 
        :book="book"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookModel from '../components/3d/bookmodel.vue'
import BookCard from '../components/ui/BookCard.vue'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { addToCart } = useCart()

const books = ref([
  // This would normally be loaded from an API based on the category
  {
    id: 1,
    title: 'Sample Book 1',
    author: 'Author Name',
    price: 24.99,
    category: 'fiction',
    modelPath: '/models/book1.glb',
    coverTexture: '/textures/cover1.jpg',
    scrollSpeed: 1.2
  },
  {
    id: 2,
    title: 'Sample Book 2',
    author: 'Author Name',
    price: 29.99,
    category: 'fiction',
    modelPath: '/models/book2.glb',
    coverTexture: '/textures/cover2.jpg',
    scrollSpeed: 0.8
  },
  {
    id: 3,
    title: 'Sample Book 3',
    author: 'Author Name',
    price: 34.99,
    category: 'fiction',
    modelPath: '/models/book3.glb',
    coverTexture: '/textures/cover3.jpg',
    scrollSpeed: 1.0
  }
])

const categoryName = computed(() => {
  const id = route.params.id
  return id.charAt(0).toUpperCase() + id.slice(1)
})

// In a real app, you would fetch books based on the category ID
onMounted(() => {
  console.log('Category ID:', route.params.id)
  // fetchBooks(route.params.id)
})
</script>

<style scoped>
.category-view {
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
}

.category-header {
  text-align: center;
  margin-bottom: 3rem;
}

.category-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.category-header p {
  color: #666;
  font-size: 1.2rem;
}

.category-3d-container {
  height: 60vh;
  margin-bottom: 3rem;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .category-view {
    padding: 5rem 1rem 1rem;
  }
  
  .book-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
}
</style>
