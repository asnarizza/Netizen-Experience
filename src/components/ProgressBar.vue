<template>
  <div class="progress">
    <div class="progress-bar">
      <div class="progress-bar__fill" :style="{ width: progress + '%' }" />
    </div>
    <span class="progress-text">
      {{ current }} / {{ total }}
    </span>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ProgressBar',
  props: {
    current: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  setup(props) {
    const progress = computed(() => {
      if (props.total === 0) return 0;
      const raw = (props.current / props.total) * 100;
      return Math.min(100, Math.max(0, raw));
    });

    return { progress };
  }
};
</script>

<style scoped>
.progress {
  margin-top: 0.25rem;
  text-align: center;
  font-size: 0.85rem;
  color: #666;
}

/* Empty track */
.progress-bar {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 0.2rem;
}

/* Filled portion */
.progress-bar__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff6b81, #ffc38a);
  transition: width 0.25s ease-out;
}

/* Text below the bar (e.g., "3 / 12") */
.progress-text {
  font-size: 0.8rem;
  color: #444;
}
</style>
