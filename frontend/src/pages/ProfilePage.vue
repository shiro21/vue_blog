<script setup>
    import ProfileContents from '@/components/profile/ProfileContents.vue'
    import { axios, auth } from '@/js/axios'
    import { inject, onMounted, ref } from 'vue';

    const token = ref({
        id: ''
    })
    const userData = ref()

    onMounted(async() => {
        token.value.id = inject('$store').state.token
        console.log(token.value.id)

        await axios.post(`${auth}/user`, token.value)
        .then(res => {
            userData.value = res.data.data
        })
    })
</script>

<template>
    <section id="profile_page">
        <div class="container">
            <div class="row" v-if="userData">
                <ProfileContents :userData="userData" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/profile.scss';

</style>