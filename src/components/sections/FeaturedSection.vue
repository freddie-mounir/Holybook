<template>
  <section id="featured" class="featured-section">
    <div class="section-header">
      <h2>Featured Books</h2>
      <p>Discover our hand-picked selection</p>
    </div>

    <div class="book-grid">
      <div v-for="book in featuredBooks" :key="book.id" class="book-card">
        <div class="book-image">
          <img :src="book.coverTexture" :alt="book.title">
          <div class="featured-badge">Featured</div>
        </div>
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">{{ book.author }}</p>
          <p class="price">${{ book.price.toFixed(2) }}</p>
          <div class="book-actions">
            <button @click="viewBook(book.id)" class="view-btn">View Details</button>
            <button @click="addToCart(book)" class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const { addToCart } = useCart()

const featuredBooks = ref([])

// Mock data for books with featured attribute - in a real app, this would come from an API
const mockBooks = [
  {
    id: 1,
    title: 'The Great Adventure',
    author: 'John Smith',
    price: 24.99,
    category: 'fiction',
    modelPath: '/models/book1.glb',
    coverTexture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.2,
    featured: true
  },
  {
    id: 2,
    title: 'Science Explained',
    author: 'Dr. Jane Doe',
    price: 29.99,
    category: 'science',
    modelPath: '/models/book2.glb',
    coverTexture: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.8
  },
  {
    id: 3,
    title: 'Historical Events',
    author: 'Robert Johnson',
    price: 34.99,
    category: 'history',
    modelPath: '/models/book3.glb',
    coverTexture: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.0
  },
  {
    id: 4,
    title: 'A Life Story',
    author: 'Emily Wilson',
    price: 27.99,
    category: 'biography',
    modelPath: '/models/book4.glb',
    coverTexture: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.1,
    featured: true
  },
  {
    id: 5,
    title: 'The World of Fiction',
    author: 'Michael Brown',
    price: 22.99,
    category: 'fiction',
    modelPath: '/models/book5.glb',
    coverTexture: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.9
  },
  {
    id: 6,
    title: 'Understanding the Universe',
    author: 'Dr. Sarah Davis',
    price: 39.99,
    category: 'science',
    modelPath: '/models/book6.glb',
    coverTexture: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.3,
    featured: true
  },
  {
    id: 7,
    title: 'Ancient Civilizations',
    author: 'Prof. Thomas Miller',
    price: 32.99,
    category: 'history',
    modelPath: '/models/book7.glb',
    coverTexture: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.7
  },
  {
    id: 8,
    title: 'Non-Fiction Guide',
    author: 'Lisa Anderson',
    price: 26.99,
    category: 'non-fiction',
    modelPath: '/models/book8.glb',
    coverTexture: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.0
  }
]

const viewBook = (bookId) => {
  router.push(`/book/${bookId}`)
}

// Filter books to get only featured ones
onMounted(() => {
  featuredBooks.value = mockBooks.filter(book => book.featured)
})
</script>

<style scoped>
.featured-section {
  min-height: contain;
  padding: 3rem;
  background: #f5f7ff;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 5rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #1a1a1a;
}

.section-header p {
  color: #666;
  font-size: 1.2rem;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.book-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.book-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: -30px;
  background: #ff6b6b;
  color: white;
  padding: 5px 30px;
  border-radius: 0;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transform: rotate(45deg);
}

.book-info {
  padding: 1.5rem;
}

.book-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.author {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.price {
  font-weight: bold;
  color: #4a6cf7;
  margin-bottom: 1rem;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
}

.view-btn, .add-to-cart-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.view-btn {
  background: #f0f0f0;
  color: #333;
}

.view-btn:hover {
  background: #e0e0e0;
}

.add-to-cart-btn {
  background: #4a6cf7;
  color: white;
}

.add-to-cart-btn:hover {
  background: #3a5ce5;
}
</style>
