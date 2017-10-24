<template>
  <div :class="['dropdown', {'show': visible}]">
    <f-btn :class="toggleClassList"
           :size="size"
           :variant="variant"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
           @click="open">
      <slot v-if="value" name="toggle" v-bind="value">{{ renderLabel(value) }}</slot>
      <slot v-else name="toggle-no-value">{{ labelNoValue }}</slot>
    </f-btn>
    <div :class="['dropdown-menu', {'btn-block': btnBlock}, {'show': visible}, {'dropdown-menu-float-sm':float}]" :aria-labelledby="visible ? 'true' : 'false'">
      <button v-for="item in items"
              class="dropdown-item"
              type="button"
              @keyup.enter="select(item)"
              @click="select(item)">
        <slot name="item" v-bind="item">{{ renderLabel(item) }}</slot>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import Button from './btn';
  export default {
    components: {
      'f-btn': Button,
    },
    props: {
      btnBlock: {
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
      labelNoValue: {
        default: 'Select Item',
      },
      value: {
        default: undefined,
      },
      items: {
        type: Array,
        required: true,
      },
      itemLabel: {
        type: [String, Function],
        default: 'label',
      },
      float: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        visible: false,
      };
    },
    computed: {
      toggleClassList () {
        return [
          'dropdown-toggle',
          { 'btn-block': this.btnBlock },
        ];
      },
      toggleLabel () {
        return this.value ? this.renderLabel(this.value) : this.defaultLabel;
      },
    },
    created () {
      const keys = [27];
      this.lisenKeys = (e) => {
        if (keys.indexOf(e.which) !== (-1)) {
          this.hideHandler();
        }
      };
      this.hideHandler = this.hide.bind(this);
    },
    methods: {
      renderLabel (item, isToggle = false) {
        if (typeof (this.itemLabel) === 'function') {
          return this.itemLabel(item, isToggle);
        } else {
          return item[this.itemLabel];
        }
      },
      hide () {
        this.visible = false;
        this.unBind();
      },
      open () {
        if (this.visible != true) {
          this.visible = true;
          this.bind();
        }
      },
      bind () {
        setTimeout(() => {
          window.addEventListener('click', this.hideHandler);
          window.addEventListener('keydown', this.lisenKeys);
        }, 0);
      },
      unBind () {
        setTimeout(() => {
          window.removeEventListener('click', this.hideHandler);
          window.removeEventListener('keydown', this.lisenKeys);
        }, 0);
      },
      select (value) {
        this.visible = !this.visible;
        this.unBind();
        this.$emit('input', value);
      },
    },

  };
</script>
