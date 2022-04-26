<template>
  <div class="complete-profile-wrapper">
    <header><h3>Complete your profile</h3></header>
    <div class="profile-img-container">
      <b-avatar
        badge
        badge-variant="primary"
        variant="secondary"
        :src="user.profileImg"
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
      <b-form-input
        v-model="user.firstName"
        placeholder="First Name"
      />
      <b-form-input
        v-model="user.lastName"
        placeholder="Last Name"
      />
      <b-form-input
        v-model="user.dateOfBirth"
        type="date"
        placeholder="Date of birth"
      />
      <b-form-input
        v-model="user.city"
        placeholder="City"
      />
      <b-form-input
        v-model="user.country"
        placeholder="Country"
      />
      <b-form-textarea
        v-model="user.bio"
        placeholder="Tell us something about yourself..."
        rows="3"
        max-rows="5"
      />
      <b-button
        class="large-btn-mobile"
        type="submit"
        variant="primary"
      >
        Complete
      </b-button>
    </b-form>
  </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                email: "someone@gmail.com",
                firstName: "",
                lastName: "",
                username: "my_username",
                profileImg: "https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419",
                //profileImg: "",
                city: "",
                country: "Denmark",
                dateOfBirth: "",
                bio: ""
            }
        }
    },
    methods: {
        completeProfile: function (e) {
            e.preventDefault()
            console.log(this.user);
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
    position: relative;
}

.profile-form input {
    margin-bottom: 1rem;
}

.profile-form button {
    position: absolute; 
    bottom: 0.7rem;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
}

</style>