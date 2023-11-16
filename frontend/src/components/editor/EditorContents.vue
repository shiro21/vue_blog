<script setup>
    import { ref, inject } from 'vue'
    import router from '@/js/router'
    import { axios, editor } from '@/js/axios'

    const formData = ref({
        title: '',
        contents: '',
        img: '',
        owner: inject('$store').state.token
    })
    const preview = ref()

    const handleFileUpload = async (e) => {
        let data = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(data)

        reader.onload = function() {
            preview.value = reader.result
            formData.value.img = reader.result
        }
    }

    const editorCreate = async () => {
        
        console.log(formData.value)
        await axios.post(`${editor}/create`, formData.value)
        .then(res => {
            if (res.data.code === 'y') {
                console.log('성공')
                router.push("/");
            } else {
                console.log('실패')
            }
        })
    }
</script>

<template>
    <article class="editor_contents">
        <div class="editor_wrap">
            <div class="editor_item">
                <div class="item">제목을 입력해주세요. <span>{{formData.title.length}} / 20</span></div>
                <input type="text" v-model="formData.title" maxlength="20" />
            </div>
            <div class="editor_item">
                <div class="item">이미지를 추가해주세요.</div>
                <div class="preview">
                    <span v-if="!preview">이미지 추가하기<br />(클릭)</span>
                    <div v-if="preview" class="preview_img" :style="{'background-image':`url(${preview})`}"></div>
                    <input type="file" accept="image/*" @change="handleFileUpload($event)" ref="file" />
                </div>
            </div>
            <div class="editor_item">
                <div class="item">내용을 입력해주세요. <span>{{formData.contents.length}} / 500</span></div>
                <textarea cols="30" rows="10" v-model="formData.contents" maxlength="500" />
            </div>

            <button @click="editorCreate">등록하기</button>
        </div>
    </article>
</template>

<style scoped lang="scss">

</style>