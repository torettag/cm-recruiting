import 'es6-promise'

export default class redirect {
  go(appSettingsStore) {
    if(appSettingsStore.redirectUrl) {
      window.location = appSettingsStore.redirectUrl
    }
    else {
      window.location = appSettingsStore.redirect ?
        `${process.env.REACT_APP_REDIRECT_URL}?token=${appSettingsStore.redirect}`
      :
        `${process.env.REACT_APP_REDIRECT_URL}?token=${appSettingsStore.jwt}&source=cm-recruiting`;
    }
  }
}
