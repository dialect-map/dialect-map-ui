/* encoding: utf-8 */

import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import JargonSearch from "../../../../../src/scenes/papers/components/panel/search/JargonSearch";
import JargonSearchCtl from "../../../../../src/scenes/papers/controllers/backend/JargonSearch";
import MetricSearchCtl from "../../../../../src/scenes/papers/controllers/backend/MetricSearch";
import PaperSearchCtl from "../../../../../src/scenes/papers/controllers/paperscape/PaperSearch";

describe("JargonSearch component", () => {
    /** Set of tests for the JargonSearch component */

    test("Updates search jargon A", () => {
        const wrapper = shallow(<JargonSearch />);
        const instance = wrapper.instance();
        const testValue = "example";
        const testEvent = { target: { value: testValue } };

        instance.state.searchedJargonA = null;
        instance.updateJargonA(testEvent);

        const searchJargon = instance.state.searchedJargonA;
        expect(searchJargon).toBe(testValue);
    });

    test("Updates search jargon B", () => {
        const wrapper = shallow(<JargonSearch />);
        const instance = wrapper.instance();
        const testValue = "example";
        const testEvent = { target: { value: testValue } };

        instance.state.searchedJargonB = null;
        instance.updateJargonB(testEvent);

        const searchJargon = instance.state.searchedJargonB;
        expect(searchJargon).toBe(testValue);
    });

    test("Gets Jargon IDs", async () => {
        JargonSearchCtl.fetchJargonID = jest.fn().mockResolvedValue(null);

        const wrapper = shallow(<JargonSearch />);
        const instance = wrapper.instance();
        const results = await instance.queryJargonIds(["ID_1", "ID_2"]);
        expect(results).toHaveLength(0);
    });

    test("Gets Jargon metrics", async () => {
        MetricSearchCtl.fetchLatestMetrics = jest.fn().mockResolvedValue(["a"]);

        const wrapper = shallow(<JargonSearch />);
        const instance = wrapper.instance();
        const results = await instance.queryMetrics(["ID_1", "ID_2"]);
        expect(results).toStrictEqual(["a", "a"]);
    });

    test("Gets Paper IDs", async () => {
        PaperSearchCtl.fetchPapersIDs = jest.fn().mockResolvedValue(["b"]);

        const wrapper = shallow(<JargonSearch />);
        const instance = wrapper.instance();
        const results = await instance.queryPaperIds(["ID_1", "ID_2"]);
        expect(results).toStrictEqual(["b", "b"]);
    });

    test("Shows search HTML elements", () => {
        const { container } = render(<JargonSearch />);

        const searchIcons = container.getElementsByClassName("circular icon");
        const searchInput = container.getElementsByClassName("input");

        expect(searchIcons).toHaveLength(2);
        expect(searchInput).toHaveLength(2);
    });
});
