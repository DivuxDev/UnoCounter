import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { M } from 'motion-v';

export const useCommonStore = defineStore('common', () => {
  const hasMenu = ref(true);
  const showSidebar = ref(true);

const changeSidebarVisibility = () => {
    showSidebar.value = !showSidebar.value;
}


  return {  hasMenu, showSidebar, changeSidebarVisibility}
})
