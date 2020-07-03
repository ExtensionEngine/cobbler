<template>
  <div class="side-bar-wrapper">
    <base-search @search="handleSearch" />
  </div>
</template>

<script>
import BaseSearch from '../common/BaseSearch';

export default {
  name: 'side-bar',
  components: {
    BaseSearch
  }
};
</script>

<style>
  .side-bar-wrapper {
    height:100vh;
    background: gray;
    width: 300px;
    padding: 10px;
  }
</style>
