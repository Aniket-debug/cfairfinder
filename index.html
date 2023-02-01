async function find_AIR() {

    document.getElementById("out").innerHTML = "Loading..";

    let username = document.getElementById("username").value;
    username = username.trim();
    let contestId = document.getElementById("contest_id").value;
    contestId = contestId.trim();

    if (contestId.slice(0, 31) != "https://codeforces.com/contest/") {
        document.getElementById("out").innerHTML = "Entered Link is not correct";
        return;
    }
    contestId = contestId.slice(31);

    let l = 0;

    while ('0' <= contestId[l] && contestId[l] <= '9') l++;

    contestId = contestId.slice(0, l);

    let rank = 0;

    for (let i = 1; i <= 5000; i += 600) {
        let response = await fetch("https://codeforces.com/api/contest.standings?contestId=" + contestId + "&from=" + i + "&count=600&showUnofficial=false");
        response = await response.json();

        let userinfo = "https://codeforces.com/api/user.info?handles=";

        for (let user of response.result.rows)
            userinfo += user.party.members[0].handle + ';';

        response = await fetch(userinfo);
        response = await response.json();

        for (let user of response.result) {
            if (user.country === "India") {
                rank++;
                if (user.handle == username) {
                    document.getElementById("out").innerHTML = user.firstName + " Your AIR is: " + rank;
                    return;
                }
            }
            if (user.handle == username) {
                if (user.country == undefined)
                    document.getElementById("out").innerHTML = "Username you entered didn't mention his/her country";
                else
                    document.getElementById("out").innerHTML = "Username you entered is not from India";
                return;
            }

        }

    }

    document.getElementById("out").innerHTML = "Not Found";
}
