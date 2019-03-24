import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  newEventId: 0,
  eventsTotal: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
    state.newEventId = event.id
    console.log(event)
    console.log(event.id)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(response => {
        commit('ADD_EVENT', response.data)
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        this.state.event.eventsTotal =
          parseInt(response.headers['x-total-count']) || 0
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      const notification = {
        type: 'success',
        message: 'Successfully get event by id from cache'
      }
      dispatch('notification/add', notification, { root: true })
      console.log('fetchEvent cache')
    } else {
      EventService.getEventById(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          const notification = {
            type: 'success',
            message: 'Successfully get event by id from server'
          }
          dispatch('notification/add', notification, { root: true })
          console.log('fetchEvent server')
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
