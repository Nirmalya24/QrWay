// Runs createSampleItems.js, createSampleMenus.js, createSampleRestaurants.js
// to populate the database with sample data
const { exec } = require("child_process");

console.log("[DB Setup] Populating database with sample data...".yellow);

exec("pwd", (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
}
);

exec("node createSampleItems.js", { cwd: './createDB' }, (err, stdout, stderr) => {
    if (err) {
        console.error("[DB Setup] Error populating database with sample items data...".red);
        // console.log(err);
        return;
    }

    console.log(stdout);
});
// sleep for 0.5 sec

exec("node createSampleMenus.js", { cwd: './createDB' }, (err, stdout, stderr) => {
    if (err) {
        console.error("[DB Setup] Error populating database with sample menu data...".red);
        // console.log(err);
        return;
    }

    console.log(stdout);
});

exec("node createSampleRestaurants.js", { cwd: './createDB' }, (err, stdout, stderr) => {
    if (err) {
        console.error("[DB Setup] Error populating database with sample restaurant data...".red);
        // console.log(err);
        return;
    }

    console.log(stdout);
});
