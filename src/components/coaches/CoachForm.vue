<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="firstname">FirstName</label>
			<input
				type="text"
				name="firstname"
				id="firstname"
				v-model.trim="firstName.val"
				@blur="clearValidity('firstName')"
			/>
			<p v-if="!firstName.isValid">FirstName must not be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !lastName.isValid }">
			<label for="lastname">LastName</label>
			<input
				type="text"
				name="lastname"
				id="lastname"
				v-model.trim="lastName.val"
				@blur="clearValidity('lastName')"
			/>
			<p v-if="!lastName.isValid">LastName must not be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea
				name="description"
				id="description"
				rows="5"
				v-model.trim="description.val"
				@blur="clearValidity('description')"
			></textarea>
			<p v-if="!description.isValid">Description must not be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !rate.isValid }">
			<label for="rate">Hourly Rate</label>
			<input
				type="number"
				name="rate"
				id="rate"
				v-model.number="rate.val"
				@blur="clearValidity('rate')"
			/>
			<p v-if="!rate.isValid">Rate must be greater than 0.</p>
		</div>
		<div class="form-control" :class="{ invalid: !areas.isValid }">
			<h3>Areas of Expertise</h3>
			<div>
				<input
					type="checkbox"
					id="frontend"
					value="frontend"
					v-model.trim="areas.val"
					@blur="clearValidity('areas')"
				/>
				<label for="frontend">Frontend Development</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="backend"
					value="backend"
					v-model.trim="areas.val"
					@blur="clearValidity('areas')"
				/>
				<label for="backend">Backend Development</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="career"
					value="career"
					v-model.trim="areas.val"
					@blur="clearValidity('areas')"
				/>
				<label for="career">Career Advisory</label>
			</div>
		</div>
		<p v-if="!areas.isValid">At least one expertise must be selected.</p>

		<p v-if="!formIsValid">Please fix the above errors and submit again.</p>
		<base-button>Register</base-button>
	</form>
</template>

<script>
export default {
	emits: ["save-data"],
	data() {
		return {
			firstName: {
				val: "",
				isValid: true,
			},
			lastName: {
				val: "",
				isValid: true,
			},
			description: {
				val: "",
				isValid: true,
			},
			rate: {
				val: null,
				isValid: true,
			},
			areas: {
				val: [],
				isValid: true,
			},
			formIsValid: true,
		};
	},
	methods: {
		isEmpty(value) {
			return value === "";
		},
		clearValidity(input) {
			this[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;

			if (this.isEmpty(this.firstName.val)) {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.isEmpty(this.lastName.val)) {
				this.lastName.isValid = false;
				this.formIsValid = false;
			}
			if (this.isEmpty(this.description.val)) {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (!this.rate.val || this.rate.val < 0) {
				this.rate.isValid = false;
				this.formIsValid = false;
			}
			if (this.areas.val.length === 0) {
				this.areas.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm() {
			this.validateForm();

			if (!this.formIsValid) return;

			const formData = {
				first: this.firstName.val,
				last: this.lastName.val,
				desc: this.description.val,
				rate: this.rate.val,
				areas: this.areas.val,
			};

			this.$emit("save-data", formData);
		},
	},
};
</script>

<style scoped>
.form-control {
	margin: 1.6rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
	font-size: 1.4rem;
}

input[type="checkbox"] + label {
	font-weight: bold;
	display: inline;
	margin-left: 1rem;
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

.invalid label {
	color: #d13b3b;
}

.invalid input,
.invalid textarea {
	border-color: #d13b3b;
}

.errors {
	color: #d13b3b;
	font-weight: bold;
}

.invalid input:focus,
.invalid textarea:focus {
	background: #fce2e2;
}

.checkboxes > div {
	margin: 0.5rem 0;
}
.checkboxes {
	margin-bottom: 2.4rem;
}

p {
	margin-top: 0.2em;
	font-size: 1.4rem;
}

.submit-btn {
	margin-top: 2rem;
}
</style>
