# Guide to create your own SLP Faucet

Anyone can create their own SLP token on the Bitcoin Cash blockchain using an SLP wallet or Memo.cash but how can you distribute all your tokens? One way is to set up an SLP Faucet specifically for your token. In order to do this, you’ll need a few things:

1. A GitHub account & ability to use GIT to fork, clone & push.
2. Minor coding skills to make any edits necessary to html/css & create .env file
3. Minor unix/linux skills to install dependencies, server management & configure a proxy server.
4. Server hosting that supports Node.js v9+, Express, and SLPJS. I use a Vultr VPS, Ubuntu 16.04 x64 that is $5/mo. The $3.50/mo VPS plan should also work.

![SOUR SLP Faucet](/sour-faucet.png "SOUR SLP Faucet")*The SOUR SLP Faucet is a fork of Simple Ledger’s SLP Faucet GitHub repository that has been modified.*

## SLP Faucet Code & Installation

The first thing you’ll want to do is create a GitHub account (free) if you don’t already have one & review the code at:

Standard Simple Ledger Faucet -   
[https://github.com/simpleledger/slp-faucet](https://github.com/simpleledger/slp-faucet)

KeepBitcoinFree.org's fork for the SOUR SLP Faucet (includes spam protection) -  
[https://github.com/KeepBitcoinFree-org/slp-faucet.git](https://github.com/KeepBitcoinFree-org/slp-faucet.git)

Next, fork SimpleLedger’s or KeepBitcoinFree.org's slp-faucet to create your own version. Once it is forked, you can check this out to your local computer for testing, or on your production server, to make necessary changes. Alternatively, you can just clone SimpleLedger’s SLP Faucet code & not create your own repo or check in any of your changes to your repo. I would absolutely recommend creating your own repository forked from SimpleLedger’s in order to save & track all your new changes, as well as learn how to use GIT & Github if you don’t already.

The basic outline of the SLP Faucet repository is:

**server.js** – main application node.js file handling requests and serving content. Only make changes here if you know what you’re doing or need to.

**slpfaucet.js** – main node.js file that does the backend work of the faucet. You shouldn’t be changing things here.

**.env** – *this file is not included but must be created and placed in the root dir of your app, according to the specs on the github repository page. Do Not check in this file to Github. This file defines the mnemonic of the SLP faucet wallet you’re going to use, the tokenID that you’re distributing, the tokenQty – how many (in satoshis) each user will get per request (100000000 = 1 token if your token has 8 decimal places), the distribute_secret – a secret phase used when first setting up a faucet & port – which is the port your app will listen on.

**views/index.ejs** – This is the main index file used to serve & format your content to the user. This is where you will edit the html/css to give your faucet a custom look (optional).

Once you have forked the repository, clone the new repository to your computer or server:

```
(copy files from repository to your computer)
git clone https://github.com/username/slp-faucet.git


(after making changes, stage them for commit & push back to repo)
git add * 
git commit -m 'commit message'
git push
```

The only requirement to test it is to build & install dependencies, set up your wallet & create a .env file with the mnemonic, tokenid, tokenqty, distribute_secret & port – as described on the README for the repository.

Example .env file:
```
MNEMONIC=these words are your mnemonic do not check this into gitlab repo
TOKENID=6448381f9649ecacd8c30189cfbfee71a91b6b9738ea494fe33f8b8b51cbfca0
TOKENQTY=2100000000
DISTRIBUTESECRET=secretcodetodistributeBCHand_tokens
PORT=8083
```

Once you’ve created your .env file in the root dir of your app, load up a wallet you will use for the faucet with some BCH (for tx fees) & your tokens (all in one transaction). Once that transaction has at least 1 confirmation, you can build & run your application to test it out.

Before you run your app, you will need to install dependencies (NPM to install dependencies), build & run your app from the command line. Open up a prompt, go to the root directory of your slp-faucet and run the below commands:

`npm install`
– This will install all dependencies listed in your package.json file. You may need to manually install some dependencies if you get some errors, follow the error message instructions. When it installs all dependencies successfully, go to the next step.

`npm install -g typescript`
– This will install the typescript module to be able to build the .ts (typescript files) and generate the .js files you will run with node.js

`tsc`
– This will compile the .ts files and output .js files for you to run. When this completes successfully, you will be able to run your application.

`node server.js`
– This will run your node.js application and listen on the port provided. If you’re running on your local machine for testing, you can go to localhost:PORT (or just localhost if you’re using port 80) to reach your SLP Faucet.

The first time you use your SLP Faucet, you will need to enter your distribute_secret into the SLP address input and submit it. This will set up your Faucet wallet for use.This faucet can service 450 uses per block (i.e., 25 txn limit/block x 18 addresses = 450).

The server application allows the faucet admin to automatically distribute the tokens and BCH evenly across the first 18 addresses which are located on the `m/44'/245'/0'/0/X` HD path, where `X` is the address indices 0 to 17. The admin can instantiate this automatic distribution by entering the `DISTRIBUTE_SECRET` environment variable into the site’s address input field.

After you’ve waited 1 confirmation, you are ready to enter an SLP address and test out your SLP Faucet. If you get an error then try to troubleshoot based on the error. When it is working, you will be ready to move your node.js app to a server so that the internet can reach it. Check all your changes into your GitHub repository fork so that you can access your code later.

## Moving your SLP Faucet to a hosting provider (VPS)

You will need to host your application for people to be able to reach it over the internet. You can pay for hosting at a number of hosting providers or there may be free, limited hosting available. I would reccommend using Vultr.com – a simple VPS that costs about $5/month can handle the application (or multiple) for you. You will need server hosting that at least supports Node.js v9+, Express, and SLPJS (or allows you to install any dependencies yourself).

I use a Vultr VPS, Ubuntu 16.04 x64 with all dependencies being manually installed. After you have secured a hosting provider & have SSH access to the server, go ahead and SSH into the VPS. If you are using a different provider then you should reach out to their support for help in setting up your SSH access or node.js application.

`ssh root@SERVER-IP`

You’ll need to install a number of things on your server now – apache2 webserver, pm2 server manager & node.js. The remaining dependencies will be installed via NPM.

```
apt-get update

curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

sudo apt-get install -y nodejs

apt-get install apache2

npm install pm2 -g
```

If you have any issues installing a specific module, just research the commands above & the error. After you get those installed, run the below commands to copy your files to the server from your github account. You will want to push any changes you made to your forked Github repository so that you can access them from your VPS.

```
cd /var/www/html/

git clone URLtogithubforkrepo

cd slp-faucet/

npm install

npm install -g typescript

tsc
```

When that all builds successfully again, copy over your .env file (DO NOT EVER check this in to Github as it contains your seed words) or re-create it in the app root dir using commands:
`vi .env`
then paste the text in for your environment variables and type:
`esc (escape)`
`:wq`
(this saves & closes the text file)

Update your port in the .env file that you want to use for your node.js faucet. You can either try using port 80 and seeing if you can start & reach the application on your Server IP over standard http. Or you can go the method I did, which is setting up an apache2 web server to handle your requests on port 80 and then forward to the port set for your node.js app. You have more options and security using an apache web server as a proxy for your application.

If you are using a proxy server, then use a different port higher up like 8083. Then we’ll set up an apache proxy server to accept requests on standard port 80 and forward those requests to the node.js server port set in your env file.

## Setting up a DNS for your server IP

If you want your application to have a domain name (www.domain-name.com), you will have 2 options. If you already have a domain to use or want to buy one, then you can point your domain to your server hosting the faucet through a redirect or subdomain or other means (hosting support can help you). If you want to use a free domain, you can go to no-IP.com and set up a free account. Next, pick a DNS name for your Faucet (www.domain-name.ddns.net). Get the IP address of the server you’re hosting the app on and add this into the DNS configuration so that the DNS name you choose will forward requests to your server. Copy the DNS (URL) that you have set up and add this in below to your apache web server conf(iguration) file for the website.

## Setting up an apache2 proxy server

Next, you’ll need to edit your apache configurations to point to your node.js application/port when a user hits your IP/DNS over port 80.
```
cd /etc/apache2/sites-enabled/ 

vi 000-default.conf
```

This will allow you to edit the apache conf file for your application. Within the <VirtualHost *:80> tag, you’ll need to add the below text. Update the serverName & serverAlias with your custom DNS URL. Update the ProxyPass & ProxyPassReverse with your Port # that you include in the .env file.
```
<VirtualHost *:80> (already here, don't add or change this)

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html


        ProxyPreserveHost On
        ProxyRequests Off
        ServerName www.CUSTOM-DOMAIN-NAME.ddns.net 
        ServerAlias CUSTOM-DOMAIN-NAME.ddns.net
        ProxyPass / http://localhost:8083/
        ProxyPassReverse / http://localhost:8083/
        ...
```


When you’re finished, save the file using:

`esc` (escape)
`:wq` (this saves & closes the text file)

Now, you can start & manage your server.js app using pm2 server manager.

If you’re in the /var/www/html/slp-faucet/ directory, you can just run:
```
pm2 start server.js --name my-app # Name process

Otherwise, use:
pm2 start /var/www/html/slp-faucet/server.js

After that, you can use:
pm2 restart my-app
```

Troubleshoot any errors you get and go from there. Using `pm2 show app-name` will give you the path to all your server logs (server-out.log and server-error.log) if you want to check them to troubleshoot. If all works well, you should be able to visit your DNS URL that you set up and be directed to your node.js application. An example is the SOUR SLP Faucet at [http://sour-faucet.ddns.net]: http://sour-faucet.ddns.net

As long as you have BCH & Tokens in your faucet, it should work without any issues. If the faucet does run out of BCH, just send more to the first BCH address (index 0, the next one or two may also work) and then restart the server: `pm2 restart app-name` Any update to your index.ejs file will automatically be applied without a restart. Any updates to the .env file requires a restart & updates to .ts files requires a rebuild (tsc) then a restart:

`pm2 restart server.js`

Additional code has been added to the SOUR SLP Faucet (fork of Simple Ledger's) to implement limiting one submission per IP or address for every 12 hours. Essentially, we keep an array of IPs & addresses submitted and check new submissions against those lists. After 12 hours, the arrays are cleared and users can submit requests to the faucet again. I have created a pull request to add this functionality to the original SLP faucet repository. If you’re interested in adding this in to your own Faucet now, you will need to edit the server.ts file and subsequently rebuild to export a new .js file.

If you do not want this additional functionality then you can fork SimpleLedger's slp-faucet. If you do want the additional features then fork KeepBitcoinFree-org's slp-faucet. Any edits you make to the .ts files yourself need to be rebuilt with `tsc` to export a .js file before restarting the node application to apply the changes `pm2 restart server`.

You can view the [code added in this commit to SOUR's fork of Simple Ledger's SLP Faucet](https://github.com/KeepBitcoinFree-org/slp-faucet/commit/a23cb5ed15bc79c3a6fd3e347c6ff58438443c3f)


Additional resources & documentation:  
[https://simpleledger.cash/https://nodejs.org/en/docs/](https://simpleledger.cash/https://nodejs.org/en/docs/)  
[https://www.tecmint.com/install-pm2-to-run-nodejs-apps-on-linux-server/](https://www.tecmint.com/install-pm2-to-run-nodejs-apps-on-linux-server/
)  
[https://www.npmjs.com/package/pm2](https://www.npmjs.com/package/pm2)  
[https://github.com/simpleledger/slp-faucet](https://github.com/simpleledger/slp-faucet)  
[https://www.npmjs.com/package/typescript](https://www.npmjs.com/package/typescript)  
[https://vultr.com](https://vultr.com)  
[https://help.ubuntu.com/lts/serverguide/httpd.html](https://help.ubuntu.com/lts/serverguide/httpd.html)  
[https://www.noip.com/support/knowledgebase/getting-started-with-no-ip-com/](https://www.noip.com/support/knowledgebase/getting-started-with-no-ip-com/)  