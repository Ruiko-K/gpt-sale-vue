<script setup>
import { ref, watch } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// do not use same name with ref
const form = ref({
    productName: '',
    tagsAll: [],
    tag: '',
    targetGroup: '',
    sence: "1",
    emoji: "1",
    textLength: "1"
})
const n = ref(0);
const placeholder = ref("请输入关键词，按回车键添加");
const inputTag = ref(null);

//表单提交
const onSubmit = () => {
    // console.log('submit!')
    axios.post('http://localhost:8080/create/product',
        {
            productName: form.value.productName,
            productKeywords: form.value.tagsAll,
            targetGroup: form.value.targetGroup,
            scene: form.value.sence,
            useEmoji: form.value.emoji,
            textLength: form.value.textLength
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
    form.value.productName = '';
    form.value.tagsAll = [];
    form.value.tag = '';
    form.value.targetGroup = '';
    form.value.sence = "1";
    form.value.emoji = "1";
    form.value.textLength = "1";
}

const removeTag = (index) => {
    form.value.tagsAll.splice(index, 1)
}

const addTags = () => {
    //新增函数中可以加一些你所需要的校验规则。比如只能是数子，或者不能输入‘，’等
    if (form.value.tag != '') {
        //限制输入长度
        if (form.value.tag.length > 10) {
            alert('单标签长度不能超过10个字符！')
        } else {
            //添加tag
            form.value.tagsAll.push(form.value.tag);
            //清空输入框
            form.value.tag = '';
        }
    }
}
//键盘删除键删除tag
const deleteTags = () => {
    //逻辑：当删除到最后一个字符的时候，删除后currentval为空，所以继续执行，n++。这时候n=1.然后判断n是否等于2，不等于不执行。
    //这里是保证当你删除最后一个字符的时候不会执行删除tag的方法，当我们删完了字符后再按一次删除的时候，n就等于2了。就开始删除tag。
    //当有多个tag时，我们连续删除，就会出现，因为currentval为空，所以一直执行n++，导致n不等于2了，所以没法删除后面的tag。
    //所以增加判断，当n大于2的时候我们看tag的长度有没有，有那就继续删除，没有就归0，从来。
    if (form.value.tag == "") {
        n.value++;
        if (n.value == 2) {
            form.value.tagsAll.pop();
        }
        if (n.value > 2) {
            if (form.value.tagsAll.length) {
                form.value.tagsAll.pop();
            } else {
                n.value = 0;
            }
        }
    } else {
        n.value = 0;
    }
}

const onclick = () => {
    inputTag.value.focus();
}

watch(() => form.value.tagsAll, (val) => {
    if (val.length == "") {
        placeholder.value = "请输入关键词，按回车键添加";
    } else {
        placeholder.value = "";
    }
})
</script>

<template>
    <slot></slot>
    <el-form :model="form" class="form">
        <el-form-item>
            <label>商品信息</label>
            <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item>
            <label>商品关键词</label>
            <div class="tag-area" @click="onclick">
                <!--标签-->
                <div v-for="(item, index) in form.tagsAll" :key="index" class="tagbox">
                    <span>{{ item }}</span>
                    <i class="span_close" @click="removeTag(index, item)"></i>
                </div>
                <input v-model="form.tag" ref="inputTag" :placeholder="placeholder" @keyup.enter="addTags"
                    @keyup.delete="deleteTags" type="text" class="inputTag" />
            </div>
        </el-form-item>
        <el-form-item>
            <label>目标群体</label>
            <el-input v-model="form.targetGroup"></el-input>
        </el-form-item>
        <el-form-item>
            <label>应用场景</label>
            <div style="display: block;width: 100%;">
                <el-radio-group v-model="form.sence">
                    <el-radio label="1" size="large" border>通用</el-radio>
                    <el-radio label="2" size="large" border>朋友圈</el-radio>
                    <el-radio label="3" size="large" border>微信群</el-radio>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item>
            <label>使用表情</label>
            <div style="display: block;width: 100%;">
                <el-radio-group v-model="form.emoji">
                    <el-radio label="1" size="large" border>不使用</el-radio>
                    <el-radio label="2" size="large" border>使用Emoji</el-radio>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item>
            <label>文案长度</label>
            <div style="display: block;width: 100%;">
                <el-radio-group v-model="form.textLength">
                    <el-radio label="1" size="large" border>短文案</el-radio>
                    <el-radio label="2" size="large" border>中文案</el-radio>
                    <el-radio label="3" size="large" border>长文案</el-radio>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button @click="clear">清空</el-button>
            <el-button type="primary" @click="onSubmit">开始生成</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>
.form {
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
}

.tag-area {
    display: block;
    width: 100%;
    height: 7rem;
    border: 1px solid #dcdfe6;
}

.tagbox {
    display: inline-block;
    margin: 5px;
    padding: 0px 5px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    background-color: #f2f6fc;
    color: #909399;
    font-size: 12px;
    cursor: pointer;
    transition: all .3s;
}

.span_close {
    padding: 0 6px 0 4px;
    opacity: 1;
    -webkit-filter: none;
    filter: none;
    color: #409EFF;
    /* font-weight: 600; */
    cursor: pointer;
}

/* 鼠标经过叉叉 */
.span_close:hover {
    /* background-color: #409EFF; */
    border-radius: 50%;
    color: red;
    font-size: 14px;
    font-weight: 700;
}

.span_close:after {
    content: "\0058";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* line-height: 27px; */
    transition: 0.3s, color 0s;
}

.inputTag {
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    width: auto;
    min-width: 180px;
    height: 2rem;
    vertical-align: top;
}
</style>
