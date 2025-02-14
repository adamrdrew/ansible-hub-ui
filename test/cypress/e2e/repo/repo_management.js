describe('Repo Management tests', () => {
  let remoteRepoUrl = '/ui/repositories?tab=remote';
  let localRepoUrl = '/ui/repositories';

  let noPrivilegesUser0 = 'noPrivilegesUser0';

  before(() => {
    cy.deleteTestGroups();
    cy.deleteTestUsers();
    cy.galaxykit('user create', noPrivilegesUser0, noPrivilegesUser0);
  });

  after(() => {
    cy.deleteTestUsers();
    cy.deleteTestGroups();
  });

  beforeEach(() => {
    cy.login();
  });

  it('admin user sees download_concurrency in remote config', () => {
    cy.visit(remoteRepoUrl);
    cy.contains('.body', 'community'); // without this, sporadic failures
    cy.get('[aria-label="Actions"]:first').click(); // click the kebab menu on the 'community' repo
    cy.contains('Edit').click();
    cy.contains('Show advanced options').click();
    cy.get('#download_concurrency').should('exist');
  });

  it('can see table in repo tabs and it shows data correctly', () => {
    cy.visit(localRepoUrl);
    cy.get('[data-cy="SortTable-headers"]').contains('Distribution name');
    cy.get('[data-cy="SortTable-headers"]').contains('Repository name');
    cy.get('[data-cy="SortTable-headers"]').contains('Collection count');
    cy.get('[data-cy="SortTable-headers"]').contains('Last updated');
    cy.get('[data-cy="SortTable-headers"]').contains('Distribution URL');
    cy.get('[data-cy="SortTable-headers"]').contains('CLI configuration');
    cy.contains('community');
    cy.contains('published');
    cy.contains('rejected');
    cy.contains('rh-certified');
    cy.contains('staging');
    cy.get('button').contains('Remote').parent().click();
    cy.get('[data-cy="SortTable-headers"]').contains('Remote name');
    cy.get('[data-cy="SortTable-headers"]').contains('Repositories');
    cy.get('[data-cy="SortTable-headers"]').contains('Last updated');
    cy.get('[data-cy="SortTable-headers"]').contains('Last sync');
    cy.get('[data-cy="SortTable-headers"]').contains('Sync status');
    cy.contains('Sync');
  });

  it('retrieves and copies token from local repo list', () => {
    cy.visit(localRepoUrl);
    cy.intercept(
      'GET',
      Cypress.env('prefix') + '_ui/v1/distributions/?offset=0&limit=10',
    ).as('loadRepos');
    cy.wait('@loadRepos');
    cy.get('button').contains('Get token').click();

    cy.get('button').contains('Load token').click();
    cy.get('[aria-label="Copyable input"]')
      .invoke('val')
      .should('have.length', 40);
    cy.get('button[aria-label="Copy to clipboard"]').should('be.enabled');
  });

  it('expands and copies CLI config from local repo list', () => {
    cy.visit(localRepoUrl);
    cy.get(
      '.pf-c-clipboard-copy button[aria-label="Show content"]:first',
    ).click(); //show expandable content
    cy.get(
      '.pf-c-clipboard-copy > .pf-c-clipboard-copy__expandable-content > pre:first',
    ).contains(Cypress.env('prefix') + 'content/community/'); // check content of input

    cy.get('button[aria-label="Copy to clipboard"]').eq(1).should('be.enabled');
  });

  it('can see both default repos.', () => {
    cy.visit(localRepoUrl);
    cy.contains('.hub-tab-link-container', 'Local');
    cy.contains('.hub-tab-link-container', 'Remote');
  });

  it('can see all buttons as admin.', () => {
    cy.visit(localRepoUrl);
    cy.contains('.hub-tab-link-container span', 'Remote').click();
    cy.contains('.body', 'rh-certified');
    cy.contains('.body button', 'Sync');
    cy.get('.body button[aria-label="Actions"]').eq(0).click();
    cy.contains('.body a', 'Edit');
    cy.get('.body button[aria-label="Actions"]').eq(1).click();
    cy.contains('.body a', 'Edit');
  });

  it('can see no buttons as user without privilleges.', () => {
    cy.login(noPrivilegesUser0, noPrivilegesUser0);
    cy.visit(localRepoUrl);
    cy.contains('.hub-tab-link-container span', 'Remote').click();
    cy.contains('.body', 'rh-certified');
    cy.contains('.body button', 'Sync').should('not.exist');
    cy.get('.body button[aria-label="Actions"]').should('not.exist');
  });

  it.skip('starts remote repo sync', () => {
    cy.visit(remoteRepoUrl);

    //checks sync status === 'Running' after sync post request
    cy.intercept(
      'POST',
      Cypress.env('prefix') + 'content/rh-certified/v3/sync/',
    ).as('startSync');
    cy.get('td')
      .contains('rh-certified')
      .parent()
      .children('td:nth-child(6)')
      .contains('Sync')
      .click();
    cy.wait('@startSync');
    cy.get('td')
      .contains('rh-certified')
      .parent()
      .children('td:nth-child(5)')
      .should('have.text', 'Running ');
  });

  /* FIXME: Needs more work to handle uploading a requirements.yml
   * when you want to save the remote proxy config.
   */
  it.skip('remote proxy config can be saved and deleted.', () => {
    cy.login();
    cy.visit(remoteRepoUrl);
    cy.get('[aria-label="Actions"]:first').click(); // click the kebab menu on the 'community' repo
    cy.contains('Edit').click();
    cy.contains('Show advanced options').click();

    // first fill it up with data
    cy.get('input[id="username"]').type('test');
    cy.get('input[id="password"]').type('test');
    cy.get('input[id="proxy_url"]').type('https://example.org');
    cy.get('input[id="proxy_username"]').type('test');
    cy.get('input[id="proxy_password"]').type('test');
    cy.intercept(
      'PUT',
      Cypress.env('prefix') + 'content/community/v3/sync/config/',
    ).as('saveConfig');
    cy.contains('Save').click();
    cy.wait('@saveConfig').its('status').should('eq', 200);

    // verify values have been saved properly.
    cy.get('[aria-label="Actions"]:first').click(); // click the kebab menu on the 'community' repo
    cy.contains('Edit').click();
    cy.contains('Show advanced options').click();
    cy.get('input[id="username"]').should('have.value', 'test');
    cy.get('input[id="proxy_url"]').should('have.value', 'https://example.org');
    cy.get('input[id="proxy_username"]').should('have.value', 'test');

    // clear the values
    cy.get('input[id="username"]').clear();
    cy.get('input[type="password"]')
      .siblings('button')
      .click({ multiple: true });
    cy.get('input[id="proxy_url"]').clear();
    cy.get('input[id="proxy_username"]').clear();
    cy.contains('Save').click();
    cy.wait('@saveConfig').its('status').should('eq', 200);

    // verify the values have been deleted
    cy.get('[aria-label="Actions"]:first').click(); // click the kebab menu on the 'community' repo
    cy.contains('Edit').click();
    cy.contains('Show advanced options').click();
    cy.get('input[id="username"]').should('have.value', '');
    cy.get('input[id="password"]').should('have.value', '');
    cy.get('input[id="proxy_url"]').should('have.value', '');
    cy.get('input[id="proxy_password"]').should('have.value', '');
  });
});
