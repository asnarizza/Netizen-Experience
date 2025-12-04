# Paws & Preferences 🐾

A simple app that lets you swipe through random cats (from [Cataas](https://cataas.com)) in a Tinder-style interface. Swipe right to like, left to dislike. When you are done, the app shows a summary of the cats you liked.

The code is structured around:

- **composables** for state and interaction logic
- **components** for UI (header, swipe stack, summary, progress bar)
- A single root `App.vue` that wires everything together

---

## Project structure

```text
src/
  assets/
    base.css              # Global styles and shared utility classes
  composables/
    useCats.js            # Fetches cats, tracks index, likes, loading & error
    useSwipeCard.js       # Handles drag/swipe behaviour and card transforms
  components/
    AppHeader.vue         # App header with title and dynamic subtitle
    CatSwipeStack.vue     # Swipeable Tinder-style card stack for cats
    CatSummary.vue        # Summary view showing liked cats
    ProgressBar.vue       # Simple progress bar with "current / total" display
  App.vue                 # Root component: layout + state wiring
  main.js                 # Vue application bootstrap
