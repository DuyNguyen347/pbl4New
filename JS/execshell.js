
const {execSync } = require("child_process");

export const login = async (password) => {
    try {
        await window.exec("echo " + password + " | sudo -S login");
    } catch (error) {
        console.log("Error: "+error)
    }
}
export const checkLogin =async (password) => {
    try {
        const output = execSync("echo " + password + " | sudo -S login | sudo -n true", { encoding: "utf-8" });
        console.log(output)
    } catch (error) {
        console.log("chechfalse: "+error)
        return false;
    }
    console.log("Check true")
    return true;
}
export const turnOnBluetooth = async () => {
    await window.exec("rfkill unblock bluetooth");
}
export const turnOffBluetooth = async () => {
    await window.exec("rfkill block bluetooth");
}
export const turnOnWifi = async () => {
    await window.exec("nmcli radio wifi on")
}
export const turnOffWifi = async () => {
    await window.exec("nmcli radio wifi off")
}
export const setValueVolum = async (value) => {
    await window.exec("amixer -D pulse sset Master " + value + "%");
}
export const setValueBright = async (value) => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    await window.exec("echo " + Number.parseInt(value * max / 100) + " | sudo tee /sys/class/backlight/intel_backlight/brightness");
}

export const getValueVolume =async () => {
    const output = execSync("amixer -D pulse sget Master", { encoding: 'utf-8' });
    return output.split("[")[1].split("%")[0];
}
export const getValueBright =async () => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    const current = execSync("cat /sys/class/backlight/intel_backlight/brightness", { encoding: "utf-8" });
    return current / max * 100;
}
export const getStateBluetooth =async () => {
    const output = execSync("rfkill list bluetooth", { encoding: 'utf-8' });
    return (output.split("\n")[1].indexOf("yes") < 0);
}
export const getStateWifi =async () => {
    const output = execSync("nmcli radio wifi", { encoding: 'utf-8' });
    if (output.trim() === "enabled")
        return true;
    return false;
}
export const getStateAirplaneMode =async () => {
    if (!await getStateBluetooth() && !await getStateWifi()) {
        return true;
    }
    else {
        return false;
    }
}
export const turnOnAirplaneMode =async () => {
    await window.exec("rfkill block all");
}
export const turnOffAirplaneMode =async () => {
    await window.exec("rfkill unblock all");
}
export const getStateNightLight =async () => {
    const output = execSync("gsettings get org.gnome.settings-daemon.plugins.color night-light-enabled", { encoding: 'utf-8' });
    if (output.trim() == "true")
        return true;
    return false;
}
export const turnOnNightLight =async () => {
    // console.log("on");
    await window.exec("gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled true");
}
export const turnOffNightLight = async() => {
    // console.log("off");
    await window.exec("gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled false");
}
export const getStateMicro =async () => {
    const output = execSync("pactl list | sed -n '/^Source/,/^$/p' | grep Mute", { encoding: 'utf-8' });
    if (output.includes("yes"))
        return true;
    return false;
}
export const toggleMicro =async () => {
    await window.exec("amixer -D pulse sset Capture toggle");
}
export const getStateTouchpad =async () => {
    const output = execSync("gsettings get org.gnome.desktop.peripherals.touchpad send-events ", { encoding: 'utf-8' });
    if (output.includes("disabled"))
        return false;
    return true;
}
export const turnOnTouchpad =async () => {
    await window.exec("gsettings set org.gnome.desktop.peripherals.touchpad send-events enabled")
}
export const turnOffTouchpad =async () => {
    await window.exec("gsettings set org.gnome.desktop.peripherals.touchpad send-events disabled")
}
export const lockScreen =async () => {
    await window.exec("xdg-screensaver lock")
}
export const suspend =async (password) => {
    execSync("echo "+password+" | systemctl suspend")
}
export const turnOff =async (password) => {
    await window.exec("sudo poweroff");
}
export const restart =async (password) => {
    await window.exec("sudo reboot");
}
// them
export const getStateDoNotDisturb =async () => {
    const output = execSync("gsettings get org.gnome.desktop.notifications show-banners", { encoding: 'utf-8' });
    if (output.trim() == "true")
        return false;
    return true;
}

export const turnOnDoNotDisturb =async () => {
    await window.exec("gsettings set org.gnome.desktop.notifications show-banners false");
}

export const turnOffDoNotDisturb =async () => {
    await window.exec("gsettings set org.gnome.desktop.notifications show-banners true");
}
export const openSetting =async () => {
    await window.exec("gnome-control-center");
}

//them
export const getStateWebcam =async () => {
    const output = execSync("v4l2-ctl --list-devices",{ encoding: 'utf-8' });
    if(output.includes("Cannot"))
    {
        return false;
    }
    else return true;
}
export const turnOnWebcam =async () => {
    await window.exec('sudo modprobe uvcvideo')
}
export const turnOffWebcam =async () => {
    await window.exec('sudo modprobe -r uvcvideo')
}
export  const setPerformanceMode =async () => {
    console.log('perform');
    await window.exec("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'performance'>\"''")
}
export const setBalancedMode =async () => {
    console.log('balance');
    await window.exec("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'balanced'>\"''")
}
export const setPowerSaveMode =async () => {
    console.log('power mode');
    await window.exec("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'power-saver'>\"''")
}
export const getMode =async () => {
    const output = execSync('gdbus introspect --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles',{encoding: 'utf-8'});
    const index = output.indexOf("ActiveProfile");
    const nameMode = output[index + 17] + output[index + 18];
    if(nameMode == 'pe') return 1;
    else if (nameMode == 'ba') return 2;
    else return 3;
}
export const getStateKeyBoard =async () => {
    const output = execSync("xinput list-props 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"",{encoding: 'utf-8' });
    const outputTrim = output.replaceAll('\t','');
    const check = outputTrim[outputTrim.indexOf("Device Enabled (121):") + 21];
    if (check == 1) return true;
    else return false;
}
export const turnOnKeyboard =async () => {
    await window.exec('xinput enable 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"');
}
export const turnOffKeyboard =async () => {
    await window.exec('xinput disable 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"');
}
export const checkChargingBattery =async () => {
    const output = execSync("upower -i $(upower -e | grep 'BAT') | grep -E \"state|to\ full|percentage\"",{encoding: 'utf-8' }).replaceAll(' ','');
    const check = output[output.indexOf("state") + 6] + output[output.indexOf("state") + 7];
    if(check == "ch") return true;
    else return false;
}
export const getPercentBattery = async () => {
    const output = execSync("upower -i $(upower -e | grep 'BAT') | grep -E \"state|to\ full|percentage\"",{encoding: 'utf-8' }).replaceAll('\t','');
    const percentage = output.substring(output.indexOf("percentage:")+11).trim();
    return percentage;
}
export const openSettingFunc =async ()=> {
    await window.exec("gnome-control-center")
}
