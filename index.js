const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs');
const rs = require('readline-sync');

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/2', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    const auth = rs.question('Enter your auth token : ');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            console.log('[+] Wrong cookie / Expired cookie !');
            break;

        } else if (result) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns;
            
            console.log(`[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | Trophy : ${trophy} | Crown : ${crown}`);

        }
        
    }
    

})();
