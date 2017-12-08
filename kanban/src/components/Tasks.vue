<template lang="html">
  <div class="container-fluid">
    <div class="addTask" v-if="addTask">
      <div class="card">
        <div class="card-header">
          <h2>Task : </h2>
          <input type="text" v-model="taskname">
        </div>
        <div class="card-body">
          <h3>Point : </h3>
          <input type="number" v-model="point">
        </div>
        <div class="card-body">
          <h3>Assigned To :</h3>
          <input type="text" v-model="assignedto">
        </div>
        <div class="card-footer">
          <button type="button" @click="submitTask">Add</button>
        </div>
      </div>
    </div>
    <div class="whitespace"></div>
    <div class="row">
      <div class="col-3">
        <button v-if="showMove" type="button" class="btn btn-danger" name="button" @click="confirmMove('backlog')">Backlog</button>
        <div class="card mb-3">
          <div class="card-header">
            Backlog
          </div>
          <div class="card-body">
            <task v-for="(task, index) in backlog" :key="index" :task="task" :index="index" list="backlog" @update-data="update" @move-task="pindah" @editing="setEditMode" :editMode="editMode" @reset-edit="resetEditMode" @delete-task="deleteTask"/>
          </div>
        </div>
      </div>
      <div class="col-3">
        <button v-if="showMove" type="button" class="btn btn-warning" name="button" @click="confirmMove('todo')">ToDo</button>
        <div class="card mb-3">
          <div class="card-header">
            ToDo
          </div>
          <div class="card-body">
            <task v-for="(task, index) in todo" :key="index" :task="task" :index="index" list="todo" @update-data="update" @move-task="pindah" @editing="setEditMode" :editMode="editMode" @reset-edit="resetEditMode" @delete-task="deleteTask"/>
          </div>
        </div>
      </div>
      <div class="col-3">
        <button v-if="showMove" type="button" class="btn btn-primary" name="button" @click="confirmMove('doing')">Doing</button>
        <div class="card mb-3">
          <div class="card-header">
            Doing
          </div>
          <div class="card-body">
            <task v-for="(task, index) in doing" :key="index" :task="task" :index="index" list="doing" @update-data="update" @move-task="pindah" @editing="setEditMode" :editMode="editMode" @reset-edit="resetEditMode" @delete-task="deleteTask"/>
          </div>
        </div>
      </div>
      <div class="col-3">
        <button v-if="showMove" type="button" class="btn btn-success" name="button" @click="confirmMove('done')">Done</button>
        <div class="card mb-3">
          <div class="card-header">
            Done
          </div>
          <div class="card-body">
            <task v-for="(task, index) in done" :key="index" :task="task" :index="index" list="done" @update-data="update" @move-task="pindah" @editing="setEditMode" :editMode="editMode" @reset-edit="resetEditMode" @delete-task="deleteTask"/>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" name="button" @click="addTaskTrue">Add Task</button>
  </div>
</template>

<script>
import task from '@/components/Task'
import {backlog, todo, doing, done} from '@/firebase'
export default {
  firebase: {
    backlog: backlog,
    todo: todo,
    doing: doing,
    done: done
  },
  data () {
    return {
      'editTask': false,
      'addTask': false,
      'taskname': '',
      'point': 0,
      'assignedto': '',
      'temp': null,
      'showMove': false,
      'editMode': false
    }
  },
  components: {
    'task': task
  },
  methods: {
    deleteTask (payload) {
      switch (payload.from) {
        case 'backlog': {
          backlog.child(payload.id).remove()
          break
        }
        case 'todo': {
          todo.child(payload.id).remove()
          break
        }
        case 'doing': {
          doing.child(payload.id).remove()
          break
        }
        case 'done': {
          done.child(payload.id).remove()
          break
        }
      }
    },
    setEditMode () {
      this.editMode = true
    },
    resetEditMode () {
      this.editMode = false
    },
    addTaskTrue () {
      this.addTask = true
    },
    submitTask () {
      todo.push({
        'name': this.taskname,
        'point': this.point,
        'assigned': this.assignedto
      })
      this.taskname = ''
      this.point = 0
      this.assignedto = ''
      this.addTask = false
    },
    update (payload) {
      switch (payload.from) {
        case 'backlog': {
          backlog.child(payload.id).set(payload)
          break
        }
        case 'todo': {
          todo.child(payload.id).set(payload)
          break
        }
        case 'doing': {
          doing.child(payload.id).set(payload)
          break
        }
        case 'done': {
          done.child(payload.id).set(payload)
          break
        }
      }
    },
    pindah (payload) {
      this.showMove = true
      this.temp = payload
    },
    confirmMove (msg) {
      switch (this.temp.from) {
        case 'backlog': {
          backlog.child(this.temp.id).remove()
          break
        }
        case 'todo': {
          todo.child(this.temp.id).remove()
          break
        }
        case 'doing': {
          doing.child(this.temp.id).remove()
          break
        }
        case 'done': {
          done.child(this.temp.id).remove()
          break
        }
      }
      let obj = {
        assigned: this.temp.assigned,
        name: this.temp.name,
        point: this.temp.point
      }
      switch (msg) {
        case 'backlog': {
          backlog.push(obj)
          break
        }
        case 'todo': {
          todo.push(obj)
          break
        }
        case 'doing': {
          doing.push(obj)
          break
        }
        case 'done': {
          done.push(obj)
          break
        }
      }
      this.showMove = false
    }
  }
}
</script>

<style lang="css">
.whitespace {
  margin: 16px;
}
</style>
