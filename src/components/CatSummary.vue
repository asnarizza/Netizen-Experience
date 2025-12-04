<template>
  <!-- Summary section: shows liked cats or a message if none were liked -->
  <section class="summary">
    <h2>Your favourite kitties</h2>

    <!-- Case: user did not like any cats -->
    <div v-if="likedCats.length === 0" class="center-box">
      <p>You didn’t like any cats this time. Tough crowd!</p>
      <button class="btn primary" @click="$emit('restart')">
        Start over
      </button>
    </div>

    <!-- Case: show grid of liked cats -->
    <div v-else class="summary-grid">
      <div
        v-for="cat in likedCats"
        :key="cat.id"
        class="summary-card"
      >
        <img :src="cat.url" alt="Liked cat" loading="lazy" />
      </div>
    </div>

    <!-- Restart action when there is at least one liked cat -->
    <div class="summary-actions" v-if="likedCats.length > 0">
      <button class="btn secondary" @click="$emit('restart')">
        Try again with new cats
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CatSummary',
  props: {
    likedCats: {
      type: Array,
      required: true
    }
  },
  emits: ['restart']
};
</script>

<style scoped>
/* Overall summary layout: vertical column */
.summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Section title */
.summary h2 {
  text-align: center;
  margin-bottom: 0.25rem;
}

/* Grid layout for liked cat thumbnails */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.5rem;
  padding-bottom: 1rem;
}

/* Card wrapper for each liked cat thumbnail */
.summary-card {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

/* Ensure each liked cat image fills its card */
.summary-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Actions row (restart button) anchored near the bottom */
.summary-actions {
  text-align: center;
  margin-top: auto;
}
</style>
