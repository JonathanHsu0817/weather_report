<template>
	<div class="">
		<Suspense>
			<AsyncCityView />
			<template #fallback>
				<CityViewSkeleton />
			</template>
		</Suspense>
	</div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
import CityViewSkeleton from '../components/CityViewSkeleton.vue';
</script>