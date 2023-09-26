<h1 align="center">
  <br>
    One Adventure
    <h3 align="left">
        <i>A social networking mobile application designed to allow users to find and invite friends to nearby outdoor adventures.</i>
      <br>
    </h3>
    <br>
</h1>

## 🎬 Video Walkthrough of the App: 
[Click here](https://youtu.be/xXJcnzJeXUs) for a video of the app on YouTube!

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

### Adventure Map 
<hr>
<details>
  <summary>MAP VIEW</summary>
  <br>

  <ul>
    <li>Scroll to view adventures in your area</li>
    <li>Click an event marker for more information</li>
    <li>Search for another location in the search bar</li>
    <li>Clicking search this area searches current area for events</li>
  </ul>
  <div style="display: flex; flex-direction: row; align-items: space-evenly;">
    <img width="261" alt="Screenshot 2023-06-20 at 12 23 42 PM" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/55962431/2f2e7210-c8be-4f78-81b8-fed8bc77d9c5">
    <img width="261" alt="Screenshot 2023-06-20 at 12 23 42 PM" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/55962431/ca5b55ce-cc41-49b6-9609-75077c1184cb">
  </div>
</details>
<details>
  <summary>MODAL VIEW</summary>
  <br>
  <ul>
    <li>Shows additional information about the event</li>
    <li>Tap the star on an event card to save the event to your list of interested events</li>
  </ul>
  <img width="264" alt="Screenshot 2023-06-20 at 12 24 22 PM" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/55962431/b11bc945-0782-4e99-92e6-01769e44d5b3">  
</details>
<br>

### Messaging
<hr>
<details>
  <summary>BROWSE MESSAGE THREADS</summary>
  <br>
  <ul>
    <li>Shows a list of current and past conversations</li>
  </ul>
  <img width="264" alt="Messaging Home" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/da6dc222-14fc-4a8a-bb52-864f79bcb95c">
</details>
<details>
  <summary>CHAT WITH FRIENDS</summary>
  <br>
  <ul>
    <li>Real time chat with a friend of group of friends</li>
    <li>Send media easily via chat</li>
    <li>Tap on a message to add a reaction or choose from a list of actions</li>
  </ul>
  <img width="264" alt="Messaging Thread" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/8a8394e8-ee85-489f-ae0a-dfa84c47324d">
  <img width="264" alt="Add a reaction to a message" src="https://github.com/One-Piece-Blue-Ocean/OneAdventure/assets/90667844/4a99f4d1-0e32-4884-8aa0-a2ace0f2878e">
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
  </video>details>
<details>
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
[Tyler O'Neill](https://github.com/jtoneill) <br>
[Noah Beito](https://github.com/noahbeito) <br>
[Jacqueline Kelly](https://github.com/Jacqueline-Kelly) <br>
[Thang Nguyen](https://github.com/thang14nguyen) <br>
Keith! <br>

## Conclusion
Find your next adventure!
