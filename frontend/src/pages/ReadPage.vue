<script setup>
    import ReadContents from '@/components/read/ReadContents.vue'
    import { axios, editor } from '@/js/axios'
    import { onMounted, ref } from 'vue'
    import router from '@/js/router'

    const data = ref({
        id: ''
    })
    const readData = ref()
    onMounted(async() => {
        data.value.id = router.currentRoute.value.params.id

        await axios.post(`${editor}/view`, data.value)
        .then(res => {
            readData.value = res.data.data[0]
        })
    })
    
</script>

<template>
    <section id="editor_page">
        <div class="container">
            <div class="row" v-if="readData">
                <ReadContents :readData="readData" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/editor.scss';

</style>