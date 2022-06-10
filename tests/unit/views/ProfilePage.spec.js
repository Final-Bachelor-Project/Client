import { shallowMount } from '@vue/test-utils'
import ProfilePage from '../../../src/views/ProfilePage.vue'

describe('ProfilePage', () => {

    const user = {
        profileImage: "",
        username: "usernname",
        firstName: "First",
        lastName: "Last",
        city: "city",
        country: 'country',
        dateOfBirth: 'date',
        bio: 'bio',
        tracks: [
            {
                _id: '1',
                image: "",
                name: "Track 1"
            },
            {
                _id: '2',
                image: "",
                name: "Track 2"
            }
        ],
        artists: [
            {
                _id: '1',
                image: "",
                name: "Artist 1",
                genres: ['pop', 'rock', 'folk']
            },
            {
                _id: '2',
                image: "",
                name: "Artist 2",
                genres: ['pop', 'jazz', 'cumbia']
            },
            {
                _id: '2',
                image: "",
                name: "Artist 2",
                genres: ['cumbia', 'pop', 'folk']
            },
            {
                _id: '2',
                image: "",
                name: "Artist 2",
                genres: ['cumbia', 'pop', 'disco']
            }
        ]
    }

    const wrapper = shallowMount(ProfilePage, {
        computed: {
            profile() {
                return user
            }
        }
    })


    test('topGenres', () => {
        expect(wrapper.vm.topGenres).toStrictEqual(['pop', 'cumbia', 'folk'])
    })
})