export let { isArray } = Array;
export let { createTextNode } = document;
export let { fromEntries, entries, keys } = Object;
// This might seem weird, but 1) we get a more descriptive name
// than just "parse" and 2) the bundler will anyway shorten it
export let { parse: jsonparse } = JSON;
