<template>
    <div>
        <div v-if="!editing"
             class="flex-col bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-50 mb-2 mx-1"
        >
            <div>{{ card.title }}</div>
            <div class="mb-0.5 text-xs text-gray-500 mt-2">Дата выполнения:</div>
            <div class="rounded-sm bg-red-400 outline-none text-gray-100 py-0.5 px-1 w-2/3">📅 2021-01-29 20-00</div>


            <div class="mt-3 mb-0 ml-1 text-xs text-gray-500">Участники:</div>
            <div class="relative h-16 my-0.5">
                <div class="absolute font-bold">
                    <div class="flex rounded-full w-12 h-12 text-white bg-purple-400 hover:opacity-60 z-0 hover:z-50 text-lg justify-center items-center">AY</div>
                </div>
                <div class="absolute ml-8 font-bold">
                    <div class="flex rounded-full w-12 h-12 text-white bg-pink-400 hover:opacity-60 z-10 hover:z-50 text-lg justify-center items-center">WM</div>
                </div>
                <div class="absolute ml-24 font-bold">
                    <div class="flex rounded-full w-12 h-12 text-white bg-green-400 hover:opacity-60 z-20 hover:z-50 text-2xl justify-center items-center">＋</div>
                </div>
            </div>

            <div v-if="card.owner.id == userId" class="invisible hidden flex mt-2 items-center justify-end">
                <div class="transform hover:scale-125 motion-reduce:transform-none hover:opacity-60 mr-2" @click="editing=true">
                    <img src="../../images/pen32.png" alt="E" class="w-5 h-5 ">
                </div>
                <div class="transform hover:scale-125 motion-reduce:transform-none hover:opacity-60" @click="cardDelete">
                    <img src="../../images/rec32.png" alt="D" class="w-5 h-5">
                </div>
            </div>
        </div>
        <CardEditor
            v-else
            v-model="title"
            class="mb-2"
            label="Сохранить"
            @closed="editing=false"
            @saved="cardUpdate"
        ></CardEditor>
    </div>

</template>

<script>
import CardDelete from "./../graphql/CardDelete.gql";
import CardUpdate from "./../graphql/CardUpdate.gql";
import {EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../constants";
import CardEditor from "./CardEditor";
import {mapState} from "vuex";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';



export default {
    components: { CardEditor, DatePicker },
    props: {
        card: Object
    },
    data() {
        return {
            editing: false,
            title: this.card.title,
            timeRange: null
        };
    },
    computed: mapState({
        userId: state => state.user.id
    }),
    methods: {
        async cardDelete() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: CardDelete,
                    variables: {
                        id: this.card.id
                    },
                    update(store, {data: {cardDelete}}) {
                        self.$emit("deleted", {
                            store,
                            data: cardDelete,
                            type: EVENT_CARD_DELETED
                        });
                    }
                });
            } catch (error) {}
       },

        async cardUpdate() {
            const self = this;

            try {
                await this.$apollo.mutate({
                    mutation: CardUpdate,
                    variables: {
                        id: this.card.id,
                        title: this.title
                    },
                    update(store, { data: cardUpdate }) {
                        self.$emit("updated", {
                            store,
                            data: cardUpdate,
                            type: EVENT_CARD_UPDATED
                        });
                        self.editing = false;
                    }
                });
            } catch (error) {}
        }
    }
};
</script>
