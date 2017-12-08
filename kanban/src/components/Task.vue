<template lang="html">
  <div>
    <div class="whitespace"></div>
    <div class="card">
      <div class="card-header" v-if="editMode">
        <h3>task name</h3>
        <input type="text" v-model="task.name">
      </div>
      <div v-else class="card-header">{{ task.name }}</div>
      <div v-if="editMode" class="card-body">
        <h3>point</h3>
        <input type="text" v-model="task.point">
      </div>
      <p v-else class="card-body">
        point: {{task.point}} <br>
        assigned to: {{task.assigned}}
      </p>
      <div v-if="editMode" class="card-body">
        <h3>assigned to</h3>
        <input type="text" v-model="task.assigned">
      </div>
      <div class="card-footer">
        <button v-if="editMode" class="btn btn-primary" name="button" @click="updateData">Save</button>
        <div v-else>
          <button class="btn btn-primary" name="button" @click="doEdit">Edit</button>
          <button class="btn btn-info" name="button" @click="moveTask">Move</button>
          <button class="btn btn-danger" name="button" @click="deleteTask">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task', 'list', 'index', 'editMode'],
  data () {
    return {
      name: '',
      point: 0,
      assigned: ''
    }
  },
  methods: {
    deleteTask () {
      this.task.id = this.task['.key']
      this.task.from = this.list
      this.task.index = this.index
      this.$emit('delete-task', this.task)
    },
    doEdit () {
      this.$emit('editing')
    },
    updateData () {
      this.$emit('update-data', {
        id: this.task['.key'],
        name: this.task.name,
        point: this.task.point,
        assigned: this.task.assigned,
        from: this.list
      })
      this.$emit('reset-edit')
    },
    moveTask () {
      this.task.id = this.task['.key']
      this.task.from = this.list
      this.task.index = this.index
      this.$emit('move-task', this.task)
    }
  }
}
</script>

<style lang="css">
.whitespace {
  margin: 8px
}
</style>
