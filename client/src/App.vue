<template>

  <label for="site-search">Search America: </label>
  <input v-model="message" placeholder="edit me" v-on:change="changeHandler" />
  <button v-on:click="submit">Search</button>



  <ul>
    <li v-for = "item in items" :key="item"> {{ item }} </li>
  </ul>

  <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>

</template>

<script>
import axios from "axios";


export default {
  name: 'my-component',
  data() {
    return {
      message: '',
      items: [], 
      center: {lat: 51.093048, lng: 6.842120},
      markers: [
        {
          position: {
            lat: 51.093048, lng: 6.842120
          },
        }
        , // Along list of clusters
      ]
    }
  },
  methods: {
    async changeHandler(){
      
      var input_value = event.target.value

      try {
      const res = await axios.post(
          'http://localhost:4000/graphql', {
          query: `{ language(key: "${input_value}") }`,
          
        });
      console.log(res);
      this.items = res.data.data.language;
    } catch (error) {
      console.log(error);
    }
    
    },
    submit : function(){
      // get the geolocation of this.message 
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
