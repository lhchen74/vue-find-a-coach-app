<template>
	<form @submit.prevent="submitForm">
		<div class="form-control">
			<label for="email">Your E-Mail</label>
			<input type="email" id="email" v-model.trim="email" />
		</div>
		<div class="form-control">
			<label for="message">Message</label>
			<textarea id="message" rows="5" v-model.trim="message"></textarea>
		</div>
		<p class="errors" v-if="!formIsValid">
			Please enter a valid email and non-empty message.
		</p>
		<div class="actions">
			<base-button>Send Message</base-button>
		</div>
	</form>
</template>
<script>
export default {
	data() {
		return {
			email: "",
			message: "",
			formIsValid: true,
		};
	},
	methods: {
		submitForm() {
			this.formIsValid = true;

			if (!this.validateEmail(this.email) || this.isEmpty(this.message)) {
				this.formIsValid = false;
				return;
			}

			this.$store.dispatch("requests/contactCoach", {
				email: this.email,
				message: this.message,
				coachId: this.$route.params.id,
			});

			this.$router.replace("/coaches");
		},
		validateEmail(email) {
			const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
			return regex.test(email);
		},
		isEmpty(value) {
			return value === "";
		},
	},
};
</script>
<style scoped>
.form-control {
	margin: 2rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
	font-size: 1.4rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 0.2rem solid #ccc;
	font: inherit;
	padding: 0.2em 0.4em;
	border-radius: 0.8rem;
}

input:focus,
textarea:focus {
	background-color: var(--pink-2);
	outline: none;
	border-color: var(--purple-3);
}

input[type="checkbox"] {
	display: inline-block;
	width: auto;
	border: none;
	transform: scale(1.2);
}

h3 {
	margin: 0.5rem 0;
	font-size: 1.2rem;
	margin-bottom: 1rem;
}

.errors {
	color: #d13b3b;
	font-weight: bold;
}

p {
	margin-top: 0.2em;
	margin-bottom: 1.6rem;
	font-size: 1.4rem;
}
</style>
