<template>
  <div ref="heroContainer">
    <section id="section1" class="relative flex flex-col md:flex-row items-center justify-center bg-red-500">
      <div class="flex flex-row mt-20">
        <div class="flex flex-col items-center justify-center text-center z-10 w-full md:w-1/2 px-4">
          <h1 class="md:text-5xl font-bold mb-6 text-black">Faith, Hope & Inspiration</h1>
          <p class="text-xl md:text-2xl mb-10 text-black">
            encourage your faith, deepen your relationship with God, and bless your family and friends. Start your
            journey
            today,
            because His Word is living, active, and always available to you.
          </p>
          <button
            class="px-8 py-4 text-2xl bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
            @click="scrollToSection('featured')">
            Explore Books
          </button>
        </div>
        <div class="flex justify-center items-center w-full md:w-1/2 px-4">
          <img src="/src/assets/images/book hero.png" ref="imageRef" alt="Books" class="max-w-full h-auto">
        </div>
      </div>
    </section>
    <section id="section2" class=" flex flex-row md:flex-row items-center justify-center gap-8 md:gap-16 mt-20 mb-20">
      <div class="w-1/2">
        <div ref="imageEndRef" class="w-full h-full"></div>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center text-center z-10 mr-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-black">Fresh Encouragement for Your Walk with Christ</h1>
        <p class="text-xl md:text-2xl mb-10 text-black max-w-2xl">
          Discover the latest Christian books lighting up hearts across the nation! From powerful
           new devotionals and breakthrough Bible studies to inspiring true stories and fiction that points to Christ
        </p>
      </div>
    </section>
    <section id="section3">
      <video src="/src/assets/videos/bookshop.mp4" autoplay loop muted playsinline class="w-full h-full object-cover"></video>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroContainer = ref(null)
const imageRef = ref(null)
const imageEndRef = ref(null)

onMounted(() => {
  if (imageRef.value && heroContainer.value && imageEndRef.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: '+=1500',
        scrub: true,
        pin: true,
      }
    });

    tl.to(imageRef.value, {
      rotation: 360,
      ease: 'power1.inOut'
    })
    .to(imageRef.value, {
      x: () => {
        const imageRefRect = imageRef.value.getBoundingClientRect();
        const imageEndRefRect = imageEndRef.value.getBoundingClientRect();
        return imageEndRefRect.left - imageRefRect.left + (imageEndRefRect.width - imageRefRect.width) / 2;
      },
      y: () => {
        const imageRefRect = imageRef.value.getBoundingClientRect();
        const imageEndRefRect = imageEndRef.value.getBoundingClientRect();
        return imageEndRefRect.top - imageRefRect.top + (imageEndRefRect.height - imageRefRect.height) / 2;
      },
      ease: 'power1.inOut'
    });
  }
})

const scrollToSection = (sectionId) => {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
}
</script>
