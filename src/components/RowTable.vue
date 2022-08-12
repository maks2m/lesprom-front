<template>
  <tr>
    <td v-text="user.id"></td>
    <td v-text="user.username"></td>
    <td>********</td>
    <td>
      <div v-for="role in user.roles">
        <div v-text="role.role"></div>
      </div>
    </td>
    <td>
      <button class="btn btn-secondary" @click="edit(user)">edit</button>
    </td>
    <td>
      <button class="btn btn-danger" @click="del(user.id)">delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "RowTable",
  props: {
    user: { type: Object, required: true },
  },
  methods: {
    edit(){
      this.$emit('editItem'/* , { some: 'nz' } */);
    },
    del(){
      this.$emit('del'/* , { some: 'nz' } */);
    },
  },
}
</script>

<style scoped>

</style>