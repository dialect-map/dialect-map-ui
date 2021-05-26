/* encoding: utf-8 */

import { shallow } from "enzyme";
import PapersPanel, { PanelTabs } from "../../../src/scenes/papers/components/Panel";

describe("Panel component", () => {
    /** Set of tests for the Panel component */

    test("Sets jargon search tab", () => {
        const wrapper = shallow(<PapersPanel />);
        const instance = wrapper.instance();

        instance.state.chosenTab = null;
        instance.setJargonTab();

        const currentTab = instance.state.chosenTab;
        expect(currentTab).toBe(PanelTabs.JARGON_SEARCH);
    });

    test("Sets paper search tab", () => {
        const wrapper = shallow(<PapersPanel />);
        const instance = wrapper.instance();

        instance.state.chosenTab = null;
        instance.setSearchTab();

        const currentTab = instance.state.chosenTab;
        expect(currentTab).toBe(PanelTabs.PAPER_SEARCH);
    });
});
