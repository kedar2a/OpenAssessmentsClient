#!/bin/bash

echo -e "\n[1/4]: Checking and Downloading Dependencies\n"
yarn

echo -e "\n[2/4]: Building new oac oat\n"
yarn build

foldername=$(date +%d-%b-%Y-%I:%M:%S%p)

old_oac_oat_folder_path=/softwares/oac-oat-backup/"$foldername"
mkdir -p "$old_oac_oat_folder_path"

echo -e "\n[3/4]: Taking backup of existing oac and oat at: \"$old_oac_oat_folder_path\""
cp -r /softwares/oat /softwares/oac "$old_oac_oat_folder_path"

echo -e "\n[4/4]: Deploying newly built oac oat"
cp -r build/prod/* /softwares/oat/
cp -r build/prod/* /softwares/oac/

mv /softwares/oat/author.html /softwares/oat/index.html

echo -e "\nDone."
