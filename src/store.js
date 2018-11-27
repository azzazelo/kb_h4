import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from './plugins/localStorage';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    items: {
      todo: [],
      inProgress: [],
      done: [],
    },
    nextId: 1,
  },
  mutations: {
    addItem(state, item) {
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    updateItems(state, payload) {
      state.items[payload.id] = payload.items;
    },
    initializeStore() {
      const data = localStorage.getItem('boardState');

      if (data) {
        this.replaceState(Object.assign(this.state, JSON.parse(data)));
      }
    },
    removeItem(state, item) {
      [state.items.todo, state.items.inProgress, state.items.done].forEach(
        (array) => {
          const indexInArray = array.findIndex(i => i.id === item.id);
          if (indexInArray > -1) {
            array.splice(indexInArray, 1);
          }
        },
      );
    },
  },
});
