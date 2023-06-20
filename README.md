<h1 align="center">
  <br>
    One Adventure
    <h3 align="left">
        <i>A social networking mobile application designed to allow users to find and invite friends to nearby outdoor adventures.</i>
      <br>
    </h3>
    <br>
</h1>

## Technologies Used

### setup & configuration
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-%2320232a.svg?&style=for-the-badge&logo=expo&logoColor=blue)

### frontend
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### front-to-back
![Socket.io](https://img.shields.io/badge/socket.io-FFF?style=for-the-badge&logo=socket.io&logoColor=black)
<br>

## 🚀 Getting Started

No matter the environment, first run `npm install` in the root directory.

1. Create a new Firebase project and initialize Firestore and Authentication via email and password.
2. `npm run start` in `ROOTDIR`
4. Use the corresponding keys to launch the app on your specified device.
<br>

## The App
<img width="247.5" alt="sign in" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/5e9dc0d4-6d5e-4810-b43a-4faaf5a44d6a">

<br>

### Landing Page
<hr>
<details>
<summary>LOGIN</summary>
<br>
<ul>
  <li>Authenticates users who have already created an account</li>
  <li>Redirects to "Home" page on successful login</li>
  <li>Nav Bar (bottom) is rendered upon succesful login</li>
</ul>
<img width="247.5" alt="sign in" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/5e9dc0d4-6d5e-4810-b43a-4faaf5a44d6a">
</details>
<details>
  <summary>SIGN UP</summary>
  <br>
  <ul>
    <li>Allows for creation of new account</li>
    <li>"Create Account" button directs new user to set up profile</li>
      <ul>
        <li>User Enters Basic Information</li>
        <li>Upon successful account creation, new user is redirected to "Home" page</li>
        <li>Nav Bar (bottom) is rendered</li>
      </ul>
  </ul>
  <img width="247.5" alt="sign up" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/48eea807-5664-4f79-b440-255a894023c7"
>
</details>
<br>

### Adventure List 
<hr>
<details>
  <summary>MAIN VIEW</summary>
  <br>
  <ul>
    <li>Scroll to view adventures in your area</li>
    <li>Tap an event card for more information</li>
    <li>Tap the star on an event card to save the event to your list of interested events</li>
  </ul>
  <div style="display: flex; flex-direction: row; align-items: space-evenly;">
    <img width="261" alt="image" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/de63d195-3a6f-448e-8b1d-8482d7ad6ec0">
  </div>
</details>
<details>
  <summary>DETAIL VIEW</summary>
  <br>
  <ul>
    <li>Access by tapping the event card</li>
    <li>Shows additional information about the event and if any friends are attending</li>
    <li>Friends conditionally render if they have marked themselves attending that specific event</li>
  </ul>
  <img width="262" alt="image" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/7024be8b-a4ee-4c7c-929b-fafd36e84861">
  <img width="263" alt="image" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/30cafdc4-4ab8-426a-9002-7e72c5e16c47">
</details>
<br>

### 🐩 Invites & Messaging
<hr>
<details>
  <summary>PENDING INVITES</summary>
  <br>
  <ul>
    <li>Shows "invites", i.e. other users who have swiped right on your dog</li>
    <li>Similar to home page, swipe right to accept invite, swipe left to reject</li>
    <li><em>Future Enhancement: </em>tap invite to see associated profile</li>
  </ul>
  <img width="247.5" alt="accept invite" src="https://user-images.githubusercontent.com/112882051/224509002-5d1d29cf-c09d-4a62-805f-cad1945d6227.png">
</details>
<details>
  <summary>ACCEPTED & MESSAGING</summary>
  <br>
  <ul>
    <li>"Accepted" layout same as "Pending</li>
    <li>"Contains users whom you have swiped right to accept their invite, or vice-versa</li>
    <li>Tapping on a user in "accepted" brings up a chat view, with real-time messaging & emoji reaction capability</li>
  </ul>
  <img width="247.5" alt="messaging" src="https://user-images.githubusercontent.com/112882051/224509310-e9e62ac1-dbf8-44a7-9ff1-36cb95f9660e.png">
</details>
<br>

### 🌭 Events
<hr>
<details>
  <summary>INVITES & ATTENDING</summary>
  <br>
  <ul>
    <li>Shows events user is invited to/attending, based upon selected view</li>
    <li>Tapping on an event brings up details for the associated event</li>
    <li>User can RSVP to an event ("Invited" view) within event details modal</li>
  </ul>
  <div style="display: flex; flex-direction: row; align-items: space-evenly;">
    <img width="247.5" alt="invite or attending list" src="https://user-images.githubusercontent.com/112882051/224509938-07b4a04a-ed1a-4968-a216-53bcfa427638.png">
    <img width="247.5" alt="event details" src="https://user-images.githubusercontent.com/112882051/224510068-376694a0-6228-4060-96c4-6423a571b0e9.png">
  </div>
</details>
<details>
  <summary>CREATE EVENT</summary>
  <br>
  <ul>
    <li>Upon tapping ➕ icon, user can create a new event</li>
    <li>User can invite friends to the event before saving/creating</li>
  </ul>
  <img width="247.5" alt="invite or attending list" src="https://user-images.githubusercontent.com/112882051/224510147-10f3f24f-d058-4d8a-b059-5c49756a0bcb.png">
</details>
<br>

### Profile
<hr>
<details>
  <summary>Changing Profile Photo</summary>
  <br>
  <ul>
    <li>Tapping the edit button just below the profile photo opens a modal</li>
    <li>The Choose Photo button lets user browse their phone for a photo</li>
    <li>Tap upload once a photo has been chosen</li>
  </ul>
  <video src='https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/19845668/62e20d90-6641-45a6-9eea-a8b0917d8211' width=180/>
</details>
<details>
  <summary>Editing Profile Details</summary>
  <br>
  <ul>
    <li>Tapping the edit button to the right of a detail opens a modal</li>
    <li>When satitisfied with input tap the Submit button</li>
  </ul>
  <video src='https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/19845668/716fdc83-65db-4674-b85d-6c92eb3a313c' width=180/>
</details>
<details>
  <summary>Following / Unfollow Friends</summary>
  <br>
  <ul>
    <li>To find friends to follow, tap the search button on the Friends List</li>
    <li>Tap a friend to follow them</li>
  </ul>
  <video src='https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/19845668/2eea0d31-8e70-4772-8bdc-d64f91b4b1ed' width=180/>
  
  <summary>Unfollowing Friends</summary>
  <br>
  <ul>
    <li>To unfollow a friend, tapping the X button opens a modal</li>
    <li>Tap Confirm to unfollow</li>
  </ul>
  <video src='https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/19845668/a4391361-b124-4d3c-9127-7eb1159a7109' width=180/>
</details>
<br>

## The Team
[Sasha Gordin](https://github.com/SashaGordin) (Project Manager) <br>
[Josh Jang](https://github.com/wooseok0717) <br>
[Aimee Kang](https://github.com/aimeekang) (UI Co-Manager) <br>
[Terrence Koo](https://github.com/tko0) <br>
[Bolton Lin](https://github.com/boltonlin) (Architecture Manager) <br>
[Arpan Shrestha](https://github.com/Pseudo08) <br>
[Noah Beito](https://github.com/noahbeito) <br>

## Conclusion
Find your next adventure!
