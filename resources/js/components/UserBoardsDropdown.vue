<template>
    <div>
        <button class="header-btn" @click="showBoards = !showBoards">Доски задач</button>
        <DropdownMenu :show="showBoards" @closed="showBoards = false">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-1">ДОСКИ ЗАДАЧ</div>

            <router-link
                :to="{name: 'board', params: {id: board.id}}"
                v-for="board in userBoards"
                :key="board.id"
                :class="[`bg-${board.color}-100`]"
                class="rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex mb-1"
                @click.native="showBoards = false"
            >
                <div class="w-10 rounded-sm rounded-r-none" :class="[`bg-${board.color}-200`]"></div>
                <div class="p-2">{{ board.title }}</div>
            </router-link>

            <div
                @click="showModal = true"
                class="rounded-sm hover:bg-gray-400 p-2 underline cursor-pointer mt-2"
            >Создать новую доску задач...</div>

            <BoardAddModal :show="showModal" @closed="showModal = false"></BoardAddModal>
        </DropdownMenu>
    </div>
</template>

<script>
import DropdownMenu from "./DropdownMenu";
import BoardAddModal from "./BoardAddModal";
import UserBoards from "./../graphql/UserBoards.gql";
import { mapState } from "vuex";
import {colorMap100, colorMap200} from "../utils";

export default {
    components: { DropdownMenu, BoardAddModal },
    apollo: {
        userBoards: {
            query: UserBoards,
            variables() {
                return {
                    userId: 1
                };
            },
            skip() {
                return !this.userId;
            }
        }
    },
    data() {
        return {
            showBoards: false,
            showModal: false
        };
    },
    computed: {
        ...mapState({
            userId: state => state.user.id
        }),
        colorMap100: () => colorMap100,
        colorMap200: () => colorMap200,
    }
};
</script>
