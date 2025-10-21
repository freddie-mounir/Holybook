
<template>
  <div class="book-view">
    <div v-if="loading" class="loading">
      Loading book details...
    </div>

    <div v-else class="book-container">
      <div class="book-card">
        <div class="book-image">
          <img :src="book.coverTexture" :alt="book.title">
        </div>
        <div class="book-info">
          <h1>{{ book.title }}</h1>
          <p class="author">by {{ book.author }}</p>
          <p class="price">${{ book.price.toFixed(2) }}</p>
          <p class="description">{{ book.description }}</p>

          <div class="book-actions">
            <button
              @click="addToCart(book)"
              class="add-to-cart-btn"
              :disabled="addingToCart"
            >
              {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
            </button>
            <button @click="buyNow" class="buy-now-btn">
              Buy Now
            </button>
          </div>

          <div class="book-details">
            <div class="detail-item">
              <span class="detail-label">Category:</span>
              <span>{{ book.category }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Pages:</span>
              <span>{{ book.pages }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">ISBN:</span>
              <span>{{ book.isbn }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart: addToCartInStore } = useCart()

const loading = ref(true)
const addingToCart = ref(false)
const book = ref({
  id: 1,
  title: 'Loading...',
  author: 'Loading...',
  price: 0,
  description: 'Loading book description...',
  modelPath: '/models/book1.glb',
  coverTexture: '/textures/cover1.jpg',
  category: 'fiction',
  pages: 300,
  isbn: '978-1234567890',
  scrollSpeed: 1
})

const addToCart = async () => {
  addingToCart.value = true
  await addToCartInStore(book.value)
  addingToCart.value = false
}

const buyNow = () => {
  addToCartInStore(book.value)
  router.push('/cart')
}

// In a real app, you would fetch the book details from an API
onMounted(() => {
  setTimeout(() => {
    // Simulate API call
    const bookId = route.params.id

    // Map of book data with Unsplash images
    const bookData = {
      1: {
        id: 1,
        title: 'The Great Adventure',
        author: 'John Smith',
        price: 24.99,
        description: "Embark on an extraordinary journey through uncharted territories. This thrilling adventure novel takes you to places you've only dreamed of, with characters that will stay with you long after you turn the final page.",
        modelPath: '/models/book1.glb',
        coverTexture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'fiction',
        pages: 320,
        isbn: '978-1234567890',
        scrollSpeed: 1.2
      },
      2: {
        id: 2,
        title: 'Science Explained',
        author: 'Dr. Jane Doe',
        price: 29.99,
        description: 'A comprehensive guide to understanding complex scientific concepts in simple terms. Dr. Jane Doe breaks down everything from quantum physics to molecular biology with clarity and precision.',
        modelPath: '/models/book2.glb',
        coverTexture: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'science',
        pages: 450,
        isbn: '978-1234567891',
        scrollSpeed: 0.8
      },
      3: {
        id: 3,
        title: 'Historical Events',
        author: 'Robert Johnson',
        price: 34.99,
        description: 'Journey through time as this book explores pivotal moments that shaped our world. From ancient civilizations to modern history, gain new insights into the events that defined humanity.',
        modelPath: '/models/book3.glb',
        coverTexture: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'history',
        pages: 520,
        isbn: '978-1234567892',
        scrollSpeed: 1.0
      },
      4: {
        id: 4,
        title: 'A Life Story',
        author: 'Emily Wilson',
        price: 27.99,
        description: 'An intimate and inspiring biography that chronicles the remarkable journey of an extraordinary individual. Discover the struggles, triumphs, and legacy of a life well-lived.',
        modelPath: '/models/book4.glb',
        coverTexture: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'biography',
        pages: 380,
        isbn: '978-1234567893',
        scrollSpeed: 1.1
      },
      5: {
        id: 5,
        title: 'The World of Fiction',
        author: 'Michael Brown',
        price: 22.99,
        description: 'Explore the boundless realms of imagination in this captivating collection of stories. Each tale transports you to different worlds, filled with wonder, mystery, and adventure.',
        modelPath: '/models/book5.glb',
        coverTexture: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'fiction',
        pages: 410,
        isbn: '978-1234567894',
        scrollSpeed: 0.9
      },
      6: {
        id: 6,
        title: 'Understanding the Universe',
        author: 'Dr. Sarah Davis',
        price: 39.99,
        description: 'Delve into the mysteries of the cosmos with this fascinating exploration of our universe. From the Big Bang to black holes, discover the wonders that exist beyond our planet.',
        modelPath: '/models/book6.glb',
        coverTexture: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'science',
        pages: 550,
        isbn: '978-1234567895',
        scrollSpeed: 1.3
      },
      7: {
        id: 7,
        title: 'Ancient Civilizations',
        author: 'Prof. Thomas Miller',
        price: 32.99,
        description: 'Uncover the secrets of ancient societies that laid the foundation for our modern world. This comprehensive study examines the cultures, achievements, and legacies of early civilizations.',
        modelPath: '/models/book7.glb',
        coverTexture: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'history',
        pages: 480,
        isbn: '978-1234567896',
        scrollSpeed: 0.7
      },
      8: {
        id: 8,
        title: 'Non-Fiction Guide',
        author: 'Lisa Anderson',
        price: 26.99,
        description: 'A practical guide to navigating the world of non-fiction literature. Learn how to extract valuable knowledge from various genres and apply these insights to your personal and professional life.',
        modelPath: '/models/book8.glb',
        coverTexture: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'non-fiction',
        pages: 360,
        isbn: '978-1234567897',
        scrollSpeed: 1.0
      }
    }

    // Use the book data if it exists, otherwise use default
    book.value = bookData[bookId] || {
      id: bookId,
      title: `The 3D Book ${bookId}`,
      author: 'Jane Doe',
      price: 24.99 + (bookId * 5),
      description: 'This is a detailed description of the 3D book. It includes information about the content, the 3D experience, and what makes this book unique in our interactive catalog.',
      modelPath: `/models/book${bookId}.glb`,
      coverTexture: `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`,
      category: 'fiction',
      pages: 250 + (bookId * 25),
      isbn: `978-123456789${bookId}`,
      scrollSpeed: 1.2
    }

    loading.value = false
  }, 500)
})
</script>

<style scoped>
.book-view {
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: #666;
}

.book-container {
  max-width: 1200px;
  margin: 0 auto;
}

.book-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.book-image {
  height: 400px;
  overflow: hidden;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 2rem;
}

.book-info h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.author {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4a6cf7;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
}

.book-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.add-to-cart-btn {
  background: #4a6cf7;
  color: white;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #3a5ce5;
  transform: translateY(-2px);
}

.add-to-cart-btn:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}

.buy-now-btn {
  background: #f0f0f0;
  color: #333;
}

.buy-now-btn:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.book-details {
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
}

.detail-item {
  margin-bottom: 0.8rem;
  display: flex;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: bold;
  color: #555;
  width: 100px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .book-card {
    flex-direction: row;
  }

  .book-image {
    flex: 0 0 40%;
    height: auto;
  }

  .book-info {
    flex: 1;
  }
}

@media (max-width: 767px) {
  .book-view {
    padding: 5rem 1rem 1rem;
  }

  .book-info h1 {
    font-size: 1.8rem;
  }

  .price {
    font-size: 1.5rem;
  }

  .book-actions {
    flex-direction: column;
  }
}
</style>
