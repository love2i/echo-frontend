<template>
    <div id="loading">
    </div>
</template>

<script>
export default {
  name: 'TopLoading'
}
</script>

<style scoped>
    #loading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: red;
        animation: loading 1.8s infinite ease-in-out;
    }

    #loading:after{
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        box-shadow: 10px 10px 10px red;
    }

    @keyframes loading {
        0%{
            width: 0%;
        }
        50%{
            width: 50%;
        }
        100%{
            width: 100%;
        }
    }
</style>
