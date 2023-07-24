<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a city or state"
        @input = "getSearchResult"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px-1px-0-0-#004E71]" 
      />
      <ul 
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">No results match your query, please try it again.</p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
            class="py-2 cursor-pointer hover:bg-blue-500"
            @click="previewCity(searchResult)"
          >
          {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

const mapboxAPIKey = `pk.eyJ1Ijoiam9obm55MzI5IiwiYSI6ImNsa2FwbnZjZjA3N2IzZXM1MW56YmRkN2gifQ.OtYKA0ggc0u9lU6zILJiIg`

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(',');
  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(' ',''), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1], //緯度
      lng: searchResult.geometry.coordinates[0], //經度
      preview: true
    }
  })
}

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResult = () => {
  queryTimeout.value = setTimeout( async () => {
    if( searchQuery.value !== ''){
      try {
        clearTimeout(queryTimeout.value)
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`)
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true  
      }
      return;
    };
    mapboxSearchResults.value = null;
  }, 300)
}
</script>
