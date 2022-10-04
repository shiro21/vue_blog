<script setup>
    import { onMounted, ref } from 'vue';
    import { axios, editor } from '@/js/axios'
    import router from '@/js/router'

    const dataArray = ref()

    onMounted(async () => {
        axios.post(`${editor}/read`)
        .then(res => {
            dataArray.value = res.data.data
        })
    })

    const move = (item) => {
        router.push(`/list/${item._uid}`)
    }
</script>

<template>
    <ul>
        <li v-for="item of dataArray" :key="item">
            <div class="card" @click="move(item)">
                <div class="card_info">
                    <div class="card_title">{{item.title}}</div>
                    <div class="card_contents">{{item.contents}}</div>
                    <div class="card_nick">{{item.nick}}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">

</style>