'use strict';

// /* eslint-env browser */
// /* eslint-disable no-restricted-globals, no-alert */

const { remote } = require('electron');

const updater = remote.require('electron-simple-updater');
setCurrentVersion(updater.version);

attachUiHandlers();
attachUpdaterHandlers();

function attachUiHandlers() {
    const btnUpdate = document.getElementById('btn-update');
    const btnInstall = document.getElementById('btn-install-update');
    // const chkAutomatically = document.getElementById('automatically');

    btnUpdate.addEventListener('click', () => {
        updater.checkForUpdates()
    });

    btnInstall.addEventListener('click', () => {        
        updater.downloadUpdate();
    });

    // chkAutomatically.addEventListener('change', function onChange() {
    //     updater.setOptions('autoDownload', this.checked);
    // });
}

function attachUpdaterHandlers() {
    updater.on('update-available', onUpdateAvailable);
    updater.on('update-downloading', onUpdateDownloading);
    updater.on('update-downloaded', onUpdateDownloaded);
    updater.on('update-not-available', onUpdateNotAvaible);    

    function onUpdateAvailable(meta) { 
        setLogInfo('Has update');
        document.querySelector('#install-update').classList.remove('d-none');
        document.querySelector('#new-version').classList.remove('d-none');
        document.querySelector('#new-version').innerText = `New version: ${meta.version}`;
        btnUpdate.parentElement.parentElement.classList.add('d-none');
    }

    function onUpdateNotAvaible() {
        setLogInfo('Not has update');
    }

    function onUpdateDownloading() {
        console.log('Baixando update');        
        document.body.classList.add('update-downloading');
    }

    function onUpdateDownloaded() {
        if (confirm('The app has been updated. Do you like to restart it now?')) {
            updater.quitAndInstall();
        }
    }    
}

function setLogInfo(text) {
    document.querySelector('#infoLog').innerText = text;
}

function setCurrentVersion(version) {
    document.querySelector('#version').innerText = `version: ${version}`
}
