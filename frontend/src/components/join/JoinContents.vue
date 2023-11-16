<script setup>
import { ref, onMounted } from 'vue'
import { axios, auth } from '@/js/axios'
import router from '@/js/router';


  onMounted(() => {
  })

  const formData = ref({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nick: "",
    birth: "",
    gender: "남자"
  })

  const join = async () => {
    if (formData.value.id === '' || formData.value.id.length < 5) return alert("아이디를 5자 이상 입력해주세요.")
    else if (formData.value.email === '') return alert("이메일을 입력해주세요.")
    else if (formData.value.password !== formData.value.passwordConfirm) return alert("비밀번호를 확인해주세요.")
    else if (formData.value.password.length < 8) return alert("비밀번호 길이가 짧습니다.")
    else if (formData.value.nick === '' || formData.value.nick.length < 3) return alert("닉네임을 3자 이상 입력해주세요.")
    // else if (formData.value.birth.length !== 6) return alert("생년월일을 입력해주세요.")
    else {

      await axios.post(`${auth}/idNickConfirm`, formData.value)
      .then(res => {
        if (res.data.code === 'y') {
          axios.post(`${auth}/create`, formData.value)
          .then(result => {
            console.log(result)
          })
        } else if (res.data.code === 'id') {
          return alert('아이디가 이미 존재합니다.')
        } else if (res.data.code === 'nick') {
          return alert('닉네임이 이미 존재합니다.')
        }
        router.push("/login");

      })
    }
  }

</script>

<template>
  <article class="join_contents">
    <h1><em>회원가입</em>페이지</h1>
    
    <div class="form_items">
      <div class="input_wrap">
        <div class="input_title">
          아이디를 입력해주세요.
        </div>
        <div class="input_contents">
          <input placeholder="5글자 이상 입력해주세요." type="text" v-model="formData.id" />
        </div>
      </div>

      <div class="input_wrap">
        <div class="input_title">
          이메일을 입력해주세요.
        </div>
        <div class="input_contents">
          <input type="email" v-model="formData.email" />
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
        <div class="input_title">
          비밀번호를 확인해주세요.
        </div>
        <div class="input_contents">
          <input type="password" v-model="formData.passwordConfirm" />
        </div>
      </div>

      <div class="input_wrap">
        <div class="input_title">
          닉네임을 입력해주세요.
        </div>
        <div class="input_contents">
          <input type="text" v-model="formData.nick" />
        </div>
      </div>

      <div class="input_wrap">
        <div class="input_title">
          생년월일 입력해주세요.
        </div>
        <div class="input_contents">
          <input placeholder="ex: 930419" type="number" v-model="formData.birth" />
        </div>
      </div>

      <div class="input_wrap">
        <div class="input_title">
          성별을 선택해주세요.
        </div>
        <div class="input_contents">
          <select name="" id="" v-model="formData.gender">
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </div>
      </div>

      <div class="input_wrap">
        <input type="submit" @click="join" />
      </div>

    </div>
  </article>
</template>

<style scoped lang='scss'>

</style>