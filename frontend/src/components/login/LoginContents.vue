<script setup>
    import { ref, onMounted } from 'vue'
    import { axios, auth } from '@/js/axios'
    import router from '@/js/router';
    import { useStore } from 'vuex';

    const store = useStore()
    
    onMounted(() => {
    }) 
    const formData = ref({
        id: "",
        password: ""
    })

    const login = async () => {
        await axios.post(`${auth}/login`, formData.value)
        .then(res => {
            if (res.data.code === 'y') {
                store.dispatch('login', res.data.data._uid)
                router.push('/')
            }
            else if (res.data.code === 'n') return alert(res.data.message);
        })
    }
    
</script>

<template>
    <article class="login_contents">
        <h1><em>로그인 </em>페이지</h1>

        <div class="form_items">
            <div class="input_wrap">
                <div class="input_title">
                    아이디를 입력해주세요.
                </div>
                <div class="input_contents">
                    <input type="text" v-model="formData.id" />
                </div>
            </div>

            <div class="input_wrap">
                <div class="input_title">
                    비밀번호를 입력해주세요.
                </div>
                <div class="input_contents">
                    <input type="password" v-model="formData.password" />
                </div>
            </div>

            <div class="input_wrap">
                <input type="submit" @click="login" value="로그인" />
            </div>

            <div class="input_wrap">
                <div class="input_join">
                    <routerLink to="/join">회원가입</routerLink>하러가기
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped lang='scss'>

</style>