if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Deploying to prod from master."
  npm run deploy -- --env PROD;
fi

if [ "$TRAVIS_BRANCH" == "development" ]; then
 echo "Deploying to preview from development."
  npm run deploy -- --env PREVIEW;
fi