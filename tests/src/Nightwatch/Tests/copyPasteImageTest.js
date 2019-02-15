module.exports = {
  '@tags': ['ckeditor_blockimagepaste'],
  before: function(browser) {
    browser.drupalInstall({
      setupFile: 'modules/contrib/ckeditor_blockimagepaste/tests/TestSiteInstallTestScript.php',
    });
  },
  after: function(browser) {
    browser
      .drupalUninstall();
  },
  'CKEditor copy paste image test': browser => {
    browser
      .createUserRole({
        name: 'admin1234',
        password: 'admin1234',
        role: 'ckeditor',
        permissions: [
          'administer nodes',
          'administer content types',
          'administer filters',
        ],
      })
      .drupalLogin({ name: 'admin1234', password: 'admin1234' })
      .drupalRelativeURL('/admin/structure/types/add')
      .setValue('#edit-name', 'article')
      .pause(1000) // Wait for the machine name to appear.
      .click('#edit-submit')
      .drupalRelativeURL('/admin/config/content/formats/add')
      .setValue('#edit-name', 'Full html ckeditor')
      .pause(1000) // Wait for the machine name to appear.
      .setValue('#edit-editor-editor', 'ckeditor')
      .click('input[id="edit-roles-ckeditor"]')
      .pause(1000) // Wait for ckeditor init.
      .click('#edit-actions-submit')
      .drupalRelativeURL('/image-test-page')
      .keys([browser.Keys.CONTROL, 'a', browser.Keys.NULL])
      .keys([browser.Keys.CONTROL, 'c', browser.Keys.NULL])
      .drupalRelativeURL('/node/add/article')
      .pause(1000) // Wait for ckeditor init.
      .click('#cke_edit-body-0-value')
      .keys([browser.Keys.CONTROL, 'v', browser.Keys.NULL])
      .setValue('#edit-title-0-value', 'Testing image allowed')
      .click('#edit-submit')
      .assert.elementPresent('#test-image')
      .drupalRelativeURL('/admin/config/content/formats/manage/full_html_ckeditor')
      .pause(1000) // Wait for ckeditor init.
      .click('a[href="#edit-editor-settings-plugins-blockimagepaste"]')
      .click('input[name="editor[settings][plugins][blockimagepaste][block_image_paste_enabled]"]')
      .click('#edit-actions-submit')
      .drupalRelativeURL('/image-test-page')
      .keys([browser.Keys.CONTROL, 'a', browser.Keys.NULL])
      .keys([browser.Keys.CONTROL, 'c', browser.Keys.NULL])
      .drupalRelativeURL('/node/add/article')
      .pause(1000) // Wait for ckeditor init.
      .click('#cke_edit-body-0-value')
      .keys([browser.Keys.CONTROL, 'v', browser.Keys.NULL])
      .dismissAlert()
      .setValue('#edit-title-0-value', 'Testing image blocked')
      .click('#edit-submit')
      .assert.elementNotPresent('#test-image')
  },

};

