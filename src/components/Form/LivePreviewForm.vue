<template>
    <slot></slot>
    <el-form :model="form" class="form">
        <el-form-item>
            <label>直播账号</label>
            <el-input v-model="form.liveAccount"></el-input>
        </el-form-item>
        <el-form-item>
            <label>直播主题</label>
            <el-input v-model="form.liveTheme"></el-input>
        </el-form-item>
        <el-form-item>
            <label>直播时间</label>
            <div style="display: block;width: 100%;">
                <el-config-provider :locale="locale">
                    <el-date-picker v-model="form.liveTime" value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="请选择直播时间" />
                </el-config-provider>
            </div>
        </el-form-item>
        <el-form-item>
            <label>直播内容</label>
            <el-input v-model="form.liveContent"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="clear">清空</el-button>
            <el-button type="primary" @click="onSubmit">开始生成</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { ElDatePicker } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const form = ref({
    liveAccount: '',
    liveTheme: '',
    liveTime: new Date(),
    liveContent: '',
})
const locale = ref(zhCn)


//表单提交
const onSubmit = () => {
    // console.log('submit!')
    axios.post('http://localhost:8080/create/live',
        {
            liveAccount: form.value.liveAccount,
            liveTheme: form.value.liveTheme,
            liveTime: form.value.liveTime,
            liveContent: form.value.liveContent,
        },
        { withCredentials: true }
    ).then((res) => {
        store.commit('setCreateText', res.data.data.content);
    }).catch((err) => {
        alert("系统异常，请重新尝试！");
        console.log(err);
        router.push({ path: '/home' });
    })
}

//清空表单
const clear = () => {
    form.value.liveAccount = '';
    form.value.liveTheme = '';
    form.value.liveTime = new Date();
    form.value.liveContent = '';
}

</script>

<style scoped>
.form {
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
