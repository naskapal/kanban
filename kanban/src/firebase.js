import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyA8M-l_dP6_Jz3rK2GOaWifHzHFbsS-RL0',
  authDomain: 'h8-overflow.firebaseapp.com',
  databaseURL: 'https://h8-overflow.firebaseio.com',
  projectId: 'h8-overflow',
  storageBucket: 'h8-overflow.appspot.com',
  messagingSenderId: '146128308394'
})

export const db = app.database()
export const tasks = db.ref('tasks')
export const backlog = tasks.child('backlog')
export const todo = tasks.child('todo')
export const doing = tasks.child('doing')
export const done = tasks.child('done')
