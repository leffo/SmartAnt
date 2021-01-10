<template>
    <div>
        <div v-if="!editing"
            class="group bg-white shadow-card rounded-sm p-2 cursor-pointer text_sm hover:bg-gray-300 mb-2 mr-2 ml-2 flex justify-between">
            <div>{{ card.title }}</div>
            <div
                v-if="card.owner.id == userId"
                class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500 object-right-bottom inline-block float-right"
            >
                <div
                    class="text-gray-400 pr-2 hover:text-yellow-700 float-right"
                    @click="editing=true"
                >
                    <img
                        class="min-w-16px h-14px opacity-75 hover:opacity-50 "
                        src="../../images/pen32.svg"
                        height="16"
                        width="14"
                        alt="E"
                    />
                </div>
                <div
                    class="text-gray-400 hover:text-red-700"
                    @click="cardDelete"
                >
                    <img
                        class="min-w-16px h-20px opacity-75 hover:opacity-50"
                        src="../../images/rec32.svg"
                        height="16"
                        width="20"
                        alt="D"
                    />
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

export default {
    components: { CardEditor },
    props: {
        card: Object
    },
    data() {
        return {
            editing: false,
            title: this.card.title
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
        },
    }
};
</script>
