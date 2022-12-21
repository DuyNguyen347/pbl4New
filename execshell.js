const { execSync } = require("child_process");
export const login = (password) => {
    try {
        execSync("echo " + password + " | sudo -S login");
    } catch (error) {
    }
}
export const checkLogin = () => {
    try {
        const max = execSync("sudo -n true", { encoding: "utf-8" });
    } catch (error) {
        return false;
    }
    return true;
}
export const turnOnBluetooth = () => {
    execSync("rfkill unblock bluetooth");
}
export const turnOffBluetooth = () => {
    execSync("rfkill block bluetooth");
}
export const turnOnWifi = () => {
    console.log("wifi on");
    execSync("nmcli radio wifi on")
}
export const turnOffWifi = () => {
    console.log("wifi off");
    execSync("nmcli radio wifi off")
}
export const setValueVolum = (value) => {
    execSync("amixer -D pulse sset Master " + value + "%");
}
export const setValueBright = (value) => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    execSync("echo " + Number.parseInt(value * max / 100) + " | sudo tee /sys/class/backlight/intel_backlight/brightness");
}

export const getValueVolume = () => {
    const output = execSync("amixer -D pulse sget Master", { encoding: 'utf-8' });
    return output.split("[")[1].split("%")[0];
}
export const getValueBright = () => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    const current = execSync("cat /sys/class/backlight/intel_backlight/brightness", { encoding: "utf-8" });
    return current / max * 100;
}
export const getStateBluetooth = () => {
    const output = execSync("rfkill list bluetooth", { encoding: 'utf-8' });
    return (output.split("\n")[1].indexOf("yes") < 0);
}
export const getStateWifi = () => {
    const output = execSync("nmcli radio wifi", { encoding: 'utf-8' });
    if (output.trim() === "enabled")
        return true;
    return false;
}
export const getStateAirplaneMode = () => {
    if (getStateBluetooth() == false && getStateWifi() == false) {
        return true;
    }
    else {
        return false;
    }
}
export const turnOnAirplaneMode = () => {
    execSync("rfkill block all");
}
export const turnOffAirplaneMode = () => {
    execSync("rfkill unblock all");
}
export const getStateNightLight = () => {
    const output = execSync("gsettings get org.gnome.settings-daemon.plugins.color night-light-enabled", { encoding: 'utf-8' });
    if (output.trim() == "true")
        return true;
    return false;
}
export const turnOnNightLight = () => {
    // console.log("on");
    execSync("gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled true");
}
export const turnOffNightLight = () => {
    // console.log("off");
    execSync("gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled false");
}
export const getStateMicro = () => {
    const output = execSync("pactl list | sed -n '/^Source/,/^$/p' | grep Mute", { encoding: 'utf-8' });
    if (output.includes("yes"))
        return true;
    return false;
}
export const toggleMicro = () => {
    execSync("amixer -D pulse sset Capture toggle");
}
export const getStateTouchpad = () => {
    const output = execSync("gsettings get org.gnome.desktop.peripherals.touchpad send-events ", { encoding: 'utf-8' });
    if (output.includes("disabled"))
        return false;
    return true;
}
export const turnOnTouchpad = () => {
    execSync("gsettings set org.gnome.desktop.peripherals.touchpad send-events enabled")
}
export const turnOffTouchpad = () => {
    execSync("gsettings set org.gnome.desktop.peripherals.touchpad send-events disabled")
}
export const lockScreen = () => {
    execSync("xdg-screensaver lock")
}
export const suspend = () => {
    execSync("systemctl suspend")
}
export const turnOff = () => {
    execSync("sudo poweroff");
}
export const restart = () => {
    execSync("sudo reboot");
}
// them
export const getStateDoNotDisturb = () => {
    const output = execSync("gsettings get org.gnome.desktop.notifications show-banners", { encoding: 'utf-8' });
    if (output.trim() == "true")
        return false;
    return true;
}

export const turnOnDoNotDisturb = () => {
    execSync("gsettings set org.gnome.desktop.notifications show-banners false");
}

export const turnOffDoNotDisturb = () => {
    execSync("gsettings set org.gnome.desktop.notifications show-banners true");
}
export const openSetting = () => {
    execSync("gnome-control-center");
}

//them
export const getStateWebcam = () => {
    const output = execSync("v4l2-ctl --list-devices",{ encoding: 'utf-8' });
    if(output.includes("Cannot"))
    {
        return false;
    }
    else return true;
}
export const turnOnWebcam = () => {
    execSync('sudo modprobe uvcvideo')
}
export const turnOffWebcam = () => {
    execSync('sudo modprobe -r uvcvideo')
}
export  const setPerformanceMode = () => {
    console.log('perform');
    execSync("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'performance'>\"''")
}
export const setBalancedMode = () => {
    console.log('balance');
    execSync("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'balanced'>\"''")
}
export const setPowerSaveMode = () => {
    console.log('power mode');
    execSync("''gdbus call --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles --method org.freedesktop.DBus.Properties.Set 'net.hadess.PowerProfiles' 'ActiveProfile' \"<'power-saver'>\"''")
}
export const getMode = () => {
    const output = execSync('gdbus introspect --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles',{encoding: 'utf-8'});
    const index = output.indexOf("ActiveProfile");
    const nameMode = output[index + 17] + output[index + 18];
    if(nameMode == 'pe') return 1;
    else if (nameMode == 'ba') return 2;
    else return 3;
}
export const getStateKeyBoard = () => {
    const output = execSync('xinput list-props 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"',{encoding: 'utf-8' });
    const outputTrim = output.replaceAll('\t','');
    const check = outputTrim[outputTrim.indexOf("Device Enabled (121):") + 21];
    if (check == 1) return true;
    else return false;
}
export const turnOnKeyboard = () => {
    execSync('xinput enable 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"');
}
export const turnOffKeyboard = () => {
    execSync('xinput disable 9 2>/dev/null | grep -v \"running xinput against an Xwayland server. See the xinput man page for details.\"');
}
export const checkChargingBattery = () => {
    const output = execSync("upower -i $(upower -e | grep 'BAT') | grep -E \"state|to\ full|percentage\"",{encoding: 'utf-8' }).replaceAll(' ','');
    const check = output[output.indexOf("state") + 6] + output[output.indexOf("state") + 7];
    if(check == "ch") return true;
    else return false;
}
export const getPercentBattery = () => {
    const output = execSync("upower -i $(upower -e | grep 'BAT') | grep -E \"state|to\ full|percentage\"",{encoding: 'utf-8' }).replaceAll('\t','');
    const percentage = output.substring(output.indexOf("percentage:")+11).trim();
    return percentage;
}
