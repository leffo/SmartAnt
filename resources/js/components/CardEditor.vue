<template>
    <div>
        <textarea
            class="rounded-md shadow-card py-1 px-2 outline-none w-11/12 text-gray-900 text-sm bg-white h-16 resize-none ml-2 mr-2"
            placeholder="Enter a title for this card..."
            :value="value"
            ref="card"
            @keyup.esc="closed"
            @keyup.enter="saved"
            @input="$emit('input', $event.target.value)"
        ></textarea>

        <div class="flex">
            <button
                @click="saved"
                class="rounded-sm py-1 px-3 bg-indigo-700 text-white cursor-pointer hover:bg-indigo-600 outline-none ml-2 mr-1 mb-2">
                {{ label }}
            </button>
            <button
                @click="closed"
                class="py-1 px-3 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500 mr-2 mb-2">
                Cancel
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["value", "label"],
    mounted() {
        this.$refs.card.focus();
   },
    methods: {
        closed() {
            this.$emit('closed');
        },
        saved() {
            this.$emit('saved');
        }
    }
};
</script>
