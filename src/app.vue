<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
<script>
  import Header from './todo/header.vue';
  import Footer from './todo/footer.vue';
  import Todo from './todo/todo.vue';

  export default{
    data(){
      return{

      }
    },
    components:{
      Header:Header,
      Footer,
      Todo,
    }
  }
</script>
<style lang="stylus" scoped="scoped">
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td {
    margin:0;
    padding:0;
  }
  table {
    border-collapse:collapse;
    border-spacing:0;
  }
  fieldset,img {
    border:0;
  }
  address,caption,cite,code,dfn,em,strong,th,var {
    font-style:normal;
    font-weight:normal;
  }
  ol,ul {
    list-style:none;
  }
  caption,th {
    text-align:left;
  }
  h1,h2,h3,h4,h5,h6 {
    font-size:100%;
    font-weight:normal;
  }
  q:before,q:after {
    content:'';
  }
  abbr,acronym {
    border:0;
  }
  * {
    box-sizing border-box
  }
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .8
    z-index -1
  }
</style>
