<template>
  <button v-bind="conditionalProps"
          :is="componentType"
          :class="classList"
          :type="btnType"
          :disabled="disabled || spinner"
          @click="onClick">
    <div class="btn-content"><slot></slot></div>
    <i :class="['spinner', {'spinner-animation':spinner}]"></i>
  </button>
</template>

<style scoped lang="scss">
  .btn-spinner {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .btn-content {
    min-width: 0;
    flex: 1;
    display: block;
    text-align: center;
    padding-left: 16px;
  }
  .spinner{
    width: 16px;
    height: 16px;
  }
  .spinner-animation {
    display: flex;
    align-self: center;
    border: 2px solid transparentize(white, 0.5);
    border-top: 2px solid #2d2d2d;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  export default {
    components: {},
    computed: {
      classList () {
        return [
          'btn',
          'btn-spinner',
          this.btnVariant,
          this.btnSize,
          this.btnBlock,
          this.btnDisabled,
        ];
      },
      componentType () {
        return this.to ? 'router-link' : 'button';
      },
      btnBlock () {
        return this.block ? `btn-block` : '';
      },
      btnVariant () {
        return this.variant ? `btn-${this.variant}` : `btn-primary`;
      },
      btnSize () {
        return this.size ? `btn-${this.size}` : '';
      },
      btnDisabled () {
        return this.disabled ? 'disabled' : '';
      },
      btnType () {
        return this.to ? null : this.type;
      },
      conditionalProps () {
        return this.componentType === 'button' ? {} : {
          to: this.to,
        };
      },
    },
    props: {
      block: {
        type: Boolean,
        default: false,
      },
      spinner: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: null,
      },
      variant: {
        type: String,
        default: null,
      },
      type: {
        type: String,
        default: 'button',
      },
      // router-link props
      to: {
        type: [String, Object],
        default: null,
      },
    },
    methods: {
      onClick (e) {
        if (this.disabled) {
          e.stopPropagation();
          e.preventDefault();
        } else {
          this.$emit('click', e);
        }
      },
    },
  };
</script>
