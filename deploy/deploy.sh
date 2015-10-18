if [ "$TRAVIS_BRANCH" == "master" ]; then
  npm run deploy:beta;
else
	echo "BRANCH_NOT_SUPPORTED for deployment"
fi