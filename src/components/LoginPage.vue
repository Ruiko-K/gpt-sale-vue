<template>
    <div id="login-back">
        <div id="login-container">
            <el-form :model="form" class="login-form">
                <h3 class="loginTitle">
                    欢迎登录
                </h3>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter()
axios.defaults.withCredentials = true;
const form = ref({
    name: '',
    password: ''
})

const login = () => {
    //登录
    axios.post('http://localhost:8080/auth/doLogin', form.value).then(res => {
        if (res.data.code == 200) {
            console.log("登录成功");
            //登录成功,跳转到主页
            router.push('/home');
        } else {
            //登录失败
            alert(res.data.msg);
        }
    })
}
</script>

<style scoped>
#login-container {
    border-radius: 15px;
    background-clip: padding-box;
    text-align: left;
    margin: auto;
    margin-top: 180px;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: aliceblue;
    border: 1px solid blueviolet;
    box-shadow: 0 0 25px #f885ff;
}
</style>