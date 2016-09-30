const webdriver = require('selenium-webdriver')
const {By, until} = webdriver
const path = require('path')
const expect = require('chai').expect

const driver = new webdriver.Builder()
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      binary: path.join(__dirname, 'node_modules/electron/dist/electron')
    }
  })
  .forBrowser('electron')
  .build()

describe('navigating to google.com', () => {
  beforeEach(done => {
    driver.get('http://www.google.com').then(done)
  })

  it('should have a title of Google', done => {
    driver.getTitle().then(title => {
      expect(title).to.equal('Google');
      done();
    })
  })

  it('should be able to search for webdriver', done => {
    driver.findElement(By.name('q')).sendKeys('webdriver')
    driver.findElement(By.name('btnG')).click()
    driver.wait(until.titleIs('webdriver - Google Search'), 1000)
      .then(() => done())
  })

  after(done => {
    driver.quit().then(() => done())
  })
})
