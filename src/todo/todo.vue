<template>
    <section class="real-app">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下来做什么"
                @keyup.enter="addTodo"
        >
        <Item
                :todo="todo"
                v-for="todo in filteredTodos"
                :key="todo.id"
                @del="deleteTodo"
        ></Item>
        <Tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAll="clearAllCompleted"
        ></Tabs>
    </section>
</template>
<script>
  import Item from './item.vue';
  import Tabs from './tabs.vue';
  export default {
    data() {
      return {
        todos:[],
        filter:"all",
        id : 0
      }
    },
      components: {
        Item,
        Tabs
      },
    mounted () {
      function storageAvailable(type) {
        try {
          var storage = window[type],
            x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        }
        catch(e) {
          return e instanceof DOMException && (
              // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
        }
      }
      if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        if(localStorage.localTodos){
          this.todos= JSON.parse(localStorage.getItem('localTodos'));
        } else {
          this.todos = [];
        }

      }
      else {
        // Too bad, no localStorage for us
        alert("您的浏览器不支持本地储存，建议更新浏览器");
      }
    },
    computed:{
      filteredTodos(){
        if (this.filter === 'all'){
            return this.todos
        }
        const completed = this.filter === 'completed';
        return this.todos.filter(todo => completed ===todo.completed)
      },
    },
    methods: {
      addTodo(e){
        if(e.target.value==''){
          alert("你什么都没有添加哦")
        }
        else{
          if(localStorage.localId){
            this.id =parseFloat(localStorage.localId) + 1;
          }else{
            this.id = 0
          }
          this.todos.unshift({
            id:this.id,
            content: e.target.value.trim(),
            completed:false
          });
            e.target.value ='';
          localStorage.setItem ('localId',JSON.stringify(this.id));
          localStorage.setItem ('localTodos',JSON.stringify(this.todos));
          this.todos = JSON.parse(localStorage.getItem('localTodos'));
        }

      },
        deleteTodo(id){
          this.todos.splice(this.todos.findIndex(todo => todo.id ===id),1);
          localStorage.setItem ('localTodos',JSON.stringify(this.todos));
        },
        toggleFilter(state){
          this.filter =state
        },
        clearAllCompleted(){
          this.todos = this.todos.filter(todo => !todo.completed);
          localStorage.setItem ('localTodos',JSON.stringify(this.todos));
          this.todos = JSON.parse(localStorage.getItem('localTodos'));
        }
    },
  }
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin :0  auto
  box-shadow :0 0 5px #666
}
.add-input{
  positon:relative;
  margin 0
  width 100%
  font-size 24px
  font-family  inherit
  font-weight:inherit
  line-height 1.4rem
  outline none
  color inherit
  border 1px solid #999
  box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
  box-sizing border-box
  font-smoothing:antialiased;
  padding 16px 16px 16px 60px
}
</style>
