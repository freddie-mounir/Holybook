<template>
  <section id="categories" class="categories-section">
    <div class="section-header">
      <h2>Shop by Category</h2>
      <p>Find the perfect book for your interests</p>
    </div>


    <div class="categories-grid">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-card"
        @click="goToCategory(category.id)"
      >
        <div class="category-image">
          <img :src="category.image" :alt="category.name" />
        </div>
        <div class="category-info">
          <h3>{{ category.name }}</h3>
          <p>{{ category.count }} books</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = ref([
  {
    id: 'fiction',
    name: 'Fiction',
    count: 124,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book1.glb',
      coverTexture: '/textures/cover1.jpg',
      scrollSpeed: 1.1
    }
  },
  {
    id: 'non-fiction',
    name: 'Non-Fiction',
    count: 89,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book2.glb',
      coverTexture: '/textures/cover2.jpg',
      scrollSpeed: 0.9
    }
  },
  {
    id: 'children',
    name: 'Children',
    count: 156,
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book3.glb',
      coverTexture: '/textures/cover3.jpg',
      scrollSpeed: 1.3
    }
  },
  {
    id: 'science',
    name: 'Science',
    count: 78,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book4.glb',
      coverTexture: '/textures/cover4.jpg',
      scrollSpeed: 0.8
    }
  },
  {
    id: 'art',
    name: 'Art & Design',
    count: 65,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book5.glb',
      coverTexture: '/textures/cover5.jpg',
      scrollSpeed: 1.0
    }
  },
  {
    id: 'business',
    name: 'Business',
    count: 93,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featuredBook: {
      modelPath: '/models/book6.glb',
      coverTexture: '/textures/cover6.jpg',
      scrollSpeed: 1.2
    }
  }
])

const featuredBooks = ref(
  categories.value.slice(0, 4).map(cat => ({
    id: `cat-${cat.id}`,
    ...cat.featuredBook
  }))
)

const goToCategory = (categoryId) => {
  router.push(`/category/${categoryId}`)
}
</script>

<style scoped>
.categories-section {
  min-height: 100vh;
  padding: 3rem;
  background: linear-gradient(135deg, #f5f7ff 0%, #e8ecf5 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.section-header p {
  color: #666;
  font-size: 1.2rem;
}

.categories-3d-container {
  height: 40vh;
  margin-bottom: 3rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.category-image {
  height: 180px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-info {
  padding: 1.5rem;
}

.category-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: #1a1a1a;
}

.category-info p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .categories-section {
    padding: 5rem 1rem 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .category-image {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
