<template>

<ContentField v-if="!$store.state.user.pulling_info">
    <div class="row justify-content-md-center">
        <div class="col-3">
            <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="form-label">用户名</label>
                <input v-model="username" type="username" class="form-control" id="username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="error-message">{{ error_message }}</div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">记住我</label>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
            </form>
        </div>
    </div>
</ContentField>

</template>

<script>
import ContentField from "@/components/ContentField.vue"
import { ref } from "vue"
import { useStore } from "vuex"
import router from "@/router/index" 

export default {
    components:{
        ContentField
    },
    setup() {
        const store = useStore();

        let username = ref('');
        let password = ref('');
        let error_message = ref('');

        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            store.commit("updateToken", jwt_token);
            store.dispatch("getInfo", {
                success() {
                    router.push({name: "home" });
                    store.commit("updatePullingInfo", false);
                },
                error() {
                    store.commit("updatePullingInfo", false);
                }
            }) 
        } else {
            store.commit("updatePullingInfo", false);
        }

        let login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username:username.value,
                password:password.value,
                success() {
                    store.dispatch("getInfo", {
                        success() {
                            router.push({name : "home"});
                        }
                    })
                },
                error() {
                    error_message.value = "用户名或密码错误";
                }
            })
        }
        return {
            username,
            password,
            error_message,
            login,
        }
    }
}
</script>

<style scoped>

button {
    width: 100%;
}

div.error-message {
    color: red;
}
</style>