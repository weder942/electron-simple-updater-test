const { app, BrowserWindow } = require('electron');
const updater = require('electron-simple-updater');
let mainWindow;

updater.init({    
    checkUpdateOnStart: false,
    autoDownload: false,
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        },
        
    })
    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
})