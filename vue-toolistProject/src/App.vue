<!-- VUE数据驱动版本 -->
<template>
  <div class="container">
    <div class="count">
      待办:<span class="todo">{{todoCount}}</span>
      已完成:<span class="finish">{{ finishCount }}</span>
      全部:<span class="all">{{ totalCount }}</span>
      <button class="clear-done-btn" @click="clearDone" :disabled="finishCount===0">清除已完成</button>
      <button class="clear-all-btn" @click="clearAll" :disabled="totalCount === 0">清除全部任务</button>
    </div>
    <ul>
      <li v-for="(task) in sortListTask"
      :key="task.id"
      :class="{done:task.done}">
      <span class="circle" @click="toggleDone(task.id)"></span>
      <template v-if="editIndex===task.id">
        <input type="text"
        class="edit-input"
        v-model="task.task"
        @keydown.enter="saveEdit(task.id)"
        @keydown.esc="cancelEdit"
        @blur="saveEdit(task.id)"
        ref="editInputRef">
      </template>
      <span v-else class="task-text" @click="!task.done&&edit(task.id)">{{ task.task }}</span>
      <span class="del-Task" @click="delTask(task.id)">x</span>
      </li>
    </ul>
  </div>
  <input type="text" class="input" v-model="message" @keydown.enter="addHander">
  <button class="button" @click="addHander">添加任务</button>
  
</template>

<script setup>
import { ref , nextTick,computed} from 'vue';
let message=ref('')
let editIndex=ref(null)
let originText=ref('')
const editInputRef=ref(null)
let listTask =ref(JSON.parse(localStorage.getItem('tasks'))||[])


//保存localStorage 的工具函数
function saveToStorage() {
  localStorage.setItem('tasks',JSON.stringify(listTask.value))
}


function addHander() {
  
  const val=message.value.trim()
  if(!val)return

  //新增任务是未完成false;unshift加到数组最前面，
  listTask.value.unshift({
    id:Date.now(),
    task:val,
    done:false
  })
  saveToStorage()
  message.value=''
}

function delTask(id) {
  // 删除数组中对应下标那一项
  listTask.value=listTask.value.filter(item=>item.id!==id)
  saveToStorage()
}
// 点击圆圈切换完成/待办
function toggleDone(id) {
  // 翻转布尔值
  const target=listTask.value.find(item=>item.id===id)
  if(target){
    target.done=!target.done
    saveToStorage()
  }
}

// 点击文字编辑
function edit(id) {
  const target=listTask.value.find(item=>item.id===id)
  if(!target) return
  originText.value=target.task
  editIndex.value=id
  // 等DOM更新完成后，让输入框自动聚焦
  nextTick(()=>{
    editInputRef.value?.[0]?.focus()
  })
}

function saveEdit(id) {
  const target=listTask.value.find(item=>item.id===id)
  const val=target.task.trim()
  if(!val){
    cancelEdit()
    return
  }
  saveToStorage()
  // 退出编辑状态
  editIndex.value=null

}

function cancelEdit() {
  const idx=editIndex.value
  if(idx===null)return
  const target=listTask.value.find(item=>item.id===idx)
  if(target){
    target.task=originText.value
  }
  editIndex.value=null
}

//count
let totalCount=computed(()=>{
  return listTask.value.length
})

let finishCount=computed(()=>{
  return listTask.value.filter(item=>item.done).length
})

let todoCount=computed(()=>{
  return listTask.value.filter(item=>!item.done).length
})


//排序，完成在后，待办在前
let sortListTask=computed(()=>{
 return [...listTask.value].sort((a,b)=>a.done-b.done)
})
//清除已完成
function clearDone() {
  listTask.value=listTask.value.filter(item=>item.done===false)//filter 返回新数组，
  saveToStorage()
}


function clearAll() {
  if(!confirm('确定要删除所有任务吗？这个操作不可恢复！')) return
  listTask.value=[]
  saveToStorage()
}

</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .container{
    background-color: #fff;
    height: 500px;
    width: 31%;
    border-radius: 10px;
    padding: 16px;
    margin: 12px;
    overflow-y: auto;
    box-shadow: 0 1px 6px rgba(30, 100, 180, 0.12);
    font-weight: 500;
    color: #2c3e50;
  }

  .button{
    position: absolute;
    left:402px ;
    padding: 6px 14px;
    border: none;
    background: #3b82f6;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
  }
  .button:hover{
    background: #2563eb;
  }

  .input{
    width: 390px;
    padding: 7px 12px;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    outline: none;
    transition: 0.2s;
    margin-left: 12px;
  }
  .input:focus{
    border-color: #3b82f6;
  }

  .p{
    position: absolute;
    left: 10px;
    color: #94a3b8;
    font-size:14px;
  }

  ul{
    padding: 0;
    margin: 10px 0 0;
  }
  
  li{
    /* background:#eeeff0; */
    list-style: none;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    padding: 10px 8px;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 6px;
    transition: 0.2s;
  }
  li:hover{
    background-color: #f0f7ff;
  }

  /* ✅ 重点修改：用 ::before 伪元素来画圆圈 */
  .circle::before{
    content: "○";
    font-size: 18px;
    color: #3b82f6;
    flex-shrink: 0;
    user-select: none; /* 防止双击选中文字 */
    cursor: pointer;
  }
  li.done .circle::before{
    content: "✔";
  }
  .task-text{
    flex:1; /* 文字占剩余空间 */
  }

  li.done .task-text{
    color: #94a3b8;
    text-decoration: line-through; /* 完成文字加删除线 */
  }
  .del-Task{
    color: #ef4444;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  /* 默认隐藏 */
  opacity: 0;
  transition: 0.2s;
  margin-left: 8px;
  }
  li:hover .del-Task{
    opacity: 1;
  }
  .count{
  margin-bottom:10px;
  color:#475569;
  font-size:15px;
  display:flex;
  flex-wrap: wrap; /* 空间不够自动换行，不会挤在一起 */
  gap: 12px 16px;  /* 行间距 12px，元素之间横向间距16px */
  align-items: center;
}
.clear-done-btn{
  
  padding:4px 8px;
  border:none;
  background:#f56c6c;
  color:white;
  border-radius:4px;
  cursor:pointer;
}
.clear-done-btn:hover{
  background:#e64340;
}

.clear-done-btn:disabled{
  background:#cccccc;
  cursor:not-allowed;
}
.clear-all-btn{
  
  padding:4px 8px;
  border:none;
  background:#666;
  color:white;
  border-radius:4px;
  cursor:pointer;
}
.clear-all-btn:hover{
  background:#333;
}
.clear-all-btn:disabled{
  background:#cccccc;
  cursor:not-allowed;
}
.edit-input{
  width:100%;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  outline: none;
  padding: 2px 4px;
}

</style>
