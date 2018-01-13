<template lang="pug">
  .blog
      h1.page-title Страница «Блог»
      .title Добавить запись
      form
        .form-row
          input(
            type="text"
            placeholder="Название"
            v-model="title"
            :class="{error: validation.hasError('title')}"
          )
        div.validation {{ validation.firstError('title') }}
        .form-row
          input(
            type="date"
            placeholder="Дата"
            v-model="date"
            :class="{error: validation.hasError('date')}"
          )
        div.validation {{ validation.firstError('date') }}
        .form-row
          textarea(
            type="text" 
            placeholder="Содержание"
            v-model="text"
            :class="{error: validation.hasError('text')}"
          )
        div.validation {{ validation.firstError('text') }}
        .form-row
          input(
            type="file"
            multiple
          )
        .form-row
          app-button.save-button(
            type="button"
            title="Добавить"
            @click="addPost"
          )
      .table.col
        table.posts
          tr(v-for="(post, index) in posts")
            td {{ post.title }}
            td {{ post.date }}
            td {{ post.text }}       
</template>
<script>

import { mapGetters, mapMutations } from 'vuex';
import {Validator} from 'simple-vue-validator';

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    title : function(value) {
      return Validator.value(value).required('Введите название статьи!'); 
    },
    date : function(value) {
      return Validator.value(value).required('Введите дату публикации!'); 
    },
    text : function(value) {
      return Validator.value(value).required('Введите текст статьи!'); 
    }

  },
  data() {
    return {
      title: '',
      date: '',
      text: ''
    };      
  },
  methods: {
    ...mapMutations(['addBlogPost']),
    addPost() {
      this.$validate().then(success => {
        if(!success) return  

        this.addBlogPost({
          id: Math.round(Math.random() * 10000),
          title: this.title,
          date: this.date,
          text: this.text
        })
        this.text = ''
        this.date = ''
        this.title = ''
        this.validation.reset()
      })
    }
  },
  computed: {
    ...mapGetters(['posts'])
  },
  mounted() {
  },
  components: {
    AppButton: require('./button.vue'),
    AppInput: require('./input.vue')
  }
}
</script>
<style src="styles/blog.scss" lang="scss" scoped>

</style>
