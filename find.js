async function find_ACR() {
    document.getElementById("out").innerHTML = "Loading ...";
    const username = document.getElementById("username").value.trim();
    const contestLink = document.getElementById("contest_id").value.trim();

    // 1.checking if entered link is correct or not
    if (!contestLink.startsWith("https://codeforces.com/contest/")) {
        document.getElementById("out").innerHTML = "Entered Contest Link is not valid";
        return;
    }

    const contestId = contestLink.slice(31).match(/^\d+/)[0];

    const userDataResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);

    // 2.checking if entered username is valid or not
    if (!userDataResponse.ok) {
        document.getElementById("out").innerHTML = "Entered username is not valid";
        return;
    }

    const userData = await userDataResponse.json();

    const countryName = userData.result[0]?.country;


    // 3.checking if entered username has mention there country in it's profile or not
    if (!countryName) {
        document.getElementById("out").innerHTML = `${username} did not mention it's country name in their profile`;
        return;
    }

    const availResponse = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&showUnofficial=false&handles=${username}`);
    const hasParticipated = await availResponse.json();

    // 4.checking if entered username participated in the entered contest or not
    if (hasParticipated.result.rows.length == 0) {
        document.getElementById("out").innerHTML = `${username} did not participated in that contest`;
        return;
    }

    // 5.checking if entered username's Rank is under 10000
    if (hasParticipated.result.rows[0].rank > 10000) {
        document.getElementById("out").innerHTML = `${username} your Global Rank is ${hasParticipated.result.rows[0].rank} which is not under 10,000`;
        return;
    }

    let rank = 0;

    for (let i = 1; i <= 10000; i += 1000) {
        const standingsResponse = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=${i}&count=600&showUnofficial=false`);
        if (!standingsResponse.ok) {
            document.getElementById("out").innerHTML = "Error Occurred: Server is unavailable, please refresh and try again or try after some time";
            return;
        }

        const standingsData = await standingsResponse.json();
        const userHandles = standingsData.result.rows.map(row => row.party.members[0].handle).join(";");



        const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${userHandles}`);

        if (!userInfoResponse.ok) {
            console.log("hits");
            document.getElementById("out").innerHTML = "Error Occurred: Server is unavailable, please refresh and try again or try after some time";
            return;
        }
        if (!(userInfoResponse.status >= 200 && userInfoResponse.status <= 299)) {
            document.getElementById("out").innerHTML = "Error Occured Server is unavailable refresh and try again or try after some time";
            return;
        }

        const userInfoData = await userInfoResponse.json();



        for (let user of userInfoData.result) {
            if (user.country === countryName) {
                rank++;

                if (user.handle == username) {
                    document.getElementById("out").innerHTML = `${user.handle} Your All ${countryName} Rank is: ${rank}`;
                    return;
                }
            }
        }
    }
    document.getElementById("out").innerHTML = "Not Found";
}
