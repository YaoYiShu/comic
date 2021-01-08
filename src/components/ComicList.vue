<template>
  <div class="comic-list">
    <ListItem
      :book="book"
      :index="index"
      v-for="(book, index) in books"
      :key="index"
      :isHome="isHome"
    ></ListItem>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem';
export default {
  components: {
    ListItem
  },
  props: ['isHome'],
  mounted() {
    this.$store.dispatch('slideListAsync');
  },
  computed: {
    books() {
      // console.log(this.$store.state.books);
      return this.$store.state.books;
    }
  }
};
</script>
