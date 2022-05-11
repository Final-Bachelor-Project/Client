<template>
  <div class="complete-profile-wrapper">
    <header><h3>Complete your profile</h3></header>
    <div class="profile-img-container">
      <b-avatar
        badge
        badge-variant="primary"
        variant="secondary"
        :src="user.profileImage"
        size="7rem"
      >
        <template #badge>
          <a>
            <b-icon
              scale="0.6"
              icon="pen-fill"
              @click="editImage"
            />
          </a>
        </template>
      </b-avatar>
      <h5 class="pt-2">
        {{ user.username }}
      </h5>
    </div>
    <b-form
      class="profile-form"
      @submit="completeProfile"
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
            id="complete-btn"
            class="large-btn-mobile"
            type="submit"
            variant="primary"
          >
            Complete
          </b-button>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
    data() {
        return {
            user: {},
        }
    },
    created: async function () {
        const currentUser = (await this.$axios.get('/api/users/current')).data.user
        this.user = {
            spotifyUserId: currentUser.id,
            username: currentUser.display_name,
            firstName: "",
            lastName: "",
            profileImage: currentUser.images ? currentUser.images[0].url : "",
            dateOfBirth: "",
            country: currentUser.country ? currentUser.country : "",
            city: "",
            bio: ""
        }
    },
    methods: {
        completeProfile: async function (e) {
            e.preventDefault()
            await this.$axios.post("/api/users", {...this.user})
            this.$router.push({path: '/explore'});
            this.makeToast()
        },
        makeToast() {
            this.$root.$bvToast.toast('', {
                title: 'Profile completed!',
                variant: 'success',
                toaster: 'b-toaster-top-center',
                solid: true
            })
        },
        editImage: function() {
            console.log('clicked');
        }
    }
}
</script>
<style scoped>

header {
    text-align: center;
    padding-top: 2rem;
}

.complete-profile-wrapper {
    display: grid;
    height: 100vh;
    grid-template-rows: 1fr 2fr 5fr;
}

.profile-img-container {
    text-align: center;
}

.profile-img-container::v-deep .b-avatar-badge{
    min-height: 1rem;
    min-width: 1rem;
    padding: 0.2rem;
}

.profile-img-container::v-deep .b-avatar-badge:hover{
    cursor: pointer;
    transform: scale(1.2);
}

.profile-form {
    margin: 1.5rem;
    /* position: relative; */
    /* text-align: center; */
}

.profile-form input {
    margin-bottom: 1rem;
}

/* .profile-form button {
    position: absolute; 
    bottom: 0.7rem;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
} */

@media only screen and (min-width: 768px) {
    .flex-container{
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
        margin-left: 3rem;
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