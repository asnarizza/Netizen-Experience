<template>
  <!-- Root app container: full-page flexbox with centered content -->
  <div class="app">
    <!-- Header: shows title and progress summary -->
    <AppHeader
      :isFinished="isFinished"
      :likedCount="likedCats.length"
      :totalCount="cats.length"
    />

    <!-- Loading state -->
    <div v-if="isLoading" class="center-box">
      <p>Loading purr-fect kitties…</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="center-box">
      <p class="error">{{ error }}</p>
      <button @click="reload" class="btn primary">Try again</button>
    </div>

    <!-- Main content (either swipe view or summary) -->
    <main v-else class="content">
      <!-- Swipe UI while there are still cats to rate -->
      <CatSwipeStack
        v-if="!isFinished"
        :cats="cats"
        :currentIndex="currentIndex"
        @swipe="onSwipe"
      />

      <!-- Summary screen once all cats have been rated -->
      <CatSummary
        v-else
        :likedCats="likedCats"
        @restart="reload"
      />
    </main>
  </div>
</template>

<script setup>
/**
 * Root component: owns the cat list, loading/error state,
 * and the high-level navigation between swipe view and summary view.
 */
import AppHeader from './components/AppHeader.vue';
import CatSwipeStack from './components/CatSwipeStack.vue';
import CatSummary from './components/CatSummary.vue';
import { useCats } from './composables/useCats';

const {
  cats,
  currentIndex,
  isLoading,
  error,
  isFinished,
  likedCats,
  loadCats,
  handleSwipe
} = useCats();

/**
 * Reload handler used by both error state and summary "restart" button.
 */
function reload() {
  loadCats();
}

/**
 * Adapter for the swipe event emitted by CatSwipeStack.
 * The child emits { isLike }, we pass just the boolean into the composable.
 */
function onSwipe(payload) {
  handleSwipe(payload.isLike);
}
</script>

<style scoped>
/* Root app layout: full height, vertical flex, soft gradient background */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:
    radial-gradient(circle at 0% 0%, #ffe6f2 0, transparent 50%),
    radial-gradient(circle at 100% 100%, #e0f4ff 0, transparent 50%),
    linear-gradient(180deg, #fef9f6, #fdf2ff);
  color: #222;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

/* Shared max-width for main content so layout stays consistent */
.content {
  width: 100%;
  max-width: 360px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
}

/* Error message styling */
.error {
  color: #b00020;
}
</style>
