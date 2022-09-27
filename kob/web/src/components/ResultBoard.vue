<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.loser === 'all'">
            平局!
        </div>

        <div class="result-board-text" v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.a_id === parseInt($store.state.user.id)">
            很遗憾,你输了!
        </div>

        <div class="result-board-text" v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.b_id === parseInt($store.state.user.id)">
            很遗憾,你输了!
        </div>

        <div class="result-board-text" v-else>
            恭喜你，你赢了!
        </div>

        <div class="result-board-btn">
            <button @click="restart" type="button" class="btn btn-info btn-lg">再来一局!</button>
        </div>

    </div>
</template>

<script>
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        
        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", "none");
            store.commit("updateOpponent", {
                username:"我的对手",
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
        }
        
        return {
            restart,
        }
    }
}
</script>

<style scoped>
div.result-board {
    height: 30vh;
    width: 30vw;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    top: 30vh;
    left: 35vw;
}

div.result-board-text {
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    padding-top: 2vh;
}

div.result-board-btn {
    padding-top: 6vh;
    text-align: center;
}
</style>