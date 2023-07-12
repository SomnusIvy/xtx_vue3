<script setup>
  import LayoutFixed from './components/LayoutFixed.vue'
  import LayoutNav from './components/LayoutNav.vue'
  import LayoutHeader from './components/LayoutHeader.vue'
  import LayoutFooter from './components/LayoutFooter.vue'
  import { useCategoryStore } from '@/stores/categoryStore'
  import { onMounted } from 'vue'
  
  const categoryStore = useCategoryStore()
  onMounted( () => categoryStore.getCategory() )
</script>

<template>
  <LayoutNav></LayoutNav>
  <LayoutFixed></LayoutFixed>
  <LayoutHeader></LayoutHeader>

  <router-view></router-view>

  <LayoutFooter></LayoutFooter>
</template>