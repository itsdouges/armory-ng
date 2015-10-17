if [ "$TRAVIS_BRANCH" == "master" ]; then
  npm run deploy:beta;
fi