Vue.config.devtools = true;

const mixin = {
  data: {
    menuModal: false,
  },
  methods: {
  },
  created: function () {
    console.log('mixin hook called');
  }
};
