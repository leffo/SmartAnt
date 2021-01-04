<template>
    <div class="bg-white shadow-card rounded-sm p-2 cursor-pointer text_sm hover:bg-gray-300 mb-2 mr-2 ml-2">
        {{ card.title }}
    </div>
</template>

<script>
export default {
    props: {
        card: Object
    }
}
</script>
