<template>
  <label for="site-search">Search America: </label>
  <p id= "current_search">{{ message }}</p>
  <input v-model="message" placeholder="edit me" v-on:change="changeHandler" />
  <button>Search</button>


  <ul>
    <li v-for = "item in items" :key="item"> {{ item }} </li>
  </ul>

</template>

<script>
import axios from "axios";

export default {
  name: 'my-component',
  data() {
    return {
      message: '',
      items: [], 
    }
  },
  async created() {
    try {
      const res = await axios.post(
          'http://localhost:4000/graphql');
      this.items = res.data.data.language;
    } catch (error) {
      console.log(error);
    }
    
  },
  methods: {
    async changeHandler(){
      
      try {
      const res = await axios.post(
          'http://localhost:4000/graphql', {
          query: '{ language }',
          variables: { "myVariable": `${this.message}`}
        });
      this.items = res.data.data.language;
    } catch (error) {
      console.log(error);
    }
    
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
