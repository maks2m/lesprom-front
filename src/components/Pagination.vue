<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
          :class="{ disabled: isInFirstPage }">
        <button class="page-link"
                aria-label="First"
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item"
          :class="{ disabled: isInFirstPage }">
        <button class="page-link"
                aria-label="Previous"
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage">
          <span aria-hidden="true">&#8249;</span>
        </button>
      </li>

      <!-- Visible Buttons Start -->

      <li v-for="page in pages"
          :key="page.name"
          class="page-item"
          :class="{ active: isPageActive(page.name) }">
        <button class="page-link"
                aria-label="Next"
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled">
          <span aria-hidden="true">{{ page.name }}</span>
        </button>
      </li>

      <!-- Visible Buttons End -->

      <li class="page-item"
          :class="{ disabled: isInLastPage }">
        <button class="page-link"
                aria-label="Next"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage">
          <span aria-hidden="true">&#8250;</span>
        </button>
      </li>
      <li class="page-item"
          :class="{ disabled: isInLastPage }">
        <button class="page-link"
                aria-label="Last"
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    /**
     * максимальное кол-во отображаемых кнопок
     */
    maxVisibleButtons: { type: Number, required: false, default: 3 },
    /**
     * всего страниц
     */
    totalPages: { type: Number, required: true },
    /**
     * количество элементов на одной странице
     */
    perPage: { type: Number, required: true },
    /**
     * текущая страница
     */
    currentPage: { type: Number, required: true }
  },
  computed: {
    startPage() {
      // When on the "first" page
      if (this.currentPage <= ((this.maxVisibleButtons - this.maxVisibleButtons % 2) / 2)) return 1;
      // When on the "last" page
      if (this.currentPage >= this.totalPages - ((this.maxVisibleButtons - this.maxVisibleButtons % 2) / 2) && this.currentPage <= this.totalPages)
        if (this.totalPages >= this.maxVisibleButtons) {
          return this.totalPages - this.maxVisibleButtons + 1;
        } else {
          return 1;
        }
      // When in between
      return this.currentPage - (this.maxVisibleButtons - this.maxVisibleButtons % 2) / 2;
    },
    pages() {
      const range = [];
      for ( let i = this.startPage;
            i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
            i++ ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
}
</script>

<style scoped>

</style>