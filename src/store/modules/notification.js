export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
    console.log('notification PUSH mutation')
    console.log(state.notifications)
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    console.log('notification add action')
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
