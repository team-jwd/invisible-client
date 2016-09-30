const webdriver = require('selenium-webdriver')
const {By, until} = webdriver;
const path = require('path')
const expect = require('chai').expect

const driver = new webdriver.Builder()
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions : {
      binary: path.join(__dirname, 'node_modules/electron/dist/electron')
    }
  })
  .forBrowser('electron')
  .build()

const startTime = Date.now()

driver.get('http://www.google.com')

driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
  .then(() => say('typing'))

driver.findElement(webdriver.By.name('btnG')).click()
  .then(() => say('clicking button'))

driver.wait(until.titleIs('webdriver - Google Search'))
  .then(() => say('title is correct!'))

driver.quit().then(() => console.log())
  .then(() => say('quitting'))

function timeSince(startTime) {
  return Date.now() - startTime;
}

function say(message) {
  console.log(timeSince(startTime), message);
}
