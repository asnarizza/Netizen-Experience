// src/composables/useCats.js
import { ref, computed, onMounted } from 'vue';

const TOTAL_CATS = 12;
const API_BASE = 'https://cataas.com';
const MAX_SKIP = 500;

/**
 * Composable responsible for:
 * - Loading cats from the Cataas API
 * - Tracking the current index
 * - Tracking liked cats
 * - Exposing loading and error state
 */
export function useCats() {
  const cats = ref([]);
  const currentIndex = ref(0);
  const isLoading = ref(true);
  const error = ref(null);

  const activeCat = computed(
    () => cats.value[currentIndex.value] || null
  );

  const isFinished = computed(
    () => !isLoading.value && currentIndex.value >= cats.value.length
  );

  const likedCats = computed(() =>
    cats.value.filter((c) => c.liked)
  );

async function loadCats() {
  isLoading.value = true;
  error.value = null;
  cats.value = [];
  currentIndex.value = 0;

  try {
    // Random skip value so each reload presents a different subset of cats
    const randomSkip = Math.floor(Math.random() * MAX_SKIP);

    // Remove the tagParam and just construct the URL without any tags
    const url = `${API_BASE}/api/cats?skip=${randomSkip}&limit=${TOTAL_CATS}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch cats list');
    }

    const data = await res.json(); // array of cat objects from API

    // Normalize API result into a simple model used by the app
    cats.value = data.map((cat, index) => {
      const id = cat._id || cat.id || `fallback-${index}`;

      return {
        id,
        // Stable URL for each cat with fixed width/height
        url: `${API_BASE}/cat/${id}?width=600&height=600`,
        liked: null // not yet rated
      };
    });
  } catch (e) {
    console.error(e);
    error.value = 'Failed to load cats. Please try again.';
  } finally {
    isLoading.value = false;
  }
}


  /**
   * Apply a swipe result (like/dislike) to the current cat
   * and advance the index.
   */
  function handleSwipe(isLike) {
    if (!activeCat.value) return;
    activeCat.value.liked = isLike;
    currentIndex.value += 1;
  }

  onMounted(loadCats);

  return {
    // state
    cats,
    currentIndex,
    isLoading,
    error,

    // derived
    activeCat,
    isFinished,
    likedCats,

    // actions
    loadCats,
    handleSwipe
  };
}
