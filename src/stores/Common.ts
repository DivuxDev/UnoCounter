import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCommonStore = defineStore('common', () => {
  const hasMenu = ref(true);
  const hasGoBack = ref(false);
  const showSidebar = ref(false);

  const navbarTitle = ref('');

const changeSidebarVisibility = () => {
    showSidebar.value = !showSidebar.value;
}
  return {  hasMenu, showSidebar, changeSidebarVisibility, hasGoBack, navbarTitle }
})
