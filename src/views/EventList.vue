<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard />
    <p>
      <router-link :to="{ name: 'event-show', params: { id: 1 } }"
        >Show Event #1</router-link
      >
    </p>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard
  }
}
</script>
