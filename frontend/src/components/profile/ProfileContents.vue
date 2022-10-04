<script setup>
    import { defineProps, onMounted, ref } from 'vue'
    import { axios, auth } from '@/js/axios'
    import router from '@/js/router';

    const props = defineProps(['userData'])

    const userData = ref()
    const imageData = ref()
    const y = ref()
    const m = ref()
    const d = ref()
    const nickLevel = ref(0)
    const nickConfirm = ref('')

    onMounted(() => {
        y.value = props.userData.birth.substr(0, 2)
        m.value = props.userData.birth.substr(2, 2)
        d.value = props.userData.birth.substr(4, 2)

        userData.value = props.userData
    })

    const nickCheck = async () => {
        await axios.post(`${auth}/nickConfirm`, userData.value)
        .then(res => {
            if (res.data.code === 'nick') nickLevel.value = 2, alert('이미 사용중인 닉네임입니다.')
            else if (res.data.code === 'y') {
                nickConfirm.value = userData.value.nick
                nickLevel.value = 1
            }
        })
    }

    const imgData = (e) => {
        imageData.value = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(imageData.value)

        reader.onload = function() {
            userData.value.img = reader.result
        }
    }

    const profileModify = async () => {
        if (nickConfirm.value !== '') {
            if (nickConfirm.value !== userData.value.nick) return alert('닉네임을 확인해주세요')
        } else if (imageData.value === undefined) {
            return alert('변경사항이 없습니다.')
        }
        
        await axios.post(`${auth}/update`, userData.value)
        .then(res => {
            if (res.data.code === 'y') router.push('/')
        })
    }

    const profileClose = () => {
        router.go(-1)
    }

</script>

<template>
    <article class="profile_contents" v-if="userData">
        <div class="profile_item">
            <div class="profile_title">아이디</div>
            <div class="profile_input">{{userData.id}}</div>
        </div>

        <div class="profile_item">
            <div class="profile_title">프로필</div>
            <div class="profile_img_input">
                <input type="file" accept="image/*" @change="imgData($event)" />
                <div class="profile_img" :style="{'background': `url(${userData.img})`, 'background-size': 'cover', 'background-position': 'center center', 'background-color': '#FFF'}">
                    <span>이미지 추가하기</span>
                </div>
            </div>
        </div>

        <div class="profile_item">
            <div class="profile_title">이메일</div>
            <div class="profile_input">{{userData.email}}</div>
        </div>

        <div class="profile_item">
            <div class="profile_title">닉네임</div>
            <div class="profile_input">
                <input type="text" v-model="userData.nick" />
            </div>
            <div class="profile_button">
                <button @click="nickCheck" :class="{'bg_default': nickLevel === 0, 'bg_good': nickLevel === 1, 'bg_warning': nickLevel === 2}">닉네임 확인</button>
            </div>
        </div>

        <div class="profile_item">
            <div class="profile_title">성별</div>
            <div class="profile_input">{{userData.gender}}</div>
        </div>

        <div class="profile_item">
            <div class="profile_title">생년월일</div>
            <div class="profile_input">{{y}}년 {{m}}월 {{d}}일</div>
        </div>

        <div class="profile_item">
            <div class="profile_title">생성날짜</div>
            <div class="profile_input">{{userData.createdAt}}</div>
        </div>

        <div class="profile_item">
            <div class="profile_title">업데이트 날짜</div>
            <div class="profile_input">{{userData.updatedAt}}</div>
        </div>

        <div class="profile_item">
            <button @click="profileModify">변경</button>
            <button @click="profileClose">취소</button>
        </div>
    </article>
</template>

<style scoped lang='scss'>

</style>