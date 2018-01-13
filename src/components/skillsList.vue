<template lang="pug">
    div.skills-list
        .title {{ skillType }}
        table.table
            skill-item(
                v-for="skill in skills"
                :key="skill.id"
                :skill="skill"
                v-if="checkSkillType(skillType) === skill.type"
                @removeSkill='removeSkill'
            )
        .addButton
            button(
                type="button"
                @click="addSkill"
            ) Добавить новый 
            input(
               type="text" 
               v-model="newSkill"
               @keydown.enter='addSkill'
               :class="{error: validation.hasError('newSkill')}"
            )
        div.validation {{ validation.firstError('newSkill') }}
</template>

<script>


import { mapMutations } from "vuex";
import {Validator} from 'simple-vue-validator';

export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
        newSkill: function(value) {
           return Validator.value(value).required('Поле должно быть заполнено!'); 
        }
    },
    props: {
        skillType: String,
        skills: Array
    },
    data() {
        return {
            newSkill: ""
        }
        
    },
    methods: {
        ...mapMutations(['addNewSkill', 'removeExistedSkill']),
        addSkill() {
            this.$validate().then(success => {
                if(!success) return

                this.addNewSkill({
                    id: Math.round(Math.random() * 10000),
                    name: this.newSkill,
                    percents: 0,
                    type: this.checkSkillType(this.skillType)
                })
                this.newSkill = '';
                this.validation.reset();
            })   
        },
        removeSkill(skillID) {
           this.removeExistedSkill(skillID) 

        },
        checkSkillType(skillType) {
            switch (skillType) {
                case 'Frontend' :
                    return 1;
                case 'Backend' :
                    return 3;
                case 'Workflow' :
                    return 2;
            }
        }
        
    },
    components: {
        skillItem: require('./skillItem')
    }
  
}
</script>
<style src="styles/skillsList.scss" lang="scss" scoped>

</style>

