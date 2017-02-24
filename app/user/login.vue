<template>
  <div class="head">
    {{ title }}
  </div>
</template>
<script type="text/javascript">
export default {
  data: function() {
    return {
      title: '这是登录界面'
    };
  },
  mounted: function() {
    console.log('mounted');
  },
  methods: {}
};
</script>
