import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Project } from '@/entities/project/index.ts'
import { UserServer } from '@/services/users/types.ts'

type ListItem = {
  list: Project[] | UserServer[]
  countPage: number | null
  currentPage: number | null
}
type ListStore = {
  projects: ListItem
  users: ListItem
}

export const useListStore = defineStore('list', () => {
  const lists = ref<ListStore>({
    projects: {
      list: [],
      countPage: 1,
      currentPage: 1,
    },
    users: {
      list: [],
      countPage: null,
      currentPage: null,
    },
  })

  const getList = (listName: keyof ListStore) => lists.value[listName].list
  const addItemToList = (listName: keyof ListStore, item: any) =>
    lists.value[listName].list.push(item)
  const getCountPageList = (listName: keyof ListStore) =>
    lists.value[listName].countPage
  const setCountPageList = (listName: keyof ListStore, count: number) =>
    (lists.value[listName].countPage = count)
  const getCurrentPageList = (listName: keyof ListStore) =>
    lists.value[listName].currentPage
  const setCurrentPageList = (listName: keyof ListStore, page: number) =>
    (lists.value[listName].currentPage = page)
  const clearList = (listName: keyof ListStore) =>
    (lists.value[listName].list = [])
  return {
    lists,
    addItemToList,
    getList,
    getCountPageList,
    setCountPageList,
    getCurrentPageList,
    setCurrentPageList,
    clearList
  }
})
