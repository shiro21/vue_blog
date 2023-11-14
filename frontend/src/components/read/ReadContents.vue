<script setup>
    import router from '@/js/router';
    import { defineProps, onMounted, ref } from 'vue'
    
    const props = defineProps(['readData'])
    const readData = ref()
    const data = ref(['큰 글씨( v-for 이용해서 여러줄 만들기 ): ', '중간 글씨: ', '작은 글씨: '])

    onMounted(() => {
        readData.value = props.readData
    })

    const movePrevPage = () => {
        router.go(-1)
    }
</script>

<template>
    <article class="read_contents" v-if="readData">
        <div class="read_close" @click="movePrevPage">
            나가기
        </div>
        <div class="read_title">
            <h1><em>{{readData.title}}</em></h1>
        </div>

        <div class="read_image">
            <img :src="readData.image" alt="" />
        </div>

        <div :class="`read_contents${index + 1}`" v-for="(item, index) of data" :key="index">
            {{item}}
            {{readData.contents}}
        </div>
    </article>
</template>