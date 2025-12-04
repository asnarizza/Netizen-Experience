<template>
  <!-- Swipeable card stack section: main interactive area -->
  <section class="cat-card-stack">
    <div class="cat-card-area">
      <!-- Background cards: next 1–2 upcoming cats for stack depth effect -->
      <div
        v-for="(cat, index) in remainingCats"
        :key="cat.id"
        class="cat-card cat-card--background"
        :style="backgroundStyle(index)"
      >
        <img :src="cat.url" alt="Cute cat" loading="lazy" />
      </div>

      <!-- Active card: draggable, shows like/nope badges while swiping -->
      <div
        v-if="activeCat"
        class="cat-card cat-card--active"
        :style="activeCardStyle"
        @mousedown="onDragStart($event)"
        @touchstart.passive="onDragStart($event)"
        @mousemove="onDragMove($event)"
        @touchmove.passive="onDragMove($event)"
        @mouseup="onDragEnd"
        @mouseleave="onDragEnd"
        @touchend="onDragEnd"
      >
        <img :src="activeCat.url" alt="Cute cat" />
        <!-- Visual feedback: like badge when dragging to the right -->
        <div class="badge badge--like" v-if="dragX > 40">
          LIKE
        </div>
        <!-- Visual feedback: nope badge when dragging to the left -->
        <div class="badge badge--nope" v-if="dragX < -40">
          NOPE
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <ProgressBar
      :current="Math.min(currentIndex + 1, cats.length)"
      :total="cats.length"
    />
  </section>
</template>

<script>
import { computed } from 'vue';
import { useSwipeCard } from '../composables/useSwipeCard';
import ProgressBar from './ProgressBar.vue';

export default {
  name: 'CatSwipeStack',
  components: { ProgressBar },
  props: {
    cats: { type: Array, required: true },
    currentIndex: { type: Number, required: true }
  },
  emits: ['swipe'],
  setup(props, { emit }) {
    const activeCat = computed(
      () => props.cats[props.currentIndex] || null
    );

    const remainingCats = computed(() =>
      props.cats.slice(props.currentIndex + 1, props.currentIndex + 3)
    );

    const {
      dragX,
      activeCardStyle,
      backgroundStyle,
      onDragStart,
      onDragMove,
      onDragEnd
    } = useSwipeCard({
      getHasActiveCard: () => !!activeCat.value,
      onSwipe: (isLike) => emit('swipe', { isLike })
    });

    return {
      activeCat,
      remainingCats,
      dragX,
      activeCardStyle,
      backgroundStyle,
      onDragStart,
      onDragMove,
      onDragEnd
    };
  }
};
</script>

<style scoped>
/* Wrapper for the entire swipe section */
.cat-card-stack {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

/* Card container: fixed height for consistent layout across devices */
.cat-card-area {
  position: relative;
  width: 100%;
  height: 480px;
  margin: 0 auto;
}

/* Base card styling (active and background cards) */
.cat-card {
  position: absolute;
  top: 0;
  left: 50%;
  /* translateX(-50%) is applied from inline transform to center the card */
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background: #fff;
  touch-action: pan-y;
  cursor: grab;
}

/* Ensure cat images fill the card and are nicely cropped */
.cat-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Background cards are dimmed and not interactive */
.cat-card--background {
  opacity: 0.5;
  pointer-events: none;
}

/* Active card shows grabbing cursor while dragging */
.cat-card--active {
  cursor: grabbing;
}

/* Base badge style (LIKE / NOPE labels) */
.badge {
  position: absolute;
  top: 16px;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 1px;
  border: 2px solid;
}

/* LIKE badge (right swipe) */
.badge--like {
  left: 16px;
  color: #2ecc71;
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.05);
}

/* NOPE badge (left swipe) */
.badge--nope {
  right: 16px;
  color: #e74c3c;
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.05);
}
</style>
