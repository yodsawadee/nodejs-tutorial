# Learning NodeJS

### 📚 References 
[Node.js Full Course for Beginners | Complete All-in-One Tutorial | 7 Hours](https://www.youtube.com/watch?v=f2EqECiTBL8&ab_channel=DaveGray)

## Prerequisite
If you don't have Node.js installed on your machine, installing Node.js on https://nodejs.org/en

## Setup Dependency
install dependency of project within `/simple-node-project` directory<br/>
```
npm install
```

## Development server

to develop this project, execute below comand within `/simple-node-project` directory
```
npm run dev
```

### 🎓 More Information
__JWT (JSON Web Token)__
- Confirm authentication
- Allow access to API endpoints
- Endpoint provide data resources
- Use Authorization header

| Access Token | Refresh Token |
| :--- | :--- |
| give Short time before it expires (5-15 mins) | Long time (Must have expiry at some point) |
| Sent as JSON | Sent as httpOnly cookie |
| Client(front-end web) stores in memory</br> Do NOT store in local storage or cookie |  |
| accessible via JavaScript | Not accessible via JavaScript |
| Issued at Authorization Client users for API Access until expires | Issued at Authorization Client users to request new Access Token |
| Verified with Middleware | Verified with endpoint & database |
| New token issued at Refresh request (when the access token does expire, the user's application will need to send their refresh token to our api's refresh endpoint to get a nes access token) |  |
|  | Must be allowed to expire or logout (indefinite access cannot be gained) |

stores in __memory__ - it will automatically lost (be destroyed) when the app is closed
