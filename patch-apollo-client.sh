#!/bin/sh

# original source: https://github.com/apollographql/apollo-client/issues/8218

if [[ -f "./node_modules/@apollo/client/package.json.bak" ]]; then
	exit 0
fi

sed -i.bak "s/\"dependencies\":/\"exports\":{\".\":{\"node\":\".\/main.cjs\",\"default\":\".\/index.js\"},\".\/cache\":{\"node\":\".\/cache\/cache.cjs\",\"default\":\".\/cache\/index.js\"},\".\/core\":{\"node\":\".\/core\/core.cjs\",\"default\":\".\/core\/index.js\"},\".\/link\/schema\":{\"node\":\".\/link\/schema\/schema.cjs\",\"default\":\".\/link\/schema\/index.js\"},\".\/link\/context\":{\"node\":\".\/link\/context\/context.cjs\",\"default\":\".\/link\/context\/index.js\"},\".\/link\/http\":{\"node\":\".\/link\/http\/http.cjs\",\"default\":\".\/link\/http\/index.js\"},\".\/link\/ws\":{\"node\":\".\/link\/ws\/ws.cjs\",\"default\":\".\/link\/ws\/index.js\"}}, \"dependencies\":/" ./node_modules/@apollo/client/package.json