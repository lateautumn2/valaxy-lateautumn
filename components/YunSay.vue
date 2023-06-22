<script lang="ts" setup>
import {ref,onMounted} from "vue"

const sayContent = ref()
const sayAuthor = ref()
const sayFrom = ref()

const getSay = ()=>{
    fetch('https://v1.jinrishici.com/all.json').then( (res)=>{
        if(res.ok){
            res.json().then((data)=>{
                sayAuthor.value = data.author
                sayFrom.value = data.origin
                sayContent.value = data.content
            })
        }

    }).catch((error)=>{
        console.log(error);
    })
}
onMounted(()=>{
    getSay()
})


</script>

<template>
    <div class="say">
      <span v-if="sayContent" class="say-content animate-fade-in animate-iteration-1">{{ sayContent }}</span>
      <span v-if="sayAuthor" class="say-author"> {{ sayAuthor }}</span>
      <span v-if="sayFrom" class="say-from">《{{ sayFrom }}》</span>
    </div>
  </template>
  
  <style lang="scss">
  .say {
    color: var(--va-c-text);
    display: block;
    text-align: center;
    font-family: var(--va-font-serif);
    font-weight: bold;
    padding: 0.5rem;
    border-top: var(--va-border-width) solid var(--va-c-text-light);
    border-bottom: var(--va-border-width) solid var(--va-c-text-light);
  
    .say-content {
      display: block;
    }
  
    .say-from {
      display: block;
    }
  }
  </style>