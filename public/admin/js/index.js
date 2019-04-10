const app = new Vue({
  el: '#app',
  mixins: [mixin],
  methods: {
    submit: function ($event) {
      $event.preventDefault();
    }
  }
});
