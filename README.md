# Kesem Make the Magic webpage


## Developer build instructions

### Prerequisites

1.  Install node. Recommended to use nvm to control installed version of node and npm. Use install instructions here or just follow the following instructions: https://github.com/nvm-sh/nvm#install--update-script
2. run <br /><br />
```wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash```
<br /><br />
in your terminal (anywhere). This grabs the nvm files and runs the install.sh file.
3. add the following lines to the end of your terminal configuration file which should be one of these files (`~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc`)<br/>
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
4. restart your terminal and if you type `nvm` you should not get an error!
5. install the latest version of node using nvm with the following command
```
nvm install --lts
```

---

### Get repo up and running
1. Clone repository
2. Checkout the `dev` branch
3. Branch off of the `dev` branch
4. Add the keys file `.env` to the root directory of your project
5. Add all necessary packages for the project by running the following command. You can see which packages it will install via the package.json file
```
npm install
```
6. Run the website with
```
npm start
```