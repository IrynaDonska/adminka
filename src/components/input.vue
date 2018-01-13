<template lang="pug">
  input.input-field(
    :type="type"
    :placeholder="placeholder"
    :data-error="error"
    @input="changeVal($event.target.value)"
  )
</template>
<script>
export default {
  props: {
    value: String,
    error: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    changeVal(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style  lang="scss" scoped>

    .input-field {
        width: rem(300);
        background: #fff;
        border-radius: rem(5);
        padding: rem(20);
        
        &[data-error] {
            border: rem(1) solid $green;
        }
    }
</style>