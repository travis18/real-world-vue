<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <router-link
      v-if="page > 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >Prev</router-link
    >&nbsp;|
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', { page: currentPage })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
    .catch(error => {
      console.log(error)
      if (!error.response) {
        next({ name: 'network-issue' })
      }
    })
}

export default {
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user']),
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    }
  }
}
</script>
