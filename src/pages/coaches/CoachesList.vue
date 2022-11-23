<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occured!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter="setFilters"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button mode="flat" @click="loadCoaches(true)"
						>Refresh</base-button
					>
					<base-button
						link
						to="/auth?redirect=register"
						v-if="!isLoggedIn"
						>Login to Refister as Coach</base-button
					>
					<base-button
						v-if="isLoggedIn && !isCoach && !isLoading"
						link
						to="/register"
						>Register as Coach</base-button
					>
				</div>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasCoaches">
					<coach-item
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:firstName="coach.firstName"
						:lastName="coach.lastName"
						:rate="coach.hourRate"
						:areas="coach.areas"
					>
					</coach-item>
				</ul>
				<h3 v-else>No coaches found.</h3>
			</base-card>
		</section>
	</div>
</template>
<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
	components: {
		CoachItem,
		CoachFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
		};
	},
	computed: {
		filteredCoaches() {
			const coaches = this.$store.getters["coaches/coaches"];
			return coaches.filter((coach) => {
				if (
					this.activeFilters.frontend &&
					coach.areas.includes("frontend")
				) {
					return true;
				}

				if (
					this.activeFilters.backend &&
					coach.areas.includes("backend")
				) {
					return true;
				}

				if (
					this.activeFilters.career &&
					coach.areas.includes("career")
				) {
					return true;
				}

				return false;
			});
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
		},
		isCoach() {
			return this.$store.getters["coaches/isCoach"];
		},
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	created() {
		this.loadCoaches();
	},
	methods: {
		setFilters(updateFilters) {
			this.activeFilters = updateFilters;
		},
		async loadCoaches(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("coaches/loadCoaches", {
					forceRefresh: refresh,
				});
			} catch (err) {
				this.error = err.message || "Something went wrong";
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
	gap: 2.4rem;
	justify-content: center;
}

.controls {
	display: flex;
	justify-content: space-between;
	margin: 0.8rem 0 1.4rem 0;
}

@media only screen and (max-width: 600px) {
	ul {
		grid-template-columns: 1fr;
		gap: 2.4rem;
	}
}

h3 {
	text-align: center;
	margin-top: 2rem;
}

#loading {
	margin-top: 4rem;
}
</style>
