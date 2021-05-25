/* encoding: utf-8 */

import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import PaperSearch from "../../../../../src/scenes/papers/components/panel/search/PaperSearch";
import PaperSearchCtl from "../../../../../src/scenes/papers/controllers/paperscape/PaperSearch";

describe("PaperSearch component", () => {
    /** Set of tests for the PaperSearch component */

    test("Updates search input", () => {
        const wrapper = shallow(<PaperSearch />);
        const instance = wrapper.instance();
        const testValue = "example";
        const testEvent = { target: { value: testValue } };

        instance.state.paperSearch = null;
        instance.updateSearch(testEvent);

        const searchValue = instance.state.paperSearch;
        expect(searchValue).toBe(testValue);
    });

    test("Updates search type", () => {
        const wrapper = shallow(<PaperSearch />);
        const instance = wrapper.instance();
        const testValue = "example";
        const testEvent = { value: testValue };

        instance.state.paperSearchType = null;
        instance.updateSearchType(testEvent);

        const searchType = instance.state.paperSearchType;
        expect(searchType).toBe(testValue);
    });

    test("Handles empty results", async () => {
        PaperSearchCtl.fetchPapersIDs = jest.fn().mockResolvedValue([]);

        const wrapper = shallow(<PaperSearch />);
        const instance = wrapper.instance();
        const results = await instance.searchPapers();
        expect(results).toBeNull();
    });

    test("Shows search HTML elements", () => {
        const { container, getByText } = render(<PaperSearch />);

        const searchLabel = getByText("Search:");
        const searchDrop = container.getElementsByClassName("selection dropdown");
        const searchIcons = container.getElementsByClassName("circular icon");
        const searchInput = container.getElementsByClassName("input");

        expect(searchLabel).toBeDefined();
        expect(searchDrop).toHaveLength(1);
        expect(searchIcons).toHaveLength(1);
        expect(searchInput).toHaveLength(1);
    });
});
