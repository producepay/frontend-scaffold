import { stubFetch } from "../support/commands";

describe('Index', () => {
  it('redirects to Roma Tomatoes', () => {
    cy.visit('/');
    cy.contains('Tomatoes, Roma');
  });
});

describe('Routing', () => {
  it('successfully displays pricing data', () => {
    cy.visit('commodities-varieties/eddd01d8-492e-477d-a7f8-6cdf5cbb42cf/6a4cfac6-0026-43ff-8f4b-a2cc0782b4e1', {
      onBeforeLoad: stubFetch,
    });
    cy.contains('Avocados, Hass');
    cy.contains('Cartons 2 Layer • 32s').next().should('have.text', '$82.25'); // low price
    cy.contains('Cartons 2 Layer • 32s').next().next().should('have.text', '$85.25'); // high price
    cy.contains('Cartons 2 Layer • 32s').next().next().next().should('have.text', '$83.75'); // average price
    cy.get('select > option').then(options => {
      const skus = [...options].map(o => o.value);
      expect(skus).to.deep.eq([
        "Hass • Cartons 2 Layer • 32s",
        "Hass • Cartons 2 Layer • 36s",
        "Hass • Cartons 2 Layer • 40s",
        "Hass • Cartons 2 Layer • 48s",
        "Hass • Cartons 2 Layer • 48s • Organic",
        "Hass • Cartons 2 Layer • 60s",
        "Hass • Cartons 2 Layer • 60s • Organic",
        "Hass • Cartons 2 Layer • 70s",
        "Hass • Cartons 2 Layer • 84s",
      ]);
    });
  });
});

describe('User interaction', () => {
  it('can change sku filters on pricing graph', () => {
    cy.visit('commodities-varieties/eddd01d8-492e-477d-a7f8-6cdf5cbb42cf/6a4cfac6-0026-43ff-8f4b-a2cc0782b4e1', {
      onBeforeLoad: stubFetch,
    });
    cy.get('div div').contains('MEXICO CROSSINGS THROUGH TEXAS');
    cy.get('div div').contains('SOUTH DISTRICT CALIFORNIA');
    cy.get('div div').contains('PERU IMPORTS - PORTS OF ENTRY PHILADELPHIA AREA AND NEW YORK CITY AREA').prev().click({force: true});
    cy.get('select').select('Cartons 2 Layer • 48s • Organic');
    cy.get('div div').contains('SOUTH DISTRICT CALIFORNIA');
    cy.get('div div').contains('MEXICO CROSSINGS THROUGH TEXAS').should('not.exist');
    cy.get('div div').contains('PERU IMPORTS - PORTS OF ENTRY PHILADELPHIA AREA AND NEW YORK CITY AREA').should('not.exist');
  });
});