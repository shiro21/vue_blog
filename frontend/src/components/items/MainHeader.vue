<script setup>
    import router from '@/js/router'
    import { onMounted, ref, defineEmits, defineProps } from '@vue/runtime-core'
    import store from '@/js/store'

    const props = defineProps(["userData"])
    const emit = defineEmits(["create:input"])
    const user = ref()

    const listConfirm = ref(false)
    const loginConfirm = ref(false)

    onMounted(() => {
        if (props.userData) {
            loginConfirm.value = true
            user.value = props.userData
        } else {
            alert("로그인 하셔야합니다.");
            router.push("/login");
        }
    })

    const inputData = (e) => {
        emit('create:input', e.target.value)
    }



    const goProfile = () => {
        router.push('/profile')
    }
    const openList = () => {
        if (listConfirm.value === false) listConfirm.value = true
        else listConfirm.value = false
    }
    const logout = () => {
        store.dispatch('logout')
    }
</script>

<template>
    <header class="main_headers">
        <div class="header_items">
            <div class="item">
                <h1>
                    <routerLink to="/">
                        <img src="@/assets/logo.png" alt="로고" />
                        <em>블로그</em>
                    </routerLink>
                </h1>
            </div>

            <div class="item">
                <input type="text" @input="inputData($event)" placeholder="서치 바" />
            </div>

            <div class="item" v-if="loginConfirm">
                <button @click="goProfile">프로필</button>
                <button @click="openList">
                    리스트
                    <ul class="item_list" v-if="listConfirm">
                        <li @click="goProfile">
                            <div class="profile_img">
                                <img v-if="user.img === ''" src="@/assets/images/profile.jpg" alt="기본 프로필">
                                <img v-if="user.img !== ''" :src="user.img" alt="">
                            </div>
                            <div class="profile_info">
                                <div class="profile_id">{{user.id}}</div>
                                <div class="profile_nick">{{user.nick}}</div>
                            </div>
                        </li>
                        <li><routerLink to="/editor">글 쓰러가기</routerLink></li>
                        <li @click="logout">로그아웃</li>
                    </ul>
                </button>
            </div>
            <div class="item" v-if="!loginConfirm">
                <ul>
                    <li><routerLink to="login">로그인하러가기</routerLink></li>
                    <li><routerLink to="join">회원가입하러가기</routerLink></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">

</style>