<template>
  <!-- App header: title + dynamic subtitle depending on progress -->
  <header class="app-header">
    <h1>Paws & Preferences</h1>

    <!-- Instruction text while swiping -->
    <p v-if="!isFinished" class="subtitle">
      Swipe right to like, left to dislike.
    </p>

    <!-- Summary text after all cats are rated -->
    <p v-else class="subtitle">
      You liked {{ likedCount }} out of {{ totalCount }} cats 🐾
    </p>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    isFinished: { type: Boolean, required: true },
    likedCount: { type: Number, required: true },
    totalCount: { type: Number, required: true }
  }
};
</script>

<style scoped>
/* Header layout: centered, same width as main content */
.app-header {
  width: 100%;
  max-width: 380px;
  text-align: center;
  padding-bottom: 0.75rem;
}

/* Main title styling */
.app-header h1 {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin-bottom: 0.2rem;
}

/* Subtitle text (instructions or summary) */
.subtitle {
  font-size: 0.95rem;
  color: #555;
}
</style>
