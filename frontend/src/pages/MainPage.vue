<script setup>
  import { inject, onMounted, ref } from 'vue'
  import MainHeader from '@/components/items/MainHeader.vue'
  import MainContents from '@/components/main/MainContents.vue'
  import { axios, editor, auth } from '@/js/axios'
  import { computed } from '@vue/reactivity';

  const token = ref({
    id: ''
  })
  const userData = ref()
  const dataArray = ref()
  const text = ref('')

  onMounted(async() => {
    token.value.id = inject('$store').state.token

    await axios.post(`${editor}/read`)
    .then(res => {
      dataArray.value = res.data.data
    })

    await axios.post(`${auth}/user`, token.value)
    .then(res => {
      userData.value = res.data.data
    })
  })

  const handleUpdate = (item) => {
    console.log('item', item)
    text.value = item
    // dataArray.value.filter((res) => {
    //   console.log(res)
    //   return res.title.toLowerCase().includes(item.toLowerCase())
    //   // return res.title.toLowerCase().indexOf(item.toLowerCase()) >= 0 || res.contents.toLowerCase().indexOf(item.toLowerCase()) >= 0
    // })
  }

  const filteredList = computed(() => {
    return dataArray.value.filter(post => {
      return post.title.toLowerCase().includes(text.value.toLowerCase())
    })
  })


</script>

<template>
  <section id="main_page">
    <div class="container">
      <div class="row" v-if="dataArray">
        <MainHeader v-if="userData" :userData="userData" @create:input="handleUpdate" />
        <MainContents :dataArray="filteredList" />

        <!-- <div v-for="item of filteredList" :key="item">
          {{item}}
        </div> -->
      </div>
    </div>

  </section>
</template>

<style scoped lang='scss'>
@import '@/assets/styles/main.scss';

</style>