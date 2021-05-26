/* encoding: utf-8 */

import { render } from "@testing-library/react";
import MapConfigCtl from "../../src/scenes/papers/controllers/paperscape/MapConfig";
import PapersMap from "../../src/scenes/papers/Papers";

describe("Papers scene", () => {
    /** Set of tests for the Papers scene component */

    beforeEach(() => {
        MapConfigCtl.fetchConfig = jest.fn().mockResolvedValue({});
    });

    test("Mounts zero components by default", () => {
        const { container } = render(<PapersMap />);
        const numberChildren = container.children.length;
        expect(numberChildren).toBe(0);
    });

    test("Mounts some components upon config loading", async () => {
        const { container } = render(<PapersMap />);
        await MapConfigCtl.fetchConfig;
        const numberChildren = container.children.length;
        expect(numberChildren).toBeGreaterThan(0);
    });
});
