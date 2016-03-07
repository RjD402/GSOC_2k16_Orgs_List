

#!/bin/bash
# Required files for running this script are obtained from the javaScript written above.
declare -A FILES=(["orgs"]="orgs.txt" ["ideas"]="ideas.txt"\
                  ["technologies"]="technologies.txt"\
                  ["images"]="images.txt")

declare -A HELPER_FILES=(["orgs_ideas"]="orgs_ideas.txt"\
                         ["images_ideas"]="images_ideas.txt"\
                         ["images_ideas_technologies"]="images_ideas_technologies.txt")

FINAL="GSOC_2k16_Orgs_List.md"

function trim(){
    sed -i -E -e 's/^"//g' -e 's/"$//g' "$1"
}

function orgs(){
    sed -i -E -e 's/^\[?/\[/g' -e 's/\]?$/\]/g' "$1"
}

function ideas(){
    sed -i -E -e 's/^\(?/\(/g' -e 's/\)?$/\)/g' "$1"
}

function technologies(){
    sed -i -E -e 's/^(\ \ \*)?\ ?/  * /g' "$1"
}

function images(){
    sed -i -E -e 's/^(\[!\[Image\]\()?/\[!\[Image\]\(/g' -e 's/(\)\])?$/\)\]/g' "$1"
}

function orgs__ideas(){
    # Combines orgs with their ideas for markdown
    paste "$1" "$2" -d "" | sed -E -e"s/^/####/g" -e "s/$/####/g" > ${HELPER_FILES["orgs_ideas"]}
}

function images__ideas(){
    # Combines images with their ideas for markdown
    paste "$1" "$2" -d "" > ${HELPER_FILES["images_ideas"]}
}

function images_ideas__technologies(){
    paste "$1" "$2" -d "=" > ${HELPER_FILES["images_ideas_technologies"]}
}

function orgs_ideas__images_ideas_technologies(){
    # I swear this is the final one :P
    paste "$1" "$2"  -d "\n" | sed -E 's/$/\n/g' | sed -E -e 's/=(\ \ \*\ .*?)$/\n\1/g' -e 's/\*\ (.*)$/\* Skill\(s\): <b>\1<\/b>/g' > "$FINAL"
    # Yipeeeee, final markdown prepared :D
}

for file in ${FILES[*]};
do
    trim "$file"
    func=`echo "$file" | cut -d "." -f1`
    "$func" "$file"
done

orgs__ideas ${FILES["orgs"]} ${FILES["ideas"]}
images__ideas ${FILES["images"]} ${FILES["ideas"]}
images_ideas__technologies ${HELPER_FILES["images_ideas"]} ${FILES["technologies"]}
orgs_ideas__images_ideas_technologies ${HELPER_FILES["orgs_ideas"]} ${HELPER_FILES["images_ideas_technologies"]}
cat "$FINAL"

