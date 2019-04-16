<template>
  <div>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <base-input
        label="Title"
        v-model.trim="event.title"
        type="text"
        placeholder="Add an event title"
        @blur="$v.event.title.$touch()"
        class="field"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>
      <base-input
        class="field"
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        @blur="$v.event.description.$touch"
        :class="{ error: $v.event.description.$error }"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.$required" class="errorMessage">
          Description is required.
        </p>
      </template>
      <h3>Where is your event?</h3>
      <base-input
        label="Location"
        v-model="event.location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
        type="text"
        placeholder="Add a location"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @closed="$v.event.date.$touch()"
        />
        <!-- it's very strange that the opened event never triggered -->
        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">
            Date is required.
          </p>
        </template>
      </div>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        @blur="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
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
      this.$v.$touch() //touching all fields to turn them dirty
      if (!this.$v.$invalid) {
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
