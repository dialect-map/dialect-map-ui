#!/bin/sh

### NOTE:
###
### Script that parses every variable defined in the source file
### in order to replace the default values with environment values,
### and dump them into a JavaScript file that gets loaded by the app.
###
### Arguments:
### --destination: Destination folder within the project root (i.e. public).
### --output_file: Name of the run-time generated output JavaScript file.
### --source_file: Name of the source file to read variables names from.

# Define default values
destination="build"
output_file="environment.js"
source_file=".env"

# Argument parsing
while [ "$#" -gt 0 ]; do
    case $1 in
        -d|--destination)  destination=${2};     shift  ;;
        -o|--output_file)  output_file=${2};     shift  ;;
        -s|--source_file)  source_file=${2};     shift  ;;
        *) echo "Unknown parameter passed: $1";  exit 1 ;;
    esac
    shift
done


PROJECT_DIR="$(dirname "$0")/.."

# Define file paths
OUTPUT_PATH="${PROJECT_DIR}/${destination}/${output_file}"
SOURCE_PATH="${PROJECT_DIR}/${source_file}"

# Define AWK expressions to parse file and get env. vars
AWK_PAD_EXP="\"    \""
AWK_KEY_EXP="\$1"
AWK_VAL_EXP="(ENVIRON[\$1] ? ENVIRON[\$1] : \$2)"
AWK_ALL_EXP="{ print ${AWK_PAD_EXP} ${AWK_KEY_EXP} \": '\" ${AWK_VAL_EXP} \"',\" }"


# Build the run-time generated JavaScript environment file
echo "window.env = {" > "${OUTPUT_PATH}"
awk -F "=" "${AWK_ALL_EXP}" "${SOURCE_PATH}" >> "${OUTPUT_PATH}"
echo "}" >> "${OUTPUT_PATH}"
