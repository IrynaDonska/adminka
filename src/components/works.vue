<template lang="pug">
  .works
      h1.page-title Страница «Мои работы»
      .title Добавить работу
      form
        .form-row
          input(
            placeholder="Название проекта"
            type="text"
            v-model="fields.title"
            :class="{error: validation.hasError('fields.title')}"
        )
          div.validation {{ validation.firstError('fields.title') }}
        .form-row
          input(
            placeholder="Технологии"
            type="text"
            v-model="fields.tech"
            :class="{error: validation.hasError('fields.tech')}"
        )
          div.validation {{ validation.firstError('fields.tech') }}
        .form-row
          label.upload
            input.type-file(
              type="file"
              @change="getFile($event)"
            )
            .upload__icon
            .upload__text Загрузить картинку
          div.error-message {{validation.firstError('fields.file')}}
        .form-row
          app-button.save-button(
            type="button"
            title="Добавить"
            :disabled="!fields.file || validation.hasError('fields.file')"
            @click="sendData"
        )
</template>

<script>
import {Validator} from 'simple-vue-validator';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import {_} from 'vue-underscore';


export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    'fields.title' : function(value) {
      return Validator.value(value).required('Введите название вашей работы!'); 
    }, 
    'fields.tech' : function(value) {
      return Validator.value(value).required('Введите название технологий, которые были использованы в вашей работе!'); 
    },
    'fields.file' : (value) => {
      return Validator.custom(() => {
        if (Validator.isEmpty(value)) return
        const allowedTypes = ['image/jpeg', 'image/png']
        if (!_.includes(allowedTypes, value.type)) {
          return 'Недопустимый формат файла, разрешены только .jpeg и .png'
        }
      })
    }
  },
  data: () => ({
    fields: {
      title: '',
      tech: '',
      file: null
    }
  }),
  methods: {
    ...mapActions(['addNewWork']),
    ...mapMutations(['addWork']),
    getFile(event) {
      const file = event.target.files[0]
      this.fields.file = file
    },
    sendData() {
      this.$validate().then(success => {
        if (!success) return
        const formData = new FormData()
        formData.append('file', this.fields.file)
        formData.append('tech', this.fields.tech)
        formData.append('title', this.fields.title)
        this.addNewWork(formData)
      })
    },
    addWork() {
      this.$validate().then(success => {
        if(!success) return  

        this.addWork({
          //id: Math.round(Math.random() * 10000),
          title: this.title,
          tech: this.tech,
          tech: this.file,
        })
        this.tech = '',
        this.title = '',
        this.file = '',
        this.validation.reset()
      })
    }

  },
  components: {
    AppButton: require('./button.vue'),
    AppInput: require('./input.vue')
  }
}
</script>
<style src="styles/works.scss" lang="scss" scoped>
</style>

