require('isomorphic-fetch');

(async function Fetch() {
    await new Promise(resolve => fetch('https://accounts.google.com/.well-known/openid-configuration')
    .then(response => response.json())
    .then(configuration => {
        var i = 0;
        const values = configuration['claims_supported'];

        const interval = setInterval(() => {
            console.log(values[i]);

            if(i++ >= values.length - 1) clearInterval(interval)
        },1000) 

        // const loop = () => {
        //     console.log(values[i]);

        //     if(i++ < values.length - 1) setTimeout(loop, 1000)
        // }

        // setTimeout(loop, 1000);

        // configuration['claims_supported'].forEach((claim, index) => {
        //     setTimeout(() => console.log(claim),1000 * (index + 1));
        // })
    }));

    console.log('in fetch');
})()