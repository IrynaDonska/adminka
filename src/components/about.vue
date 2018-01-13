<template lang="pug">
    .about
        h1.page-title Страница «Обо мне»
        .skills-list
            skills-list(
                v-for="(skillType, index) in skillsTypes"
                :key="index"
                :skillType="skillType"
                :skills="skills"
            )
        app-button.save-button(
                title="Сохранить"
                @click=""
        ) Сохранить  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            skillsTypes: ['Frontend', 'Backend', 'Workflow']
        }
    },
    computed: {
        ...mapGetters(['skills'])

    },
    methods: {
        ...mapActions(['fetchSkills'])
    },
    created() {
        this.fetchSkills();     
    },

    components: {
        skillsList: require('./skillsList.vue'),
        AppButton: require('./button.vue')
    }
  
}
</script>
<style src="styles/about.scss" lang="scss" scoped>
</style>


