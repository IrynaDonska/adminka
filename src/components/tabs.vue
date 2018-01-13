<template lang="pug">
    div.tabs
        ul.list
            li.item(v-for="tab in tabs")
                router-link(
                    :to="tab.href"
                    exact-active-class="active-tab"
                ).link {{tab.name}} 
</template>

<script>

export default {
  data() {
      return {
          tabs : [
              {
                  name: 'Обо мне',
                  href: '/'
              },
              {
                  name:  'Блог',
                  href: '/blog'
              },
              {
                  name: 'Мои работы',
                  href: '/works'
              }
          ]
      }    
  }
}

</script>

<style lang="scss"  src="styles/tabs.scss" scoped>

</style>


