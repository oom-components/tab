import Tab from '../src/tab.js';

customElements.define('test-tab', Tab);

const expect = chai.expect;
const tab = document.querySelector('test-tab');
console.log(tab);
mocha.setup('bdd');

describe('Tab testing', function() {
    context('Init', function() {
        it('Select tabs and panels', function() {
            expect(tab.panels.length).to.equal(2);
            expect(tab.tabs.length).to.equal(2);
        });

        it('the first tab is selected by default', function() {
            expect(tab.panel.id).to.equal('section1');
            expect(tab.panels[0] === tab.panel).to.be.true;
            expect(tab.tab.id).to.equal('tab1');
            expect(tab.tabs[0] === tab.tab).to.be.true;
        });

        it('the tabindex and aria-* attributes are correctly implemented', function() {
            expect(tab.tab.getAttribute('aria-selected')).to.equal('true');
            expect(tab.tabs[1].getAttribute('aria-selected')).to.equal(null);
            expect(tab.panel.getAttribute('tabindex')).to.equal('-1');
            expect(tab.panels[1].getAttribute('tabindex')).to.equal('-1');
        });
    });

    context('State', function() {
        it('changes the current state', function() {
            expect(tab.setState('#section2')).to.be.true;

            expect(tab.panel.id).to.equal('section2');
            expect(tab.panels[1] === tab.panel).to.be.true;
            expect(tab.tab.id).to.equal('tab2');
            expect(tab.tabs[1] === tab.tab).to.be.true;

            expect(tab.tab.getAttribute('aria-selected')).to.equal('true');
            expect(tab.tabs[0].getAttribute('aria-selected')).to.equal(null);

            expect(tab.setState('#section1')).to.be.true;
        });
    });
});

mocha.run();
