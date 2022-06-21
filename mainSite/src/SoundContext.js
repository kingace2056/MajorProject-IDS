// context created to use variable across react dom (globally)
// these values are toggled in layout and used in dashboard and app for notifications

import React from "react";

export const SoundContext = React.createContext({
    notifSoundOn: true,
    dashSoundOn: true,
    toggleNotifSound: () => { },
    toggleDashSound: () => { }
});
