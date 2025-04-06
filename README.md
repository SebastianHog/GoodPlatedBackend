# GoodPlates Backend

This repository contains everything needed to run the backend for a local version of [GoodPlates](https://GoodPlates.se).

You can find the frontend repository [here](https://github.com/SebastianHog/GoodPlatesNuxt3).

## Setup

1. Clone the repository

git clone https://github.com/SebastianHog/GoodPlatesBackend.git

2. Navigate into the project directory

cd GoodPlatesBackend

3. Install dependencies

npm install

4. Create a `.env` file

- Add `MONGO_CONNECTION_STRING` and `SECRET_KEY`.
- The `MONGO_CONNECTION_STRING` should be in this format:

  ```
  mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
  ```

  Most(or all) of it will likely be given to you when you make your DB, but this is a good reference point.

  Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB credentials and cluster information.

  Generate a `SECRET_KEY`:

  ```
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

5. Start the server with `npm run dev`

The backend should now be running locally.

---

## Notes

- The backend connects to a MongoDB database using the `MONGO_CONNECTION_STRING` defined in the `.env` file.
