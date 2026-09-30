# Car Rental

A car-rental web application with a React/Vite client and an Express API. The API stores users, cars, and bookings in MongoDB and uses ImageKit for uploaded images.

## Links

- GitHub repository: https://github.com/TanikshaSingh20/car-rental
- Backend health: https://car-rental-server-two-rho.vercel.app/
- Cars API: https://car-rental-server-two-rho.vercel.app/api/user/cars
- Frontend: No public frontend URL was available when this README was written.

The health URL should return `Server is running`. The cars API returns JSON with a `success` value and a `cars` array; an empty array means no cars have been listed yet.

## Features

- Account registration and login
- Browse and search car listings
- Check car availability by location and dates
- Create and view bookings
- Owner dashboard for adding cars and managing listings and bookings
- Image uploads through ImageKit

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- MongoDB, either a local instance or MongoDB Atlas
- ImageKit account for car and profile image uploads

## Local Development

Clone the repository:

```sh
git clone https://github.com/TanikshaSingh20/car-rental.git
cd car-rental
```

Configure and start the backend in one terminal:

```sh
cd server
cp .env.example .env
npm install
npm run server
```

Edit `server/.env` and set:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string. The app uses the `car-rental` database. |
| `JWT_SECRET` | Long, random secret used to sign authentication tokens. |
| `IMAGEKIT_PRIVATE_KEY` | Private server-side ImageKit key. |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint, such as `https://ik.imagekit.io/your-imagekit-id`. |

Configure and start the frontend in a second terminal:

```sh
cd client
cp .env.example .env
npm install
npm run dev
```

For local development, leave `VITE_BASE_URL` empty in `client/.env`; Vite proxies `/api` requests to `http://localhost:5000`. Set `VITE_CURRENCY` to the currency symbol displayed by the client.

Never commit `.env` files or publish their values. The example files contain placeholders only.

## Environment Variables

### Backend

| Variable | Required | Example |
| --- | --- | --- |
| `MONGODB_URI` | Yes | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/` |
| `JWT_SECRET` | Yes | Generate locally with `openssl rand -base64 32`. |
| `IMAGEKIT_PRIVATE_KEY` | Yes for image uploads | Obtain from the ImageKit dashboard. |
| `IMAGEKIT_URL_ENDPOINT` | Yes for image URLs | `https://ik.imagekit.io/<imagekit-id>` |

If an Atlas database password contains reserved URI characters, URL-encode the password. Configure Atlas network access so the deployed backend can connect.

### Frontend

| Variable | Required | Example |
| --- | --- | --- |
| `VITE_BASE_URL` | Yes in production | `https://car-rental-server-two-rho.vercel.app` |
| `VITE_CURRENCY` | Yes | `$` |

`VITE_BASE_URL` is the backend origin and should not include `/api` at the end. Vite embeds `VITE_` variables at build time, so redeploy the client after changing them.

## Deployment

Deploy the client and backend as separate Vercel projects:

| Project | Root directory | Build/output |
| --- | --- | --- |
| Client | `client` | Build: `npm run build`; output: `dist` |
| Backend | `server` | Uses `server/vercel.json` and the Express app exported by `server.js` |

Add the backend variables to the backend Vercel project and the frontend variables to the client Vercel project. Set the appropriate Production and Preview environments, then redeploy each project after changing its variables.

The backend's local start command is `npm run server` (or `npm start`) from `server/`. The Vercel function entry is `server.js`.

## API Routes

| Route group | Purpose |
| --- | --- |
| `/api/user` | Registration, login, user data, and public car listings |
| `/api/owner` | Owner role, car listing management, and dashboard data |
| `/api/bookings` | Availability checks and user/owner booking management |

Most owner and account routes require the JWT returned by login or registration in the `Authorization` header.

## Checks

Run client checks from `client/`:

```sh
npm run build
npm run lint
npm audit
```

Run the backend dependency audit from `server/`:

```sh
npm audit
```