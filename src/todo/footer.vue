<template>
    <div id="footer">
        <span>written by {{author}}</span>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                author: 'darksea'
            }
        }

    }
</script>
<style lang="stylus" scoped>
    #footer{
        margin-top 40px
        text-align center
        color #bfbfbf
        font-size 12px
        text-shadow 0 1px 0 1px
    }
</style>