<template>
  <div class="autocomplete">
    <label for="site-search">Search America: </label>
    <input v-model="message" placeholder="edit me" @input="changeHandler" />
    <button v-on:click="submit">Search</button>
  </div>
  <!-- <p>{{ this.markers }}</p>
  <p>{{ this.center }}</p> -->

  <ul class="autocomplete-results">
    <li
      class="autocomplete-result"
      v-for="(item, i) in items"
      :key="i"
      @click="setResult(item)"
    >
      {{ item }}
    </li>
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
    setResult: function (item) {
      this.message = item;
      this.submit();
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

.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>