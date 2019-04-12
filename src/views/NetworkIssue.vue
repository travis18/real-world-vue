<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It look like your're experiencing some network issues, please click the
      back button and try again.
    </h3>
    <router-link :to="{ name: 'event-link' }"
      >Or go back to the home page</router-link
    >
  </div>
</template>

<script>
export default {}
</script>
