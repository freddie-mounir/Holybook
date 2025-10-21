<template>
  <section id="contact" class="contact-section">
    <div class="section-header">
      <h2>Contact Us</h2>
      <p>Get in touch with our team</p>
    </div>
    
    <div class="contact-content">
      <div class="contact-info">
        <div class="info-item">
          <h3>Visit Us</h3>
          <p>123 Book Street<br>Reading City, RC 12345</p>
        </div>
        
        <div class="info-item">
          <h3>Contact</h3>
          <p>Email: hello@3dbookstore.com<br>Phone: (555) 123-4567</p>
        </div>
        
        <div class="info-item">
          <h3>Hours</h3>
          <p>Monday-Friday: 9am - 6pm<br>Saturday: 10am - 4pm<br>Sunday: Closed</p>
        </div>
        
        <div class="social-links">
          <a href="#" class="social-link">📱</a>
          <a href="#" class="social-link">📘</a>
          <a href="#" class="social-link">📸</a>
          <a href="#" class="social-link">📧</a>
        </div>
      </div>
      
      <div class="contact-form-container">
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              required 
              placeholder="Your name"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              v-model="form.email" 
              type="email" 
              required 
              placeholder="your@email.com"
            >
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required 
              placeholder="How can we help you?"
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'Sending...' : 'Send Message' }}
          </button>
          
          <div v-if="success" class="success-message">
            Message sent successfully! We'll get back to you soon.
          </div>
        </form>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2025 3D Book Store. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">FAQ</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const success = ref(false)

const submitForm = async () => {
  submitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    success.value = true
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      success.value = false
    }, 5000)
  }
}
</script>

<style scoped>
.contact-section {
  min-height: 100vh;
  padding: 0;
  background: #1a1a1a;
  color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.section-header p {
  color: #ccc;
  font-size: 1.2rem;
}

.contact-content {
  display: flex;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
}

.contact-info {
  flex: 1;
}

.info-item {
  margin-bottom: 2rem;
}

.info-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #4a6cf7;
}

.info-item p {
  color: #ccc;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background 0.3s ease;
}

.social-link:hover {
  background: #4a6cf7;
}

.contact-form-container {
  flex: 1;
  background: #222;
  padding: 2rem;
  border-radius: 12px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #eee;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 6px;
  background: #333;
  color: white;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a6cf7;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #aaa;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-primary {
  background: #4a6cf7;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #3a5ce5;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background: #555;
  cursor: not-allowed;
}

.success-message {
  padding: 1rem;
  background: rgba(74, 108, 247, 0.2);
  border: 1px solid #4a6cf7;
  border-radius: 6px;
  color: #4a6cf7;
  text-align: center;
}

.footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #333;
  color: #888;
  font-size: 0.9rem;
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.footer-links a {
  color: #888;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #4a6cf7;
}

@media (max-width: 900px) {
  .contact-content {
    flex-direction: column;
  }
  
  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .info-item {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 5rem 1rem 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .info-item {
    min-width: 150px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
