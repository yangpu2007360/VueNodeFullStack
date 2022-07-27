<template>
  <label for="site-search">Search America: </label>
  <input v-model="message" placeholder="edit me" @input="changeHandler" />
  <button v-on:click="submit">Search</button>
  <p>{{ this.markers }}</p>
  <p>{{ this.center }}</p>

  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
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
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>
import axios from "axios";
var latitude;
var longitude;
export default {
  name: "my-component",
  data() {
    return {
      message: "",
      items: [],
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        }, // Along list of clusters
      ],
    };
  },
  methods: {
    async changeHandler() {
      var input_value = event.target.value;
      try {
        const res = await axios.post("http://localhost:4000/graphql", {
          query: `{ language(key: "${input_value}") }`,
        });
        console.log(res);
        this.items = res.data.data.language;
      } catch (error) {
        console.log(error);
      }
    },
    async getCoordinates() {
      var address = this.message;
      var API_KEY = "AIzaSyB9LKz9DQj_pI1Du_ - URrPE20YfZKSM5Ug";
      await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address +
          "&key=" +
          API_KEY
      )
        .then((response) => response.json())
        .then((data) => {
          var latitude = data.results[0].geometry.location.lat;
          var longitude = data.results[0].geometry.location.lng;
          console.log({ latitude, longitude });
          this.markers = [
            {
              position: {
                lat: latitude,
                lng: longitude,
              },
            },
          ];
          this.center = { lat: latitude, lng: longitude };
        });
    },
    submit: function () {
      // get the geolocation of this.message
      this.getCoordinates(this.message);
      console.log("can I get them", latitude, longitude);
      this.markers = [
        {
          position: {
            lat: latitude,
            lng: longitude,
          },
        },
      ];
      this.center = { lat: latitude, lng: longitude };
    },
  },
};
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