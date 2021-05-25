/* encoding: utf-8 */

import { render } from "@testing-library/react";
import PapersSidebar from "../../../src/scenes/papers/components/Sidebar";

describe("Sidebar component", () => {
    /** Set of tests for the Sidebar component */

    test("Shows menu icons", () => {
        const { container } = render(<PapersSidebar getChosenTab={() => {}} />);
        const sidebarIcons = container.getElementsByClassName("circular icon");
        expect(sidebarIcons).toHaveLength(2);
    });
});
