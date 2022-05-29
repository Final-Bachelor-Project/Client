<template>
  <div class="edit-profile-wrapper">
    <Navbar />
    <div class="profile-img-container">
      <b-avatar
        variant="secondary"
        :src="user.profileImage"
        size="7rem"
      />
      <h5 class="pt-2">
        {{ user.username }}
      </h5>
    </div>
    <b-form
      class="profile-form"
      @submit="editProfile"
    >
      <div class="flex-container">
        <b-form-input 
          id="first-name"
          v-model="user.firstName"
          required
          placeholder="First Name"
        />
        <b-form-input
          id="last-name"
          v-model="user.lastName"
          required
          placeholder="Last Name"
        />
      </div>
      <b-form-group 
        label="Date of birth"
        label-for="date-of-birth-input"
      >
        <b-form-input
          id="date-of-birth-input"
          v-model="user.dateOfBirth"
          required
          type="date"
        />
        <div class="flex-container">
          <b-form-input
            id="city"
            v-model="user.city"
            required
            placeholder="City"
          />
          <b-form-input
            id="country"
            v-model="user.country"
            required
            placeholder="Country"
          />
        </div>
        <b-form-textarea
          id="bio"
          v-model="user.bio"
          placeholder="Tell us something about yourself..."
          rows="3"
          max-rows="5"
        />
        <div class="text-center mt-4">
          <b-button
            id="edit-profile-btn"
            class="large-btn-mobile"
            type="submit"
            variant="primary"
          > 
            Edit
          </b-button>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue"
export default {
    components: {
      Navbar
    },
    data() {
        return {
            user: {},
        }
    },
    created: async function() {
        this.user = JSON.parse(localStorage.loggedInUser)
    },
    methods: {
        editProfile: async function (e) {
            e.preventDefault()
            const updatedUser = await this.$axios.put("/api/users", {...this.user})
            console.log(updatedUser.data);
            localStorage.loggedInUser = JSON.stringify(updatedUser.data)
            this.$router.push({path: '/profile'})
            this.makeToast()
        },
        makeToast() {
            this.$root.$bvToast.toast('', {
                title: "Profile updated",
                variant: 'success',
                toaster: 'b-toaster-top-center',
                solid: true
            })
        }
    }
}
</script>
<style scoped>
header {
    text-align: center;
    padding-top: 2rem
}

.edit-profile-wrapper {
    display: grid;
    height: 100vh;
    grid-template-rows: 1fr 2fr 5fr;
}

.profile-img-container {
    text-align: center;
    margin-top: 5rem;
}

.profile-form {
    margin: 1.5rem;
}

.profile-form input {
    margin-bottom: 1rem;
}

@media only screen and (min-width: 768px) {
    .flex-container {
        display: flex;
        flex-direction: row;
    }

    .flex-container input:first-child {
        margin-right: 0.5rem;
    }

    .flex-container input:last-child {
        margin-left: 0.5rem;
    }

    .profile-form {
        margin-right: 3rem;
        margin-left: 3rem
    }
}

@media only screen and (min-width: 992px) {
    .profile-form {
        margin-right: 8rem;
        margin-left: 8rem;
    }
}

@media only screen and (min-width: 1200px) {
    .profile-form {
        margin-right: 15rem;
        margin-left: 15rem;
    }
}
</style>