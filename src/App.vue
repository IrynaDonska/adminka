<template lang="pug">
    #app
        .header
            app-header
        .tabs
            tabs
        .content
            router-view
</template>

<script>

export default {
    components: {
        appHeader: require('./components/header.vue'),
        tabs: require('./components/tabs.vue'),
        about: require('./components/about.vue'),
        works: require('./components/works.vue'),
        blog: require('./components/blog.vue'),    
    }
  
}

</script>

<style lang="scss">

</style>
