# Demonstration of a possible memory leak in material-table

- Clone the repo, run `yarn install`, then `yarn start`.
- TO RUN A CUSTOM SERVER (not using webpack-dev-server)
  - `yarn start:custom`
  - This builds the react app and serves it via a small express server (located at `src/server.js`)
- Open devtools (memory tab) and leave app running for a few hours. Notice JS heap size increased significantly. 
