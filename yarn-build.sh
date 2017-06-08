yarn
yarn build

cp -rv build/prod/* /softwares/oat/
cp -rv build/prod/* /softwares/oac/

mv -v /softwares/oat/author.html /softwares/oat/index.html
