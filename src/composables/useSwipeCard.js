// src/composables/useSwipeCard.js
import { ref, computed } from 'vue';

/**
 * Composable for handling swipe/drag behaviour of a single card.
 *
 * @param {Object} options
 * @param {() => boolean} options.getHasActiveCard - returns true if there is a card to swipe.
 * @param {(isLike: boolean) => void} options.onSwipe - called when a swipe is confirmed.
 */
export function useSwipeCard({ getHasActiveCard, onSwipe }) {
  const isDragging = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const dragX = ref(0);
  const dragY = ref(0);

  const activeCardStyle = computed(() => {
    const x = dragX.value;
    const y = dragY.value;
    const rotation = x * 0.08;

    return {
      transform: `translateX(-50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      transition: isDragging.value ? 'none' : 'transform 0.25s ease-out'
    };
  });

  const backgroundStyle = (index) => {
    const scale = 1 - index * 0.03;
    return {
      top: index * 4 + 'px',
      transform: `translateX(-50%) scale(${scale})`
    };
  };

  function extractClientXY(event) {
    if (event.touches && event.touches[0]) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    return { x: event.clientX, y: event.clientY };
  }

  function onDragStart(event) {
    if (!getHasActiveCard()) return;
    isDragging.value = true;
    const { x, y } = extractClientXY(event);
    startX.value = x;
    startY.value = y;
    dragX.value = 0;
    dragY.value = 0;
  }

  function onDragMove(event) {
    if (!isDragging.value) return;
    const { x, y } = extractClientXY(event);
    dragX.value = x - startX.value;
    dragY.value = y - startY.value;
  }

  function onDragEnd() {
    if (!isDragging.value) return;
    isDragging.value = false;

    const threshold = 80; // min horizontal distance for a valid swipe

    if (dragX.value > threshold) {
      commitSwipe(true);
    } else if (dragX.value < -threshold) {
      commitSwipe(false);
    } else {
      // If not far enough, snap back to center
      dragX.value = 0;
      dragY.value = 0;
    }
  }

  function commitSwipe(isLike) {
    if (!getHasActiveCard()) return;

    const direction = isLike ? 1 : -1;
    dragX.value = direction * 500;
    dragY.value = dragY.value * 0.3;

    setTimeout(() => {
      dragX.value = 0;
      dragY.value = 0;
      onSwipe(isLike);
    }, 200);
  }

  return {
    dragX,
    dragY,
    activeCardStyle,
    backgroundStyle,
    onDragStart,
    onDragMove,
    onDragEnd
  };
}
