<script setup>
    import { ref, defineProps, onMounted, watch } from 'vue'
    import CardLevel1 from '../items/CardLevel1.vue'
    import CardLevel2 from '../items/CardLevel2.vue'

    const props = defineProps(['dataArray'])
    const dataArray = ref()

    onMounted(() => {
    })
    watch(() => {
        dataArray.value = props.dataArray
        console.log(dataArray.value)
    })

    const viewVer = ref(1)
    const listView = (num) => {
        switch(num) {
            case 1 :
                viewVer.value = 1
            break

            case 2 :
                viewVer.value = 2
            break
        }
    }
</script>

<template>
    <article class="main_contents">
        <section class="main_list_version">
            <ul>
                <li @click="listView(2)">이미지 없는 버전</li>
                <li @click="listView(1)">이미지 있는 버전</li>
            </ul>
        </section>

        <section class="main_list_contents" v-if="viewVer === 1">
            <CardLevel1 :dataArray="dataArray" />
        </section>
        <section class="main_list_contents" v-if="viewVer === 2">
            <CardLevel2 />
        </section>
    </article>
</template>

<style scoped lang="scss">

</style>