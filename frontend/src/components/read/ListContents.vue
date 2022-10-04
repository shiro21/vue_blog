<script setup>
    import { onMounted, ref } from 'vue'
    import { axios, editor } from '@/js/axios'

    const data = ref()
    onMounted(async() => {
        await axios.post(`${editor}/read`)
        .then(res => {
            data.value = res.data.data
        })
    })
</script>

<template>
    <article class="list_contents" v-if="data">
        <div class="list_card" v-for="item of data" :key="item">
            <div class="list_image">
                <img :src="item.image" alt="">
            </div>
            <div class="list_info">
                <div class="list_title">{{item.title}}</div>
                <div class="list_contents">{{item.contents}}</div>
                <div class="list_nick">{{item.nick}}</div>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
@import '@/assets/styles/editor.scss';

</style>