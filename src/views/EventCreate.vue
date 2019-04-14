<template>
  <div>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />
      <h3>Name & describe your event</h3>
      <base-input
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />
      <base-input
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />
      <h3>Where is your event?</h3>
      <base-input
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect label="Select a time" :options="times" v-model="event.time" />
      <BaseButton type="submit" buttonClass="-fill-gradient"
        >Submit in base</BaseButton
      >
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  computed: {
    ...mapState({
      userName: state => state.user.user.name,
      catetories: 'categories',
      newEventId: state => state.event.newEventId
    }),
    catLength() {
      return this.$store.getters.catLength
    }
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.user
      return {
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.newEventId }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          NProgress.done()
        })
    }
  },
  components: {
    Datepicker
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
